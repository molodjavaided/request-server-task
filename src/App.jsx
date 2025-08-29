import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebounce } from "@uidotdev/usehooks";
import { FormTodo, TodoList, SearchTodo, ButtonSort } from "./components";
import { fetchTodos } from "./store/actions/todos/fetchTodos";
import { setSearchTerm } from "./store/actions/filterActions";
import styles from "./App.module.css";

function App() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.ui.error);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const searchTerm = useSelector((state) => state.filters.searchTerm);
  const sortBy = useSelector((state) => state.filters.sortBy);
  const order = useSelector((state) => state.filters.order);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch, sortBy, order, debouncedSearchTerm]);

  const handleSetSearchTerm = (e) => {
    dispatch(setSearchTerm(e));
  };

  return (
    <div className={styles.container}>
      <FormTodo />
      <div className={styles["wrapper-search-sorting"]}>
        <ButtonSort />
        <SearchTodo value={searchTerm} onChange={handleSetSearchTerm} />
      </div>
      {error && <div className={styles.error}>{error}</div>}
      {isLoading ? (
        <div className={styles["loading"]}>Loading...</div>
      ) : (
        <TodoList />
      )}
    </div>
  );
}

export default App;
