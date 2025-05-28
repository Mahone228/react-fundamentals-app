import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "../../common/Button/Button";
import { CourseCard } from "./components";
import styles from "./styles.module.css";

export const Courses = () => {
  const courses = useSelector((state) => state.courses);
  const user = useSelector((state) => state.user);

  return (
    <section className={styles.wrapper}>
      <header className={styles.topBar}>
        <h2 className={styles.heading}>Courses</h2>
        {user?.isAuth && (
          <Link to="/courses/add" className={styles.link}>
            <Button buttonText="Add new course" data-testid="addCourse" />
          </Link>
        )}
      </header>

      {courses && courses.length > 0 ? (
        <div className={styles.cardsContainer}>
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <h3>Your List Is Empty</h3>
          <Link to="/courses/add" className={styles.link}>
            <Button buttonText="Add new course" data-testid="addCourse" />
          </Link>
        </div>
      )}
    </section>
  );
};
