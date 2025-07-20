import React, { useState } from "react";
import Todo from "./todo/Todo";
import styles from "./TodoList.module.css";

function TodoList({ todos, requestDeleteTodo }) {
  return (
    <div className={styles.todolist}>
      {todos.map(({ id, title, completed }) => (
        <Todo
          id={id}
          key={id}
          title={title}
          completed={completed}
          requestDeleteTodo={requestDeleteTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;
