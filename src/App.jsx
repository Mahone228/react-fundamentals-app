// Module 2:
// * use mockedAuthorsList and mockedCoursesList mocked data
// * remove useState for selected courseId
// * use hook useState for storing list of courses and authors
// * import Routes and Route from 'react-router-dom'
// * Add Routes to the container div (do not include Header to the Routes since header will not be changed with pages)
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-2/home-task/components#add-the-router-to-the-app-component
import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import styles from "./App.module.css";
import {
  Header,
  Registration,
  Login,
  Courses,
  CourseInfo,
  CourseForm,
} from "./components";
import { mockedCoursesList, mockedAuthorsList } from "./constants";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [userName, setUserName] = useState(() =>
    localStorage.getItem("userName")
  );
  const [courses, setCourses] = useState([...mockedCoursesList]);
  const [authors, setAuthors] = useState([...mockedAuthorsList]);

  const isAuthPage = ["/login", "/registration"].includes(location.pathname);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserName = localStorage.getItem("userName");

    setToken(storedToken);
    setUserName(storedUserName);

    if (!location.pathname || location.pathname === "/") {
      navigate(storedToken ? "/courses" : "/login", { replace: true });
    }
  }, [location.pathname, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setToken(null);
    setUserName(null);
    navigate("/login");
  };

  const handleCreateCourse = (newCourse) =>
    setCourses((prevCourses) => [...prevCourses, newCourse]);

  const handleCreateAuthor = (newAuthor) =>
    setAuthors((prevAuthors) => [...prevAuthors, newAuthor]);

  const renderProtected = (element) =>
    token ? element : <Navigate to="/login" />;

  return (
    <div className={styles.wrapper}>
      {token && !isAuthPage && (
        <Header userName={userName} onLogout={handleLogout} />
      )}
      <div className={styles.container}>
        <Routes>
          <Route
            path="/login"
            element={<Login setToken={setToken} setUserName={setUserName} />}
          />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/courses"
            element={renderProtected(
              <Courses coursesList={courses} authorsList={authors} />
            )}
          />
          <Route
            path="/courses/:courseId"
            element={renderProtected(
              <CourseInfo coursesList={courses} authorsList={authors} />
            )}
          />
          <Route
            path="/courses/add"
            element={renderProtected(
              <CourseForm
                authorsList={authors}
                createCourse={handleCreateCourse}
                createAuthor={handleCreateAuthor}
              />
            )}
          />
          <Route
            path="*"
            element={<Navigate to={token ? "/courses" : "/login"} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

// Module 3:
// * the App component and BrowserRouter components should be wrapped with Redux 'Provider' in src/index.js
// * remove 'mockedAuthorsList' and 'mockedCoursesList' constants amd import and their use throughout the project
// * use selector from store/selectors.js to get user token from store
// * get courses and authors from the server. Use courses/all and authors/all GET requests.
// * save courses and authors to the store. Use 'setCourses' and 'setAuthors' actions from appropriate slices here 'src/store/slices'
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-3/home-task/components#app-component

// Module 4:
// * rewrite old GET requests /courses/all with 'getCoursesThunk' from 'src/store/thunks/coursesThunk.js' using getCourses service from 'src/services.js'.
// * rewrite old GET requests /authors/all with 'getAuthorsThunk' from 'src/store/thunks/authorsThunk.js' using getAuthors service from 'src/services.js'.
// * wrap 'CourseForm' in the 'PrivateRoute' component
// * get authorized user info by 'user/me' GET request if 'localStorage' contains token
