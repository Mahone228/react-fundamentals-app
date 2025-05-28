import React, { useState } from "react";
import styles from "./styles.module.css";
import { Input, Button } from "../../../../common";

export const CreateAuthor = ({ onCreateAuthor }) => {
  const [name, setName] = useState("");

  const submitNewAuthor = () => {
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      alert("Author name must be at least 2 characters");
      return;
    }

    const author = {
      id: String(Date.now()),
      name: trimmed,
    };

    onCreateAuthor(author);
    setName("");
  };

  return (
    <div className={styles.createAuthor}>
      <Input
        labelText="Author"
        name="author"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholderText="New author name"
        data-testid="createAuthorInput"
        aria-label="Author name input"
      />
      <Button
        buttonText="Add Author"
        handleClick={submitNewAuthor}
        data-testid="createAuthorButton"
      />
    </div>
  );
};
