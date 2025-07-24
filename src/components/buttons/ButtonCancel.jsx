import React from "react";
import styles from "./buttons.module.css";

function ButtonCancel({ id, cancelEdit }) {
  return (
    <button
      className={styles["button-cancel"]}
      id={id}
      onClick={() => cancelEdit(id)}
    >
      Cancel
    </button>
  );
}

export default ButtonCancel;
