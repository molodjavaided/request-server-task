import React, { useEffect, useState } from "react";
import ButtonEdit from "../buttons/ButtonEdit";
import ButtonDelete from "../buttons/ButtonDelete";
import styles from "./TodoPage.module.css";
import { useParams } from "react-router-dom";
import EditTodoForm from "../edit-todoform/EditTodoForm";

function TodoPage({ requestDeleteTodo, requestUpdateTodo }) {
  const [todo, setTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();

  const fetchTodo = async () => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`);
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
    fetchTodo();
  }, [id]);

  const isEditingTodo = () => {
    setIsEditing(true);
  };

  const handleUpdate = async (id, newTitle) => {
    await requestUpdateTodo(id, newTitle);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // setEditedTitle(todo.title);
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
        <div className={styles.todo}>
          <div className={styles.title}>{todo.title}</div>
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
