import React from "react";
import { Todo, EditTodoForm } from "../../components";
import styles from "./TodoList.module.css";
import { useTodoContext } from "../../context/Context";

export function TodoList() {
  const { todos, editingId, updatingIds, deletingIds } = useTodoContext();

  const renderTodo = (todo) => {
    if (editingId === todo.id) return <EditTodoForm todo={todo} />;
    if (updatingIds.includes(todo.id))
      return <div className={styles["todo-status"]}>Обновляем задачу...</div>;
    if (deletingIds.includes(todo.id))
      return <div className={styles["todo-status"]}>Удаляем задачу...</div>;
    return <Todo todo={todo} />;
  };

  return (
    <ul className={styles["todo-list"]}>
      {todos.map((todo) => (
        <li key={todo.id}>{renderTodo(todo)}</li>
      ))}
    </ul>
  );
}
