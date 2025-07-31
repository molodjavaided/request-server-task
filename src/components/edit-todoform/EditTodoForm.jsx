import React, { useState } from "react";
import styles from "./EditTodoForm.module.css";
import ButtonUpdate from "../buttons/ButtonUpdate";
import ButtonCancel from "../buttons/ButtonCancel";

function EditTodoForm({ id, title, handleCancelEdit, handleUpdate }) {
  const [value, setValue] = useState(title);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      await handleUpdate(id, value);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      {isUpdating ? (
        <div className={styles.updating}>"Редактируем задачу из списка..."</div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            value={value}
            placeholder="Обновить задачу"
            onChange={handleChange}
          />
          <div className={styles.buttons}>
            <ButtonUpdate />
            <ButtonCancel handleCancelEdit={handleCancelEdit} />
          </div>
        </form>
      )}
    </>
  );
}

export default EditTodoForm;
