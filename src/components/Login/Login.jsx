import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services";
import { setUserData } from "../../store/slices/userSlice";
import { Input } from "../../common/Input/Input";
import { Button } from "../../common/Button/Button";
import styles from "./styles.module.css";

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const validateForm = () => {
    const err = {};
    if (!formData.email.trim()) err.email = "Email is required";
    if (!formData.password.trim()) err.password = "Password is required";
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateForm();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    try {
      const response = await login(formData);
      if (response.successful) {
        const { name, email } = response.user;
        localStorage.setItem("token", response.result);
        dispatch(setUserData({ name, email, token: response.result }));
        navigate("/");
      } else {
        alert("Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} data-testid="loginForm">
          <Input
            labelText="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            data-testid="emailInput"
          />
          {errors.email && (
            <span className={styles.error} data-testid="emailError">
              {errors.email}
            </span>
          )}

          <Input
            labelText="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            data-testid="passwordInput"
          />
          {errors.password && (
            <span className={styles.error} data-testid="passwordError">
              {errors.password}
            </span>
          )}

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
