import React from "react";
import styles from "./styles.module.css";
import { Logo } from "./components";
import { Button } from "../../common";
import { useDispatch, useSelector } from "react-redux";
import { getUserNameSelector } from "../../store/selectors";
import { removeUserData } from "../../store/slices/userSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const userName = useSelector(getUserNameSelector);
  const token = localStorage.getItem("token");

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    dispatch(removeUserData());
  };

  return (
    <div className={styles.headerContainer}>
      <Logo />
      {token && (
        <div className={styles.userContainer}>
          <p className={styles.userName}>{userName}</p>
          <Button buttonText="LOGOUT" handleClick={handleLogoutClick} />
        </div>
      )}
    </div>
  );
};
