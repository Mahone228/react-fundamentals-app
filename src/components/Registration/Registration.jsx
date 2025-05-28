import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUser } from "../../services";
import { Button } from "../../common/Button/Button";
import styles from "./styles.module.css";

export const Registration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
    setFormData((current) => ({
      ...current,
      [target.name]: target.value,
    }));
  };

  const validateInputs = () => {
    const issues = {};
    if (!formData.name.trim()) issues.name = "Name is required";
    if (!formData.email.trim()) issues.email = "Email is required";
    if (!formData.password.trim()) issues.password = "Password is required";
    return issues;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const foundErrors = validateInputs();
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length) return;

    try {
      await createUser(formData);
      navigate("/login");
    } catch (error) {
      alert(error.message || "Something went wrong");
    }
  };

  return (
    <section className={styles.container}>
      <h1>Registration</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} data-testid="registrationForm">
          <label>
            Name
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              data-testid="nameInput"
            />
          </label>
          {errors.name && (
            <span className={styles.error} data-testid="nameError">
              {errors.name}
            </span>
          )}

          <label>
            Email
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              data-testid="emailInput"
            />
          </label>
          {errors.email && (
            <span className={styles.error} data-testid="emailError">
              {errors.email}
            </span>
          )}

          <label>
            Password
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              data-testid="passwordInput"
            />
          </label>
          {errors.password && (
            <span className={styles.error} data-testid="passwordError">
              {errors.password}
            </span>
          )}

          <Button
            buttonText="Register"
            type="submit"
            data-testid="registrationButton"
          />
        </form>

        <p>
          Already have an account?{" "}
          <Link to="/login" data-testid="loginLink">
            Login
          </Link>
        </p>
      </div>
    </section>
  );
};
