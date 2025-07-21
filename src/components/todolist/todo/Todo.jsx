import React from "react";
import styles from "./Todo.module.css";
import ButtonEdit from "./buttons/button-edit/ButtonEdit";
import ButtonDelete from "./buttons/button-delete/ButtonDelete";

function Todo({ id, title, requestDeleteTodo, editTodo }) {
  return (
    <div className={styles.todo}>
      <div className={styles.title}>{title}</div>
      <div className={styles.buttons}>
        <ButtonEdit id={id} editTodo={editTodo} />
        <ButtonDelete id={id} requestDeleteTodo={requestDeleteTodo} />
      </div>
    </div>
  );
}

export default Todo;
