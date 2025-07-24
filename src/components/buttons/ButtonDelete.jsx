import styles from "./buttons.module.css";

function ButtonDelete({ id, onDelete, isDeleting }) {
  return (
    <button
      className={styles["button-delete"]}
      id={id}
      onClick={() => onDelete(id)}
      disabled={isDeleting}
    >
      Delete
    </button>
  );
}

export default ButtonDelete;
