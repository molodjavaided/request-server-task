import styles from "./SearchTodo.module.css";
import React from "react";

export function SearchTodo({ value, onChange }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };
  return (
    <input
      type="text"
      placeholder="Поиск задач..."
      value={value}
      onChange={handleChange}
      className={styles["input-search"]}
    />
  );
}
