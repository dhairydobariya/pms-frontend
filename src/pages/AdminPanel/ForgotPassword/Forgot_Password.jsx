import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { forgotPasswordValidationSchema } from "../../../validation/AuthValidation";
import AuthSlider from "../../../components/auth-slider/AuthSlider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import "./Forgot_Password.scss";

const Forgot_Password = () => {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
  };

  const otpNavigation = () => {
    navigate("/otp-verification");
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      localStorage.removeItem("forgotPassEmail");
      localStorage.removeItem("adminId");
      // Make the API request
      const response = await axios.post(
        "http://localhost:9500/v1/admin/forgot-pass",
        {
          email: values.email,
        }
      );

      // Store email and adminId in localStorage
      const { adminId } = response.data; // Assuming adminId comes from the API response
      localStorage.setItem("forgotPassEmail", values.email);
      localStorage.setItem("adminId", adminId);
      // Handle success - navigate to the OTP verification page
      otpNavigation();
    } catch (error) {
      console.error("Error during API call:", error);
      if (error.response && error.response.data) {
        setErrors({
          email: error.response.data.message || "An error occurred",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="forgot-section">
      <div className="container-fluid vh-100 d-flex">
        <div className="row w-100 align-items-center">
          <div className="col-md-6 d-flex justify-content-center">
            <div className="forgot-card p-4">
              <h2 className="mb-2 forgot-title">Forgot Password</h2>
              <h6 className="forgot-sub-title mb-4">
                Enter your email and we’ll send you an OTP to reset your
                password.
              </h6>
              <Formik
                initialValues={initialValues}
                validationSchema={forgotPasswordValidationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, isSubmitting }) => (
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
                      disabled={isSubmitting}
                      className="forgot-btn w-100"
                    >
                      {isSubmitting ? "Sending..." : "Get OTP"}
                    </button>
                    <div className="text-center">
                      <Link to={"/"} className="main-link mt-3">
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

export default Forgot_Password;
