import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import AuthSlider from "../../../components/auth-slider/AuthSlider";
import { otpValidationSchema } from "../../../validation/AuthValidation";
import { Link, useNavigate } from "react-router-dom";
import "./PatientOtpScreen.scss";

const PatientOtpScreen = () => {
  const navigate = useNavigate();
  const initialValues = {
    otp: ["", "", "", "", "", ""],
  };

  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const resetPasswordNavigation = () => {
    navigate("/patient-reset-password");
  };

  const handleSubmit = (values) => {
    console.log("OTP entered:", values.otp.join(""));
  };
  return (
    <section className="otp-section">
      <div className="container-fluid vh-100 d-flex">
        <div className="row w-100 align-items-center">
          <div className="col-md-6 d-flex justify-content-center">
            <div className="otp-card p-4">
              <h2 className="mb-2 otp-title">Enter OTP</h2>
              <h6 className="otp-sub-title mb-4">
                Please enter the 6 digit code that send to your phone number.
              </h6>
              <Formik
                initialValues={initialValues}
                validationSchema={otpValidationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, errors, touched, handleChange }) => (
                  <Form className="otp-form">
                    {/* OTP Inputs */}
                    <div className="otp-input-group d-flex mb-4">
                      {values.otp.map((_, index) => (
                        <Field
                          key={index}
                          type="text"
                          name={`otp[${index}]`}
                          maxLength="1"
                          className={`otp-input ${
                            errors.otp && touched.otp && touched.otp[index]
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={handleChange}
                        />
                      ))}
                    </div>

                    {/* Timer and Resend */}
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="mb-3 d-flex align-items-center">
                        <img
                          src="./assets/images/clock.svg"
                          alt="clock"
                          className="img-fluid me-2"
                        />
                        <h6 className="otp-time mb-0">
                          {`00:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`}{" "}
                          sec
                        </h6>
                      </div>
                      <div className="mb-3">
                        {timeLeft === 0 ? (
                          <Link
                            to={""}
                            className="main-link"
                            onClick={() => setTimeLeft(30)}
                          >
                            Resend OTP
                          </Link>
                        ) : (
                          <span className="main-link disabled">Resend OTP</span>
                        )}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      onClick={resetPasswordNavigation}
                      className="otp-btn w-100"
                    >
                      Verify
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

export default PatientOtpScreen;
