import { useState } from "react";
import styles from "./Todo.module.css";
import ButtonEdit from "../buttons/ButtonEdit";
import ButtonDelete from "../buttons/ButtonDelete";

function Todo({ id, title, requestDeleteTodo, editTodo }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = async (id) => {
    setIsDeleting(true);
    await requestDeleteTodo(id);
    setIsDeleting(false);
  };

  return (
    <>
      {isDeleting ? (
        <div className={styles.todo}>
          <div className={styles.deleting}>"Удаляем задачу из списка..."</div>
        </div>
      ) : (
        <div className={styles.todo}>
          <div className={styles.title}>{title}</div>
          <div className={styles.buttons}>
            <ButtonEdit id={id} editTodo={editTodo} />
            <ButtonDelete id={id} isDeleting={isDeleting} onDelete={onDelete} />
          </div>
        </div>
      )}
    </>
  );
}

export default Todo;
