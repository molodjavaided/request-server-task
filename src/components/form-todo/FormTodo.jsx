import { useState } from "react";
import { useTodoContext } from "../../context/Context";
import styles from "./FormTodo.module.css";

export function FormTodo() {
  const { handleAddTodo, isAdding } = useTodoContext();
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await handleAddTodo(title);
    setTitle("");
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  if (isAdding) {
    return (
      <div className={styles["add-todo"]}>Добавляем задачу в список...</div>
    );
  }

  return (
    <form className={styles["form-todo"]} onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        placeholder="Добавьте новую задачу"
        onChange={handleChange}
      />
      <button type="submit" className={styles["button-add"]}>
        Add
      </button>
    </form>
  );
}
