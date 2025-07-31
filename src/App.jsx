import { useState, useEffect } from "react";
import TodoList from "./components/todolist/TodoList";
import styles from "./App.module.css";
import FormTodo from "./components/form-todo/FormTodo";
import SearchTodo from "./components/search-todo/SearchTodo";
import ButtonSorting from "./components/buttons/ButtonSorting";
import { useDebounce } from "@uidotdev/usehooks";
import { Routes, Route, useNavigate } from "react-router-dom";
import TodoPage from "./components/todo-page/TodoPage";
import Todo from "./components/todo/Todo";

function App() {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sortByOrder, setSortByOrder] = useState({
    path: "title",
    order: "desc",
  });
  const [valueSearch, setValueSearch] = useState("");
  const navigate = useNavigate();

  const debouncedSearchTerm = useDebounce(valueSearch, 500);

  const fetchTodo = async (path, order, value) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/todos?_sort=${path}&_order=${order}&q=${value}`
      );
      if (!response.ok) {
        throw new Error("Ошибка в запросе на сервер");
      }
      const data = await response.json();
      setTodos(data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodo(sortByOrder.path, sortByOrder.order, debouncedSearchTerm);
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
      navigate("/");
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
        prevTodos.map((todo) => (todo.id === id ? data : todo))
      );
      navigate("/");
      console.log(data, id, newTitle);
    } catch (error) {
      setError(error);
    }
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
        <div className={styles["wrapper-search-sorting"]}>
          <ButtonSorting handleSort={handleSort} />
          <SearchTodo valueSearch={valueSearch} handleSearch={handleSearch} />
        </div>
        <FormTodo requestAddTodo={requestAddTodo} />

        <Routes>
          <Route path="/" element={<TodoList todos={todos} />} />
          <Route
            path="/todos/:id"
            element={
              <TodoPage
                requestUpdateTodo={requestUpdateTodo}
                requestDeleteTodo={requestDeleteTodo}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
