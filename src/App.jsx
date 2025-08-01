import { useState } from "react";
import TodoList from "./components/todolist/TodoList";
import styles from "./App.module.css";
import FormTodo from "./components/form-todo/FormTodo";
import SearchTodo from "./components/search-todo/SearchTodo";
import ButtonSorting from "./components/buttons/ButtonSorting";
import { useDebounce } from "@uidotdev/usehooks";
import { Outlet, useParams } from "react-router-dom";

function App() {
  const [sortByOrder, setSortByOrder] = useState({
    path: "title",
    order: "desc",
  });
  const [valueSearch, setValueSearch] = useState("");
  const { id } = useParams();

  const debouncedSearchTerm = useDebounce(valueSearch, 500);

  const handleSearch = (e) => {
    setValueSearch(e.target.value);
  };

  const handleSort = () => {
    setSortByOrder({
      path: "title",
      order: sortByOrder.order === "desc" ? "asc" : "desc",
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles["wrapper-search-sorting"]}>
          <ButtonSorting handleSort={handleSort} />
          <SearchTodo valueSearch={valueSearch} handleSearch={handleSearch} />
        </div>
        <FormTodo />
        {!id ? (
          <TodoList
            sortByOrder={sortByOrder}
            debouncedSearchTerm={debouncedSearchTerm}
          />
        ) : (
          <Outlet />
        )}
      </div>
    </>
  );
}

export default App;
