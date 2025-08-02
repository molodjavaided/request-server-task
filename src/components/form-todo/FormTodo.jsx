import { useState } from "react";
import styles from "./FormTodo.module.css";
import ButtonAdd from "../buttons/ButtonAdd";
// import { useNavigate } from "react-router-dom";

function FormTodo({ addTodo }) {
  const [value, setValue] = useState("");
  const [isAdd, setIsAdd] = useState(false);
  // const navigate = useNavigate();
  const [error, setError] = useState(null);

  const requestAddTodo = async (value) => {
    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
          title: value,
          completed: false,
        }),
      });
      if (!response.ok) {
        throw new Error("Ошибка в добавлении задачи");
      }
      const data = await response.json();
      addTodo(data);
      // navigate("/");
    } catch (error) {
      setError(error);
    }
  };

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

  if (error) {
    return <h1>{error}</h1>;
  }

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
  );
}

export default FormTodo;
