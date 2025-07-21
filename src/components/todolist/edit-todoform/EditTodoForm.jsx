import React, { useState } from "react";
import styles from "./EditTodoForm.module.css";

function EditTodoForm({ requestUpdateTodo, id, currentTitle }) {
  const [value, setValue] = useState(currentTitle);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    requestUpdateTodo(id, value);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        placeholder="Обновить задачу"
        onChange={handleChange}
      />
      <button className={styles["button-update"]} type="submit">
        Update
      </button>
    </form>
  );
}

export default EditTodoForm;
