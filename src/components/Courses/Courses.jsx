import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Button } from "../../common";
import { CourseCard } from "./components";

export const Courses = ({ coursesList, authorsList }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  const renderEmpty = () => (
    <div className={styles.empty} data-testid="emptyContainer">
      <h2>Your List Is Empty</h2>
      <p>Please use "add new course" button to add your first course</p>
      <div className={styles.buttonContainer}>
        <Link to="/courses/add" className={styles.noUnderline}>
          <Button buttonText="ADD NEW COURSE" data-testid="addCourse" />
        </Link>
      </div>
    </div>
  );

  const renderCourseList = () => (
    <div className={styles.courseList}>
      <div className={styles.panel}>
        <Link to="/courses/add" className={styles.noUnderline}>
          <Button buttonText="ADD NEW COURSE" data-testid="addCourse" />
        </Link>
      </div>
      {coursesList.map((course) => (
        <CourseCard key={course.id} course={course} authorsList={authorsList} />
      ))}
    </div>
  );

  return coursesList.length ? renderCourseList() : renderEmpty();
};

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
