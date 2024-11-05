import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { resetPasswordValidationSchema } from "../../../validation/AuthValidation";
import AuthSlider from "../../../components/auth-slider/AuthSlider";
import "./DoctorResetPassword.scss";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const DoctorResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const navigate = useNavigate();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const initialValues = {
    newPassword: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values) => {
    const adminId = localStorage.getItem("doctorId");
    const payload = {
      doctorId: adminId,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    };

    try {
      const response = await fetch(
        "http://localhost:9500/v1/doctor/reset-password",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Password reset successful");
        console.log("Password reset successful");
        // Optionally redirect or display success message here
        navigate("/doctor-login");
      } else {
        console.log("Password reset failed");
        // Handle error response here
      }
    } catch (error) {
      console.error("Error during password reset:", error);
    }
  };

  return (
    <section className="reset-pass-section">
      <div className="container-fluid vh-100 d-flex">
        <div className="row w-100 align-items-center">
          <div className="col-md-6 d-flex justify-content-center">
            <div className="reset-pass-card p-4">
              <h2 className="mb-4 reset-pass-title">Reset Password</h2>
              <Formik
                initialValues={initialValues}
                validationSchema={resetPasswordValidationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="form-floating mb-3 position-relative">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="newPassword"
                        className={`form-control ${
                          errors.newPassword && touched.newPassword
                            ? "is-invalid"
                            : ""
                        }`}
                        id="newPassword"
                        placeholder="Enter New Password"
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
                      <label htmlFor="newPassword" className="floating-label">
                        New Password
                      </label>
                      <ErrorMessage
                        name="newPassword"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-floating mb-3 position-relative">
                      <Field
                        type={showPassword2 ? "text" : "password"}
                        name="confirmPassword"
                        className={`form-control ${
                          errors.confirmPassword && touched.confirmPassword
                            ? "is-invalid"
                            : ""
                        }`}
                        id="confirmPassword"
                        placeholder="Confirm New Password"
                      />
                      <button
                        type="button"
                        className="eye-btn"
                        onClick={togglePasswordVisibility2}
                      >
                        {showPassword2 ? (
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
                      <label
                        htmlFor="confirmPassword"
                        className="floating-label"
                      >
                        Confirm Password
                      </label>
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <button type="submit" className="reset-pass-btn w-100">
                      Reset Password
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

export default DoctorResetPassword;
