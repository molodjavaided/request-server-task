import { useState, useEffect } from "react";
import Todo from "../todo/Todo";
import styles from "./TodoList.module.css";
import FormTodo from "../form-todo/FormTodo";

function TodoList({ sortByOrder, debouncedSearchTerm }) {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  const addTodo = (data) => {
    return setTodos((prevTodos) => [...prevTodos, data]);
  };

  if (isLoading) {
    return <div className={styles.loader}></div>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }
  return (
    <>
      <FormTodo addTodo={addTodo} />
      <ul className={styles.todolist}>
        {todos.map((todo) => (
          <Todo key={todo.id} id={todo.id} title={todo.title} />
        ))}
      </ul>
    </>
  );
}

export default TodoList;
