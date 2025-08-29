import { useDispatch } from "react-redux";
import styles from "./EditTodoForm.module.css";
import { useState } from "react";
import { cancelEditing, updateTodo } from "../../store/actions";

export function EditTodoForm({ todo }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(todo.title);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    dispatch(updateTodo(todo.id, title));
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const onCancel = () => {
    dispatch(cancelEditing());
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
