import { useState, useEffect } from "react";
import TodoList from "./components/todolist/TodoList";
import styles from "./App.module.css";
import FormTodo from "./components/form-todo/FormTodo";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then((loadedData) => loadedData.json())
      .then((loadedTodos) => {
        console.log(loadedTodos);

        setTodos(loadedTodos.map((todo) => ({ ...todo, isEdit: false })));
      });
  }, []);

  const requestAddTodo = (value) => {
    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        id: 0,
        title: value,
        completed: false,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log("Задача добавлена", response);
        setTodos([...todos, response]);
      });
  };

  const requestDeleteTodo = (id) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "DELETE",
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log("Задача удалена, ответ сервера:", response);
        setTodos(todos.filter((todo) => todo.id !== id));
      });
  };

  const requestUpdateTodo = (id, newTitle) => {
    fetch(`http://localhost:3000/todos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        title: newTitle,
      }),
    })
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
        console.log("Задача обновлена, ответ сервера:", response);
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, title: newTitle, isEdit: false } : todo
          )
        );
      });
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, isEdit: true } : todo))
    );
  };

  return (
    <>
      <div className={styles.container}>
        <FormTodo requestAddTodo={requestAddTodo} />
        <TodoList
          todos={todos}
          requestUpdateTodo={requestUpdateTodo}
          requestDeleteTodo={requestDeleteTodo}
          editTodo={editTodo}
        />
      </div>
    </>
  );
}

export default App;
