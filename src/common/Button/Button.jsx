// Module 1:
// * use this component in components: Header, Courses
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-1/home-task/components#button-component
import React from "react";
import styles from "./styles.module.css";

export const Button = ({
  buttonText,
  handleClick,
  "data-testid": dataTestId,
  type = "button",
}) => (
  <button
    className={styles.button}
    data-testid={dataTestId}
    onClick={handleClick}
    type={type}
  >
    {buttonText}
  </button>
);
