import React from "react";
import styles from "./ButtonEdit.module.css";

function ButtonEdit({ id, editTodo }) {
  return (
    <button
      className={styles["button-edit"]}
      id={id}
      onClick={() => editTodo(id)}
    >
      Edit
    </button>
  );
}

export default ButtonEdit;
