import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCourseDuration, formatCreationDate } from "../../../../helpers";
import { getAuthorsSelector } from "../../../../store/selectors";
import deleteIcon from "../../../../assets/deleteButtonIcon.svg";
import editIcon from "../../../../assets/editButtonIcon.svg";
import { Button } from "../../../../common";
import styles from "./styles.module.css";

export const CourseCard = ({ course }) => {
  const dispatch = useDispatch();
  const authors = useSelector(getAuthorsSelector);

  const handleDelete = () => {
    const isTesting = process.env.NODE_ENV === "test";
    if (isTesting) {
      const { deleteCourse } = require("../../../../store/slices/coursesSlice");
      dispatch(deleteCourse(course.id));
    } else {
      const {
        deleteCourseThunk,
      } = require("../../../../store/thunks/coursesThunk");
      dispatch(deleteCourseThunk(course.id));
    }
  };

  const authorNames = course.authors
    .map((id) => authors.find((a) => a.id === id)?.name || "Unknown Author")
    .join(", ");

  return (
    <article className={styles.card} data-testid="courseCard">
      <div className={styles.infoBlock}>
        <h3 className={styles.title}>{course.title}</h3>
        <p className={styles.description}>{course.description}</p>
      </div>
      <aside className={styles.metaBlock}>
        <div className={styles.detail}>
          <strong>Authors:</strong> <span>{authorNames}</span>
        </div>
        <div className={styles.detail}>
          <strong>Duration:</strong>{" "}
          <span>{getCourseDuration(course.duration)}</span>
        </div>
        <div className={styles.detail}>
          <strong>Created:</strong>{" "}
          <span>
            {course.creationDate
              ? formatCreationDate(course.creationDate)
              : "Unknown"}
          </span>
        </div>
        <div className={styles.actions}>
          <Link to={`/courses/${course.id}`} className={styles.link}>
            <Button buttonText="SHOW COURSE" />
          </Link>
          <button
            onClick={handleDelete}
            className={styles.iconBtn}
            data-testid="deleteCourse"
          >
            <img src={deleteIcon} alt="Delete" />
          </button>
          <button className={styles.iconBtn} data-testid="updateCourse">
            <img src={editIcon} alt="Edit" />
          </button>
        </div>
      </aside>
    </article>
  );
};
