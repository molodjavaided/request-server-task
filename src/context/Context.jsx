import { createContext, useState, useEffect, useContext } from "react";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../api/TodoFetchs";
import { useDebounce } from "@uidotdev/usehooks";

const appContext = createContext(null);

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sortByOrder, setSortByOrder] = useState({
    path: "title",
    order: "desc",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const [isAdding, setIsAdding] = useState(false);
  const [updatingIds, setUpdatingIds] = useState([]);
  const [deletingIds, setDeletingIds] = useState([]);
  const [editingId, setEditigId] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Загружаю задачи
  const fetchTodos = async () => {
    setIsLoading(true);
    try {
      const data = await getTodos(
        sortByOrder.path,
        sortByOrder.order,
        searchTerm
      );
      setTodos(data);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [sortByOrder.path, sortByOrder.order, debouncedSearchTerm]);
  // Добавляю задачу
  const handleAddTodo = async (title) => {
    setIsAdding(true);
    try {
      const newTodo = await createTodo(title);
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsAdding(false);
    }
  };
  // Обновляю задачу
  const handleUpdateTodo = async (id, title) => {
    setUpdatingIds((prevTodos) => [...prevTodos, id]);
    try {
      await updateTodo(id, title);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? { ...todo, title } : todo))
      );
      setEditigId(null);
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setUpdatingIds((prevTodos) =>
        prevTodos.filter((itemId) => itemId !== id)
      );
    }
  };
  // Удаляю задачу
  const handleDeleteTodo = async (id) => {
    setDeletingIds((prevTodos) => [...prevTodos, id]);
    try {
      await deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      setError(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setDeletingIds((prevTodos) =>
        prevTodos.filter((itemId) => itemId !== id)
      );
    }
  };

  // Сортировка
  const handleSort = () => {
    setSortByOrder({
      path: "title",
      order: sortByOrder.order === "desc" ? "asc" : "desc",
    });
  };

  // Редактирование задачи
  const startEditing = (id) => {
    setEditigId(id);
  };

  const cancelEditing = () => {
    setEditigId(null);
  };

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <appContext.Provider
      value={{
        todos,
        error,
        isLoading,
        isAdding,
        updatingIds,
        deletingIds,
        editingId,
        sortByOrder,
        searchTerm,
        handleAddTodo,
        handleUpdateTodo,
        handleDeleteTodo,
        handleSort,
        setSearchTerm,
        startEditing,
        cancelEditing,
      }}
    >
      {children}
    </appContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(appContext);
  if (!context) {
    throw new Error("Ошибка");
  }
  return context;
};
