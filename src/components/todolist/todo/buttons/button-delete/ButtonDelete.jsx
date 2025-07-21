import React from "react";
import styles from "./ButtonDelete.module.css";

function ButtonDelete({ id, requestDeleteTodo }) {
  return (
    <button
      className={styles["button-delete"]}
      id={id}
      onClick={() => requestDeleteTodo(id)}
    >
      Delete
    </button>
  );
}

export default ButtonDelete;
