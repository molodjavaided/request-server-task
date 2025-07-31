import styles from "./buttons.module.css";

function ButtonDelete({ handleDelete }) {
  return (
    <button className={styles["button-delete"]} onClick={handleDelete}>
      Delete
    </button>
  );
}

export default ButtonDelete;
