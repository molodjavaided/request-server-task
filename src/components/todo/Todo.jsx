import styles from "./Todo.module.css";
import { useDispatch } from "react-redux";
import { deleteTodo, startEditing } from "../../store/actions";

export function Todo({ todo }) {
  const dispatch = useDispatch();

  const onUpdate = () => {
    dispatch(startEditing(todo.id));
  };

  const onDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  return (
    <div className={styles.todo}>
      <div className={styles.title}>{todo.title}</div>
      <div className={styles.buttons}>
        <button className={styles["button-update"]} onClick={onUpdate}>
          Update
        </button>
        <button className={styles["button-delete"]} onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
