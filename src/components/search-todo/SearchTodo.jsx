import styles from "./SearchTodo.module.css";

function SearchTodo({ valueSearch, handleSearch }) {
  return (
    <>
      <input
        name="q"
        type="text"
        placeholder="Поиск задач..."
        value={valueSearch}
        onChange={handleSearch}
        className={styles["input-search"]}
      />
    </>
  );
}

export default SearchTodo;
