import React from "react";
import styles from "./buttons.module.css";

function ButtonUpdate() {
  return (
    <button className={styles["button-update"]} type="submit">
      Update
    </button>
  );
}

export default ButtonUpdate;
