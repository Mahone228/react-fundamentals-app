import React from "react";
import styles from "./styles.module.css";
import { Logo } from "./components";
import { Button } from "../../common";

export const Header = ({ userName = "Harry Potter", onLogout }) => {
  const tokenExists = !!localStorage.getItem("token");

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    if (typeof onLogout === "function") onLogout();
  };

  return (
    <header className={styles.headerContainer}>
      <Logo />
      {tokenExists && (
        <div className={styles.userContainer}>
          <p className={styles.userName}>{userName}</p>
          <Button buttonText="LOGOUT" handleClick={handleLogoutClick} />
        </div>
      )}
    </header>
  );
};
