import React, { useState } from "react";
import styles from "./FormTodo.module.css";

function FormTodo({ requestAddTodo }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    requestAddTodo(value);
    setValue("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        placeholder="Введите задачу"
        onChange={handleChange}
      />
      <button
        className={styles["button-add"]}
        requestAddTodo={requestAddTodo}
        type="submit"
      >
        Add
      </button>
    </form>
  );
}

export default FormTodo;
