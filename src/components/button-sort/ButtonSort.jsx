import React from "react";
import { useTodoContext } from "../../context/Context";
import styles from "./ButtonSort.module.css";

export function ButtonSort() {
  const { handleSort } = useTodoContext();

  return (
    <button onClick={handleSort} className={styles["button-sorting"]}>
      Sort
    </button>
  );
}
