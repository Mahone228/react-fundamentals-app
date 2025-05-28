import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCourseDuration, formatCreationDate } from "../../../../helpers";
import styles from "./styles.module.css";
import { Button } from "../../../../common";

import deleteIcon from "../../../../assets/deleteButtonIcon.svg";
import editIcon from "../../../../assets/editButtonIcon.svg";

export const CourseCard = ({ course, authorsList, onDeleteCourse }) => {
  const navigate = useNavigate();

  const getAuthorNames = () =>
    course.authors
      .map((authorId) => {
        const match = authorsList.find((author) => author.id === authorId);
        return match ? match.name : "Unknown Author";
      })
      .join(", ");

  const handleEdit = () => {
    navigate(`/courses/update/${course.id}`);
  };

  return (
    <div className={styles.cardContainer} data-testid="courseCard">
      <div className={styles.cardText}>
        <h2 className={styles.title}>{course.title}</h2>
        <p className={styles.description}>{course.description}</p>
      </div>

      <div className={styles.cardDetails}>
        <p>
          <b>Authors:</b>{" "}
          <span className={styles.authorsLine}>{getAuthorNames()}</span>
        </p>
        <p>
          <b>Duration:</b> {getCourseDuration(course.duration)}
        </p>
        <p>
          <b>Created:</b> {formatCreationDate(course.creationDate)}
        </p>

        <div className={styles.buttonsContainer}>
          <Link to={`/courses/${course.id}`} className={styles.noUnderline}>
            <Button buttonText="SHOW COURSE" />
          </Link>

          <button
            onClick={() => onDeleteCourse?.(course.id)}
            className={styles.iconButton}
            data-testid="deleteCourse"
          >
            <img src={deleteIcon} alt="Delete" />
          </button>

          <button
            onClick={handleEdit}
            className={styles.iconButton}
            data-testid="editCourse"
          >
            <img src={editIcon} alt="Edit" />
          </button>
        </div>
      </div>
    </div>
  );
};
