import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import appStyles from "./App.module.css";
import {
  Header,
  Login,
  Registration,
  Courses,
  CourseInfo,
  CourseForm,
} from "./components";
import { selectUserToken } from "./store/selectors";
import { getCourses, getAuthors } from "./services";
import { setCourses } from "./store/slices/coursesSlice";
import { setAuthors } from "./store/slices/authorsSlice";

const App = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectUserToken);

  useEffect(() => {
    if (token && process.env.NODE_ENV !== "test") {
      (async () => {
        try {
          const coursesData = await getCourses();
          const authorsData = await getAuthors();

          dispatch(setCourses(coursesData.result));
          dispatch(setAuthors(authorsData.result));
        } catch (err) {
          console.error("Failed to load courses or authors:", err);
        }
      })();
    }
  }, [token, dispatch]);

  const renderGuestRoutes = () => (
    <>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </>
  );

  const renderAuthenticatedRoutes = () => (
    <>
      <Route path="/" element={<Courses />} />
      <Route path="/courses/add" element={<CourseForm />} />
      <Route path="/courses/:courseId" element={<CourseInfo />} />
      <Route path="*" element={<Navigate to="/" />} />
    </>
  );

  return (
    <div className={appStyles.app}>
      <Header />
      <Routes>
        {token ? renderAuthenticatedRoutes() : renderGuestRoutes()}
      </Routes>
    </div>
  );
};

export default App;
