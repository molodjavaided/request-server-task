import React from "react";
import { Todo, EditTodoForm } from "../../components";
import styles from "./TodoList.module.css";
import { useSelector } from "react-redux";

export function TodoList() {
  const todos = useSelector((state) => state.todos);
  const editingId = useSelector((state) => state.ui.editingId);
  const updatingIds = useSelector((state) => state.ui.updatingIds);
  const deletingIds = useSelector((state) => state.ui.deletingIds);

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
