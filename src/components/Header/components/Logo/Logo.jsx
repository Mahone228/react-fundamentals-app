// Module 1:
// * add logo.svg as a logo image
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-1/home-task/components#logo-component
import React from "react";
import styles from "./styles.module.css";
import logo from "../../../../assets/logo.svg";

export const Logo = function () {
  return (
    <picture>
      <img src={logo} alt="logo" className={styles.logo} />
    </picture>
  );
};
