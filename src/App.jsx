import { useState, useEffect } from "react";
import TodoList from "./components/todolist/TodoList";
import styles from "./App.module.css";
import FormTodo from "./components/form-todo/FormTodo";
import SearchTodo from "./components/search-todo/SearchTodo";
import ButtonSorting from "./components/buttons/ButtonSorting";
import { useDebounce } from "@uidotdev/usehooks";

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sortByOrder, setSortByOrder] = useState({
    path: "title",
    order: "desc",
  });
  const [valueSearch, setValueSearch] = useState("");

  const debouncedSearchTerm = useDebounce(valueSearch, 2000);

  const fetchPosts = async (path, order, value) => {
    setIsLoading(true);
    try {
      const responce = await fetch(
        `http://localhost:3000/todos?_sort=${path}&_order=${order}&q=${value}`
      );
      if (!responce.ok) {
        throw new Error("Ошибка в запросе на сервер");
      }
      const data = await responce.json();
      setTodos(data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(sortByOrder.path, sortByOrder.order, debouncedSearchTerm);
  }, [sortByOrder.path, sortByOrder.order, debouncedSearchTerm]);

  const requestAddTodo = async (value) => {
    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
          title: value,
          completed: false,
        }),
      });
      if (!response.ok) {
        throw new Error("Ошибка в добавлении задачи");
      }
      const data = await response.json();
      setTodos((prevTodos) => [...prevTodos, data]);
    } catch (error) {
      setError(error);
    }
  };

  const requestDeleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Ошибка в удалении задачи");
      }
      const data = await response.json();
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      setError(error);
    }
  };

  const requestUpdateTodo = async (id, newTitle) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
          title: newTitle,
        }),
      });
      if (!response.ok) {
        throw new Error("Задача не обновлена");
      }
      const data = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, title: newTitle, isEdit: false } : todo
        )
      );
    } catch (error) {
      setError(error);
    }
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, isEdit: true } : todo))
    );
  };

  const cancelEdit = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, isEdit: false } : todo))
    );
  };

  const handleSearch = (e) => {
    setValueSearch(e.target.value);
  };

  const handleSort = () => {
    setSortByOrder({
      path: "title",
      order: sortByOrder.order === "desc" ? "asc" : "desc",
    });
  };

  if (isLoading) {
    return <div className={styles.loader}></div>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <div className={styles.container}>
        <FormTodo requestAddTodo={requestAddTodo} />
        <div className={styles["wrapper-search-sorting"]}>
          <ButtonSorting handleSort={handleSort} />
          <SearchTodo value={valueSearch} handleSearch={handleSearch} />
        </div>

        <TodoList
          todos={todos}
          requestUpdateTodo={requestUpdateTodo}
          requestDeleteTodo={requestDeleteTodo}
          editTodo={editTodo}
          cancelEdit={cancelEdit}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}

export default App;
