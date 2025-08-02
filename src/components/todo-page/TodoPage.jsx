import React, { useEffect, useState } from "react";
import ButtonEdit from "../buttons/ButtonEdit";
import ButtonDelete from "../buttons/ButtonDelete";
import styles from "./TodoPage.module.css";
import { useNavigate, useParams } from "react-router-dom";
import EditTodoForm from "../edit-todoform/EditTodoForm";
import ButtonBack from "../buttons/ButtonBack";

function TodoPage() {
  const [todo, setTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [NotFound, setNotFound] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`);

      if (response.status === 404) {
        navigate("/404");
        setNotFound(true);
        return;
      }

      if (!response.ok) {
        throw new Error("Ошибка загрузки задачи");
      }
      const data = await response.json();
      setTodo(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodo(id);
  }, [id]);

  const requestUpdateTodo = async (id, newTitle) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json;charset=utf-8" },
        body: JSON.stringify({
          title: newTitle,
        }),
      });
      if (!response.ok) {
        throw new Error("Задача не обновлена");
      }
      const data = await response.json();
      setTodo(data);
      // navigate("/");
    } catch (error) {
      setError(error);
    }
  };

  const requestDeleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Ошибка в удалении задачи");
      }
      navigate("/");
    } catch (error) {
      setError(error);
    }
  };

  const isEditingTodo = () => {
    setIsEditing(true);
  };

  const handleUpdate = async (id, newTitle) => {
    await requestUpdateTodo(id, newTitle);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleDelete = async (id) => {
    await requestDeleteTodo(id);
  };

  if (isLoading) {
    return <div className={styles.loader}></div>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  if (NotFound) {
    return <NotFound />;
  }

  return (
    <>
      {isEditing ? (
        <EditTodoForm
          id={id}
          title={todo.title}
          handleUpdate={handleUpdate}
          handleCancelEdit={handleCancelEdit}
          isLoading={isLoading}
        />
      ) : (
        <div className={styles["todo-wrapper"]}>
          <div className={styles.todo}>
            <ButtonBack />
            <div className={styles.title}>{todo.title}</div>
          </div>

          <div className={styles.buttons}>
            <ButtonEdit isEditingTodo={isEditingTodo} />
            <ButtonDelete handleDelete={() => handleDelete(id)} />
          </div>
        </div>
      )}
    </>
  );
}

export default TodoPage;
