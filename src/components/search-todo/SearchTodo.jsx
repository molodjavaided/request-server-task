import { useState } from "react";
import styles from "./SearchTodo.module.css";

function SearchTodo({ searchTodo }) {
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
    searchTodo(e.target.value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Поиск задач..."
        value={search}
        onChange={handleChange}
        className={styles["input-search"]}
      />
    </>
  );
}

export default SearchTodo;
