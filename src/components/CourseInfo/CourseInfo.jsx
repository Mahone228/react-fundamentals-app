import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getCoursesSelector, getAuthorsSelector } from "../../store/selectors";
import { formatCreationDate, getCourseDuration } from "../../helpers";
import styles from "./styles.module.css";
import buttonStyles from "../../common/Button/styles.module.css";

export const CourseInfo = () => {
  const { courseId } = useParams();
  const courses = useSelector(getCoursesSelector);
  const authors = useSelector(getAuthorsSelector);

  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return <p data-testid="courseInfo">Course not found</p>;
  }

  const courseAuthors = course.authors.map((id) => {
    const author = authors.find((a) => a.id === id);
    return author ? author.name : "Unknown Author";
  });

  return (
    <div className={styles.container} data-testid="courseInfo">
      <h1>{course.title}</h1>
      <div className={styles.courseInfo}>
        <p className={styles.description}>{course.description}</p>
        <div>
          <p>
            <b>ID:</b> {course.id}
          </p>
          <p>
            <b>Duration:</b> {getCourseDuration(course.duration)}
          </p>
          <p>
            <b>Created:</b> {formatCreationDate(course.creationDate)}
          </p>
          <div>
            <b>Authors:</b>
            <ul className={styles.authorsList}>
              {courseAuthors.map((name, idx) => (
                <li key={idx}>{name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.backButtonContainer}>
        <Link to="/courses" className={buttonStyles.button}>
          Back
        </Link>
      </div>
    </div>
  );
};
