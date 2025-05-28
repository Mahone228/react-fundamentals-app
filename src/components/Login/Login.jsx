// // Module 1. You don't need to do anything with this component (we had to comment this component for 1st module tests)

// // Module 2.
// // * uncomment this component (ctrl + a => ctrl + /)
// // * finish markup according to the figma https://www.figma.com/design/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?node-id=2927-216&t=OXbHXwMixWTtxRSw-1
// // * add validation for fields: all fields are required. Show validation message. https://www.figma.com/design/m0N0SGLclqUEGR6TUNvyn9/Fundamentals-Courses?node-id=2932-191&t=OXbHXwMixWTtxRSw-1
// // * render this component by route '/login'
// // * use login service to submit form data and make POST API request '/login'.
// // * component should have a link to the Registration page (see design)
// // * save token from API after success login to localStorage.
// // ** PAY ATTENTION ** token should be saved to localStorage inside login handler function after login service response
// // ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-2/home-task/components#login-new-component

// // Module 3.
// // * use 'setUserData' from 'userSlice.js' to save user's name, token and email to the store after success login.
// // ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-3/home-task/components#login-component

// // Module 4.
// // * use 'setUserData' from 'userSlice.js' to add user's data to store. (DO NOT use 'user/me' [GET] request)
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Input } from "../../common/Input/Input";
import { Button } from "../../common/Button/Button";
import { login } from "../../services";

export const Login = ({ setToken, setUserName }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const onInputChange = ({ target: { name, value } }) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errorMap = {};
    if (!formData.email.trim()) errorMap.email = "Email is required";
    if (!formData.password.trim()) errorMap.password = "Password is required";
    return errorMap;
  };

  const onFormSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length) return;

    try {
      const response = await login(formData);
      localStorage.setItem("token", response.result);
      localStorage.setItem("userName", response.user.name);
      setToken(response.result);
      setUserName(response.user.name);
      navigate("/courses");
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };

  const renderField = (name, label, placeholder, type = "text") => (
    <>
      <Input
        labelText={label}
        name={name}
        type={type}
        value={formData[name]}
        onChange={onInputChange}
        placeholder={placeholder}
        data-testid={`${name}Input`}
      />
      {errors[name] && (
        <div className={styles.error} data-testid={`${name}Error`}>
          {errors[name]}
        </div>
      )}
    </>
  );

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <div className={styles.formContainer}>
        <form onSubmit={onFormSubmit} data-testid="loginForm">
          {renderField("email", "Email", "Enter your email")}
          {renderField("password", "Password", "Enter password", "password")}
          <Button buttonText="Login" type="submit" data-testid="loginButton" />
        </form>
        <p>
          <span>If you don't have an account you </span>
          <Link to="/registration" data-testid="registrationLink">
            Registration
          </Link>
        </p>
      </div>
    </div>
  );
};
