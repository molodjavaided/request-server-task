import React from "react";
import styles from "./buttons.module.css";

function ButtonAdd() {
  return (
    <button className={styles["button-add"]} type="submit">
      Add
    </button>
  );
}

export default ButtonAdd;
