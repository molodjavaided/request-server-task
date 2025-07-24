import React, { useState } from "react";
import styles from "./FormTodo.module.css";
import ButtonAdd from "../buttons/ButtonAdd";

function FormTodo({ requestAddTodo }) {
  const [value, setValue] = useState("");
  const [isAdd, setIsAdd] = useState(false);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    setIsAdd(true);
    await requestAddTodo(value);
    setIsAdd(false);
    setValue("");
  };

  return (
    <>
      {isAdd ? (
        <div className={styles.addendum}>Добавляем задачу в список</div>
      ) : (
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            value={value}
            placeholder="Введите задачу"
            onChange={handleChange}
          />
          <ButtonAdd />
        </form>
      )}
    </>
    // <form className={styles.form} onSubmit={handleSubmit}>
    //   <input
    //     type="text"
    //     value={value}
    //     placeholder="Введите задачу"
    //     onChange={handleChange}
    //   />
    //   <ButtonAdd />
    // </form>
  );
}

export default FormTodo;
