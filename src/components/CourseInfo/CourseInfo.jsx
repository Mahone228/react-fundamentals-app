// Module 1.
// * Use template to show course's information:
// ** ID of course;
// ** Title;
// ** Description;
// ** Duration;
// ** List of authors;
// ** Creation date;
// * use <Button /> component to replace CourseInfo component with Courses component
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-1/home-task/components#course-info
import React from "react";
import styles from "./styles.module.css";
import { formatCreationDate, getCourseDuration } from "../../helpers";
import { Button } from "../../common";

export const CourseInfo = ({
  coursesList,
  authorsList,
  onBack,
  showCourseId,
}) => {
  const selectedCourse = coursesList.find(
    (course) => course.id === showCourseId
  );

  const authorItems = selectedCourse.authors.map((id) => {
    const match = authorsList.find((author) => author.id === id);
    return match ? <li key={id}>{match.name}</li> : null;
  });

  return (
    <div className={styles.container} data-testid="courseInfo">
      <div className={styles.header}>
        <h1>{selectedCourse.title}</h1>
      </div>

      <section className={styles.courseInfo}>
        <div className={styles.description}>
          <p>{selectedCourse.description}</p>
        </div>

        <div className={styles.meta}>
          <p>
            <b>ID:</b> {selectedCourse.id}
          </p>
          <p>
            <b>Duration:</b> {getCourseDuration(selectedCourse.duration)}
          </p>
          <p>
            <b>Created:</b> {formatCreationDate(selectedCourse.creationDate)}
          </p>

          <div>
            <b>Authors:</b>
            <ul className={styles.authorsList}>{authorItems}</ul>
          </div>
        </div>
      </section>

      <footer className={styles.backButton}>
        <Button buttonText="BACK" handleClick={onBack} />
      </footer>
    </div>
  );
};

// Module 2.
// * render component by route '/courses/:courseId'
// * use 'useParam' hook to get course id, remove prop 'showCourseId'
// * remove 'onBack' prop
// * use '<Link />' instead <Button /> component for 'BACK' button
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-2/home-task/components#course-info

// Module 3.
// * remove props 'coursesList', 'authorsList'
// * use selectors from store/selectors.js to get coursesList, authorsList from store

// props description
// * 'coursesList' - list of all courses. You need it to get chosen course from the list
// * 'authorsList' - list of all authors. You need it to get authors' names for chosen course
// * 'showCourseId' - id of chosen course. Use it to find needed course on the 'coursesList'.
