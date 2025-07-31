import React from "react";
import styles from "./buttons.module.css";

function ButtonCancel({ handleCancelEdit }) {
  return (
    <button className={styles["button-cancel"]} onClick={handleCancelEdit}>
      Cancel
    </button>
  );
}

export default ButtonCancel;
