import React from "react";
import styles from "./buttons.module.css";

function ButtonEdit({ isEditingTodo }) {
  return (
    <button className={styles["button-edit"]} onClick={isEditingTodo}>
      Edit
    </button>
  );
}

export default ButtonEdit;
