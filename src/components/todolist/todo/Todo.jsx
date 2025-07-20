import React from "react";
import styles from "./Todo.module.css";
import ButtonEdit from "./buttons/button-edit/ButtonEdit";
import ButtonDelete from "./buttons/button-delete/ButtonDelete";

function Todo({ id, title, requestDeleteTodo }) {
  return (
    <div className={styles.todo}>
      <div className={styles.title} key={id}>
        {title}
      </div>
      <div className={styles.buttons}>
        <ButtonEdit id={id} />
        <ButtonDelete id={id} requestDeleteTodo={requestDeleteTodo} />
      </div>
    </div>
  );
}

export default Todo;
