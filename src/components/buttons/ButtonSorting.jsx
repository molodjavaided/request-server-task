import React from "react";
import styles from "./buttons.module.css";

function ButtonSorting({ sorting, isSorted }) {
  return (
    <button onClick={sorting} className={styles["button-sorting"]}>
      {isSorted ? "Back" : "Sort"}
    </button>
  );
}

export default ButtonSorting;
