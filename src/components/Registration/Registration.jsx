import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./styles.module.css";
import { Input } from "../../common/Input/Input";
import { Button } from "../../common/Button/Button";
import { createUser } from "../../services";

export const Registration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = ({ target }) => {
    setFormData((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      await createUser(formData);
      navigate("/login");
    } catch (err) {
      alert(err.message || "Something went wrong");
    }
  };

  const renderInput = (name, labelText, placeholderText, type = "text") => (
    <>
      <Input
        labelText={labelText}
        name={name}
        value={formData[name]}
        onChange={handleChange}
        placeholderText={placeholderText}
        type={type}
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
      <h1>Registration</h1>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} data-testid="registrationForm">
          {renderInput("name", "Name", "Enter your name")}
          {renderInput("email", "Email", "Enter your email")}
          {renderInput("password", "Password", "Enter password", "password")}
          <Button
            buttonText="Register"
            type="submit"
            data-testid="registrationButton"
          />
        </form>
        <p>
          If you have an account you may{" "}
          <Link to="/login" data-testid="loginLink">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};
