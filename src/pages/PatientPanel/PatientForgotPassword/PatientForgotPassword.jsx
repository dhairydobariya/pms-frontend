import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { forgotPasswordValidationSchema } from "../../../validation/AuthValidation";
import AuthSlider from "../../../components/auth-slider/AuthSlider";
import { Link, useNavigate } from "react-router-dom";
import "./PatientForgotPassword.scss";

const PatientForgotPassword = () => {
  const navigate = useNavigate();
  const initialValues = {
    email: "",
  };

  const otpNavigation = () => {
    navigate("/patient-otp-verification");
  };

  const handleSubmit = (values) => {
    console.log("Form values:", values);
  };
  return (
    <section className="forgot-section">
      <div className="container-fluid vh-100 d-flex">
        <div className="row w-100 align-items-center">
          <div className="col-md-6 d-flex justify-content-center">
            <div className="forgot-card p-4">
              <h2 className="mb-2 forgot-title">Forgot Password</h2>
              <h6 className="forgot-sub-title mb-4">
                Enter your email and we’ll send you a otp to reset your
                password.
              </h6>
              <Formik
                initialValues={initialValues}
                validationSchema={forgotPasswordValidationSchema}
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

                    <button
                      type="submit"
                      onClick={otpNavigation}
                      className="forgot-btn w-100"
                    >
                      Get OTP
                    </button>
                    <div className="text-center">
                      <Link to={"/patient-login"} className="main-link mt-3">
                        Back to Login
                      </Link>
                    </div>
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

export default PatientForgotPassword;
