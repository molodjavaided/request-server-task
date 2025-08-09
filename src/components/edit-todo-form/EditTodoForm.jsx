import React, { useState } from "react";
import styles from "./EditTodoForm.module.css";
import { useTodoContext } from "../../context/Context";

export function EditTodoForm({ todo }) {
  const { handleUpdateTodo, cancelEditing } = useTodoContext();
  const [title, setTitle] = useState(todo.title);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    handleUpdateTodo(todo.id, title);
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const onCancel = () => {
    cancelEditing();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={handleChange}
        className={styles.input}
      />
      <div className={styles.buttons}>
        <button className={styles["button-update"]} type="submit">
          Update
        </button>
        <button className={styles["button-cancel"]} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}
