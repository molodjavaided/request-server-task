import styles from "./SearchTodo.module.css";
import React from "react";
import { useDispatch } from "react-redux";
import { setSearchTerm } from "../../store/actions/filterActions";

export function SearchTodo({ value }) {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const term = e.target.value;
    dispatch(setSearchTerm(term));
    // if (onChange) {
    //   onChange(term);
    // }
  };

  return (
    <input
      type="text"
      placeholder="Поиск задач..."
      value={value}
      onChange={handleChange}
      className={styles["input-search"]}
    />
  );
}
