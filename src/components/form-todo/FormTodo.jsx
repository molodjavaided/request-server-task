import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "../../store/actions/todos/addTodo";
import styles from "./FormTodo.module.css";

export function FormTodo() {
  const dispatch = useDispatch();
  const isAdding = useSelector((state) => state.ui.isAddingTodo);
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    await dispatch(addTodo(title));
    setTitle("");
  };

  if (isAdding) {
    return <div className={styles["add-todo"]}>Добавляем задачу...</div>;
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
