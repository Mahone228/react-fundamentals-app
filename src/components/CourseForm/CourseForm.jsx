import React, { useState } from "react";
import styles from "./styles.module.css";
import { Input, Button } from "../../common";
import { getCourseDuration } from "../../helpers";
import { AuthorItem } from "./components/AuthorItem/AuthorItem";
import { CreateAuthor } from "./components/CreateAuthor/CreateAuthor";

export const CourseForm = ({ authorsList, createCourse, createAuthor }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [availableAuthors, setAvailableAuthors] = useState(authorsList);
  const [courseAuthors, setCourseAuthors] = useState([]);

  const isFormValid = () => {
    return (
      title.trim().length >= 2 &&
      description.trim().length >= 2 &&
      Number(duration) > 0 &&
      courseAuthors.length > 0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const newCourse = {
      id: Date.now().toString(),
      title,
      description,
      creationDate: new Date().toLocaleDateString("en-GB"),
      duration: Number(duration),
      authors: courseAuthors.map((a) => a.id),
    };

    createCourse(newCourse);

    setTitle("");
    setDescription("");
    setDuration("");
    setCourseAuthors([]);
    setAvailableAuthors(authorsList);
  };

  const addAuthor = (author) => {
    setAvailableAuthors((prev) => prev.filter((a) => a.id !== author.id));
    setCourseAuthors((prev) => [...prev, author]);
  };

  const removeAuthor = (author) => {
    setCourseAuthors((prev) => prev.filter((a) => a.id !== author.id));
    setAvailableAuthors((prev) => [...prev, author]);
  };

  const handleNewAuthor = (author) => {
    setAvailableAuthors((prev) => [...prev, author]);
    createAuthor(author);
  };

  return (
    <div className={styles.container}>
      <h2>Course Form</h2>
      <form
        onSubmit={handleSubmit}
        className={styles.form}
        data-testid="courseForm"
      >
        <Input
          labelText="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholderText="Enter course title"
          data-testid="titleInput"
        />

        <label htmlFor="description" className={styles.label}>
          Description
        </label>
        <textarea
          id="description"
          className={styles.textarea}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          data-testid="descriptionTextArea"
        />

        <Input
          labelText="Duration (minutes)"
          name="duration"
          type="number"
          min="1"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          placeholderText="Enter duration"
          data-testid="durationInput"
        />
        <p>
          <b>Total time:</b> {getCourseDuration(Number(duration))}
        </p>

        <div className={styles.columns}>
          <div className={styles.leftColumn}>
            <h3>Create Author</h3>
            <CreateAuthor onCreateAuthor={handleNewAuthor} />

            <h4>Available Authors</h4>
            {availableAuthors.length > 0 ? (
              availableAuthors.map((author) => (
                <AuthorItem
                  key={author.id}
                  name={author.name}
                  buttonText="Add"
                  onClick={() => addAuthor(author)}
                  testId="addAuthor"
                />
              ))
            ) : (
              <p>No authors available</p>
            )}
          </div>

          <div className={styles.rightColumn}>
            <h3>Course Authors</h3>
            {courseAuthors.length > 0 ? (
              courseAuthors.map((author) => (
                <AuthorItem
                  key={author.id}
                  name={author.name}
                  buttonText="Remove"
                  onClick={() => removeAuthor(author)}
                  testId="deleteAuthor"
                />
              ))
            ) : (
              <p>Author list is empty</p>
            )}
          </div>
        </div>

        <div className={styles.buttonsContainer}>
          <Button
            buttonText="Cancel"
            handleClick={() => window.history.back()}
            data-testid="cancelButton"
          />
          <Button
            type="submit"
            buttonText="Create Course"
            data-testid="createCourseButton"
          />
        </div>
      </form>
    </div>
  );
};
