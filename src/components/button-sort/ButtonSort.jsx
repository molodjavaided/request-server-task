import React from "react";
import { useDispatch } from "react-redux";
import { toggleSortOrder } from "../../store/actions/filterActions";
import styles from "./ButtonSort.module.css";

export function ButtonSort() {
  const dispatch = useDispatch();

  const handleSort = () => {
    dispatch(toggleSortOrder());
  };

  return (
    <button onClick={handleSort} className={styles["button-sorting"]}>
      Sort
    </button>
  );
}
