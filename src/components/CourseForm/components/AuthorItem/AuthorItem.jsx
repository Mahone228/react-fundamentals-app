import React from "react";
import styles from "./styles.module.css";
import { Button } from "../../../../common";
import deleteIcon from "../../../../assets/deleteButtonIcon.svg";

export const AuthorItem = ({
  name,
  onClick,
  buttonText,
  testId,
  isRemovable,
}) => {
  return (
    <div className={styles.authorItem} data-testid="authorItem">
      <span className={styles.authorName}>{name}</span>
      <Button
        buttonText={
          isRemovable ? (
            <img src={deleteIcon} alt="delete" className={styles.icon} />
          ) : (
            buttonText
          )
        }
        handleClick={onClick}
        data-testid={testId}
      />
    </div>
  );
};
