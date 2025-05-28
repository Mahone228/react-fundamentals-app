// Module 1:
// * render list of components using 'CourseCard' component for each course
// * render 'ADD NEW COURSE' button (reuse Button component)
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-1/home-task/components#courses-component
// * render EmptyCourseList component when no courses
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-1/home-task/components#emptycourselist-component
// * DO NOT map authors to the course inside Courses.jsx component (DO it inside CourseCard)
import React, { useState, useMemo } from "react";
import styles from "./styles.module.css";

import { Button } from "../../common";
import { CourseCard } from "./components";

export const Courses = ({
  coursesList,
  authorsList,
  onAddClick,
  handleShowCourse,
}) => {
  const [localCourses, setLocalCourses] = useState(coursesList);

  const handleDeleteCourse = (id) =>
    setLocalCourses((prev) => prev.filter((c) => c.id !== id));

  const courseCards = useMemo(
    () =>
      localCourses.map((course) => (
        <CourseCard
          key={course.id}
          course={course}
          authorsList={authorsList}
          handleShowCourse={handleShowCourse}
          onDeleteCourse={handleDeleteCourse}
        />
      )),
    [authorsList, handleShowCourse, localCourses]
  );

  return localCourses.length === 0 ? (
    <EmptyCourseList onAddClick={onAddClick} />
  ) : (
    <section className={styles.coursesWrapper}>
      <div className={styles.panel}>
        <Button
          buttonText="ADD NEW COURSE"
          data-testid="addCourse"
          handleClick={onAddClick}
        />
      </div>
      <section className={styles.courseList}>{courseCards}</section>
    </section>
  );
};

export const EmptyCourseList = ({ onAddClick }) => {
  return (
    <article className={styles.empty} data-testid="emptyContainer">
      <header>
        <h2>Your List Is Empty</h2>
      </header>
      <p>Please use "add new course" button to add your first course</p>
      <footer className={styles.buttonContainer}>
        <Button
          buttonText="ADD NEW COURSE"
          data-testid="addCourse"
          handleClick={onAddClick}
        />
      </footer>
    </article>
  );
};

// Module 2:
// * render this component by route '/courses'
// * navigate to this component if 'localStorage' contains user's token
// * navigate to the route courses/add by clicking 'Add New Course' button, use 'Link' component from 'react-router-dom'
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-2/home-task/components#courses

// Module 3:
// * stop using mocked courses and authors data
// * delete props 'coursesList' and 'authorsList'
// * use useSelector to get courses and authors from the store
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-3/home-task/components#courses-component

// Module 4:
// navigate to '/courses/add' route by clicking 'ADD NEW COURSE' button in the 'EmptyCourseList'.
// show message 'You don't have permissions to create a course. Please log in as ADMIN' by clicking ADD NEW COURSE button in the 'EmptyCourseList'.
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-4/home-task/components#emptycourselist-component

// Module 5:
// * proposed cases for unit tests:
//   ** Courses should display amount of CourseCard equal length of courses array.
//   ** CourseForm should be shown after a click on the "Add new course" button.
