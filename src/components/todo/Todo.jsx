import styles from "./Todo.module.css";
import React from "react";
import { useTodoContext } from "../../context/Context";

export function Todo({ todo }) {
  const { handleDeleteTodo, startEditing } = useTodoContext();

  const onUpdate = () => {
    startEditing(todo.id);
  };

  const onDelete = () => {
    handleDeleteTodo(todo.id);
  };

  return (
    <li className={styles.todo}>
      <div className={styles.title}>{todo.title}</div>
      <div className={styles.buttons}>
        <button className={styles["button-update"]} onClick={onUpdate}>
          Update
        </button>
        <button className={styles["button-delete"]} onClick={onDelete}>
          Delete
        </button>
      </div>
    </li>
  );
}
