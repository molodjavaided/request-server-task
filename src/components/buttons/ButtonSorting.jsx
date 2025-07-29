import React from "react";
import styles from "./buttons.module.css";

function ButtonSorting({ handleSort }) {
  return (
    <button onClick={handleSort} className={styles["button-sorting"]}>
      Sort
    </button>
  );
}

export default ButtonSorting;
