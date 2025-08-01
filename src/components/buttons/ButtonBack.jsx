import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./buttons.module.css";

function ButtonBack() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };
  return (
    <button className={styles["button-back"]} onClick={handleBack}>
      Back
    </button>
  );
}

export default ButtonBack;
