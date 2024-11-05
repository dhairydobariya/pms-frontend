import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { resetPasswordValidationSchema } from "../../../validation/AuthValidation";
import AuthSlider from "../../../components/auth-slider/AuthSlider";
import "./PatientResetPassword.scss";

const PatientResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = (values) => {
    console.log("Form submitted with values: ", values);
    // Handle OTP navigation or reset logic here
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
                        name="newpassword"
                        className={`form-control ${
                          errors.password && touched.password
                            ? "is-invalid"
                            : ""
                        }`}
                        id="newpassword"
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
                      <label htmlFor="newpassword" className="floating-label">
                        New Password
                      </label>
                      <ErrorMessage
                        name="newpassword"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <div className="form-floating mb-3 position-relative">
                      <Field
                        type={showPassword2 ? "text" : "password"}
                        name="ConfirmPassword"
                        className={`form-control ${
                          errors.password && touched.password
                            ? "is-invalid"
                            : ""
                        }`}
                        id="ConfirmPassword"
                        placeholder="Enter Password"
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
                        htmlFor="ConfirmPassword"
                        className="floating-label"
                      >
                        Confirm Password
                      </label>
                      <ErrorMessage
                        name="ConfirmPassword"
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

export default PatientResetPassword;
