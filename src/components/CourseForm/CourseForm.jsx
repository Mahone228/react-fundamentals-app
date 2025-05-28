import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { Input, Button } from "../../common";
import { getCourseDuration } from "../../helpers";
import { AuthorItem } from "./components/AuthorItem/AuthorItem";
import { CreateAuthor } from "./components/CreateAuthor/CreateAuthor";
import { useDispatch, useSelector } from "react-redux";
import { getAuthorsSelector } from "../../store/selectors";
import { saveCourse } from "../../store/slices/coursesSlice";

export const CourseForm = () => {
  const dispatch = useDispatch();
  const authorsList = useSelector(getAuthorsSelector);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [availableAuthors, setAvailableAuthors] = useState([]);
  const [courseAuthors, setCourseAuthors] = useState([]);

  useEffect(() => {
    setAvailableAuthors(authorsList);
  }, [authorsList]);

  const handleCreateCourse = (e) => {
    e.preventDefault();

    if (
      title.trim().length < 2 ||
      description.trim().length < 2 ||
      Number(duration) <= 0 ||
      courseAuthors.length === 0
    ) {
      alert("All fields must be valid and filled in.");
      return;
    }

    const newCourse = {
      title,
      description,
      duration: Number(duration),
      authors: courseAuthors.map((a) => a.id),
    };

    dispatch(saveCourse(newCourse));

    setTitle("");
    setDescription("");
    setDuration("");
    setCourseAuthors([]);
    setAvailableAuthors(authorsList);
  };

  const addAuthorToCourse = (author) => {
    setAvailableAuthors(availableAuthors.filter((a) => a.id !== author.id));
    setCourseAuthors([...courseAuthors, author]);
  };

  const removeAuthorFromCourse = (author) => {
    setCourseAuthors(courseAuthors.filter((a) => a.id !== author.id));
    setAvailableAuthors([...availableAuthors, author]);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.pageTitle}>Course Edit/Create Page</h2>
      <form
        onSubmit={handleCreateCourse}
        data-testid="courseForm"
        className={styles.form}
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

        <div className={styles.columns}>
          <div className={styles.leftColumn}>
            <Input
              labelText="Duration"
              name="duration"
              type="number"
              min="1"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholderText="Enter duration in minutes"
              data-testid="durationInput"
            />
            <div className={styles.durationOutput}>
              {getCourseDuration(Number(duration))} hours
            </div>

            <h3>Authors</h3>
            <CreateAuthor />

            <h4 className={styles.subTitle}>Authors List</h4>
            {availableAuthors.map((author) => (
              <AuthorItem
                key={author.id}
                name={author.name}
                buttonText="Add author"
                onClick={() => addAuthorToCourse(author)}
                testId="addAuthor"
              />
            ))}
          </div>

          <div className={styles.rightColumn}>
            <h3>Course Authors</h3>
            {courseAuthors.length > 0 ? (
              courseAuthors.map((author) => (
                <AuthorItem
                  key={author.id}
                  name={author.name}
                  buttonText="Delete author"
                  onClick={() => removeAuthorFromCourse(author)}
                  testId="deleteAuthor"
                  isRemovable
                />
              ))
            ) : (
              <p className={styles.notification}>Author list is empty</p>
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
