import React from "react";
import { useTodoContext } from "./context/Context";
import { FormTodo, TodoList, SearchTodo, ButtonSort } from "./components";
import styles from "./App.module.css";

function App() {
  const { error, isLoading, searchTerm, setSearchTerm } = useTodoContext();

  return (
    <div className={styles.container}>
      <FormTodo />
      <div className={styles["wrapper-search-sorting"]}>
        <ButtonSort />
        <SearchTodo value={searchTerm} onChange={setSearchTerm} />
      </div>
      {error && <div className={styles.error}>{error}</div>}
      {isLoading ? (
        <div className={styles.loading}>Загружаем задачи...</div>
      ) : (
        <TodoList />
      )}
    </div>
  );
}

export default App;
