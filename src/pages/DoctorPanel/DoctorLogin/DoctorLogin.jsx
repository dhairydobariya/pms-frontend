import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import AuthSlider from "../../../components/auth-slider/AuthSlider";
import { Link, useNavigate } from "react-router-dom";
import { loginValidationSchema } from "../../../validation/AuthValidation";
import "./DoctorLogin.scss";

const DoctorLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:9500/v1/doctor/doctor-login",
        {
          identifier: values.email,
          password: values.password,
        }
      );

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("refreshToken", response.data.refreshToken);

      navigate("/doctorProfile");
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong");
      console.error("Login error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="login-section">
      <div className="container-fluid vh-100 d-flex">
        <div className="row w-100 align-items-center">
          <div className="col-md-6 d-flex justify-content-center">
            <div className="login-card p-4">
              <h2 className="mb-4 login-title">Login</h2>
              {errorMessage && (
                <div className="alert alert-danger" role="alert">
                  {errorMessage}
                </div>
              )}
              <Formik
                initialValues={initialValues}
                validationSchema={loginValidationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="form-floating mb-3">
                      <Field
                        type="email"
                        name="email"
                        className={`form-control ${
                          errors.email && touched.email ? "is-invalid" : ""
                        }`}
                        id="email"
                        placeholder="Enter Email or Phone Number"
                      />
                      <label htmlFor="email">Email or Phone</label>
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-floating mb-3 position-relative">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className={`form-control ${
                          errors.password && touched.password
                            ? "is-invalid"
                            : ""
                        }`}
                        id="password"
                        placeholder="Enter Password"
                      />
                      <button
                        type="button"
                        className="eye-btn"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <img
                            src="./assets/images/eye-slash.svg"
                            alt="eye-slash"
                            className="img-fluid"
                          />
                        ) : (
                          <img
                            src="./assets/images/eye.svg"
                            alt="eye"
                            className="img-fluid"
                          />
                        )}
                      </button>
                      <label htmlFor="password" className="floating-label">
                        Password
                      </label>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="d-flex align-items-center justify-content-between">
                      <div className="mb-3 form-check">
                        <Field
                          type="checkbox"
                          name="rememberMe"
                          className="form-check-input"
                          id="rememberMe"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="rememberMe"
                        >
                          Remember me
                        </label>
                      </div>
                      <div className="mb-3 d-flex justify-content-between">
                        <Link to={"/forgot-password"} className="main-link">
                          Forgot password?
                        </Link>
                      </div>
                    </div>
                    <button type="submit" className="login-btn w-100">
                      Login
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>

          <div className="col-md-6 d-none d-md-block position-relative">
            <AuthSlider />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorLogin;
