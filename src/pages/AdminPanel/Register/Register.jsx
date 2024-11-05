import React, { useState, useEffect } from "react";
import AuthSlider from "../../../components/auth-slider/AuthSlider";
import "./register.scss";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { registerValidationSchema } from "../../../validation/AuthValidation";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [countries, setCountries] = useState([]); // For all countries
  const [states, setStates] = useState([]); // For states based on selected country
  const [cities, setCities] = useState([]); // For cities based on selected state
  const [hospitals, setHospitals] = useState([]); // For hospitals list

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const initialValues = {
    first_name: "", // <-- Updated from firstName to first_name
    last_name: "", // <-- Updated from lastName to last_name
    phone_number: "", // <-- Updated from phoneNumber to phone_number
    country: "",
    state: "",
    city: "",
    hospitalId: "", // <-- Updated from hospital to hospitalId
    email: "",
    password: "",
    confirmPassword: "",
    agree: true,
  };

  const handleSubmit = async (values) => {
    try {
      console.log("Form values:", values);

      const response = await axios.post(
        "http://localhost:9500/v1/admin/create-admin",
        {
          first_name: values.first_name,
          last_name: values.last_name,
          phone_number: values.phone_number,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
          country: values.country,
          state: values.state,
          city: values.city,
          hospitalId: values.hospitalId,
          agree: values.agree,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Registration successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error during registration");

      console.error("Error during registration:", error);

      // Detailed error message from response (if available)
    }
  };

  // Fetch countries and states on component mount
  useEffect(() => {
    fetchCountriesAndStates();
    fetchHospitals(); // Fetch hospitals list
  }, []);

  const fetchCountriesAndStates = async () => {
    try {
      const response = await axios.get(
        "https://countriesnow.space/api/v0.1/countries/states"
      );
      const countryList = response.data.data.map((country) => ({
        name: country.name,
        iso3: country.iso3,
        states: country.states,
      }));
      setCountries(countryList);
    } catch (error) {
      console.error("Error fetching countries and states:", error);
    }
  };

  // POST API to fetch cities based on country and state
  const fetchCities = async (countryName, stateName) => {
    try {
      const response = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        {
          country: countryName,
          state: stateName,
        }
      );
      setCities(response.data.data); // Assuming the API returns a "data" array for cities
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const fetchHospitals = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9500/v1/hospital/get-hospitals"
      );
      setHospitals(response.data.data);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  return (
    <section className="register-section">
      <div className="container-fluid vh-100 d-flex">
        <div className="row w-100 align-items-center">
          {/* Left Form Section */}
          <div className="col-md-6 d-flex justify-content-center">
            <div className="register-card p-4">
              <h2 className="mb-4 register-title">Registration</h2>

              <Formik
                initialValues={initialValues}
                validationSchema={registerValidationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    setSubmitting(true); // Indicate form is submitting
                    await handleSubmit(values); // Submit form
                  } catch (error) {
                    console.error("Form submission error:", error);
                  } finally {
                    setSubmitting(false); // Reset the submitting state
                  }
                }}
              >
                {({ errors, touched, values, setFieldValue }) => (
                  <Form>
                    {/* First Name and Last Name */}
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <div className="form-floating">
                          <Field
                            type="text"
                            name="first_name" // Updated to first_name
                            className={`form-control ${
                              errors.first_name && touched.first_name
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="First Name"
                          />
                          <label htmlFor="first_name">Enter First Name</label>
                          <ErrorMessage
                            name="first_name"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="form-floating">
                          <Field
                            type="text"
                            name="last_name" // Updated to last_name
                            className={`form-control ${
                              errors.last_name && touched.last_name
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Last Name"
                          />
                          <label htmlFor="last_name">Enter Last Name</label>
                          <ErrorMessage
                            name="last_name"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Email and Phone Number */}
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <div className="form-floating">
                          <Field
                            type="email"
                            name="email"
                            className={`form-control ${
                              errors.email && touched.email ? "is-invalid" : ""
                            }`}
                            placeholder="Email Address"
                          />
                          <label htmlFor="email">Email Address</label>
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="form-floating">
                          <Field
                            type="text"
                            name="phone_number" // Updated to phone_number
                            className={`form-control ${
                              errors.phone_number && touched.phone_number
                                ? "is-invalid"
                                : ""
                            }`}
                            placeholder="Phone Number"
                          />
                          <label htmlFor="phone_number">Phone Number</label>
                          <ErrorMessage
                            name="phone_number"
                            component="div"
                            className="invalid-feedback"
                          />
                        </div>
                      </div>
                    </div>
                    {/* Country, State, and City */}
                    <div className="row">
                      <div className="col-md-4 mb-3">
                        <Field
                          as="select"
                          name="country"
                          className={`form-select ${
                            errors.country && touched.country
                              ? "is-invalid"
                              : ""
                          }`}
                          onChange={(e) => {
                            const selectedCountry = e.target.value;
                            setFieldValue("country", selectedCountry);
                            const selectedCountryObj = countries.find(
                              (country) => country.name === selectedCountry
                            );
                            setStates(selectedCountryObj?.states || []); // Update states based on selected country
                          }}
                        >
                          <option value="">Select Country</option>
                          {countries.map((country) => (
                            <option key={country.iso3} value={country.name}>
                              {country.name}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="country"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>

                      <div className="col-md-4 mb-3">
                        <Field
                          as="select"
                          name="state"
                          className={`form-select ${
                            errors.state && touched.state ? "is-invalid" : ""
                          }`}
                          onChange={(e) => {
                            const selectedState = e.target.value;
                            setFieldValue("state", selectedState);
                            fetchCities(values.country, selectedState); // Fetch cities based on selected state
                          }}
                        >
                          <option value="">Select State</option>
                          {states.map((state) => (
                            <option key={state.state_code} value={state.name}>
                              {state.name}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="state"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>

                      <div className="col-md-4 mb-3">
                        <Field
                          as="select"
                          name="city"
                          className={`form-select ${
                            errors.city && touched.city ? "is-invalid" : ""
                          }`}
                        >
                          <option value="">Select City</option>
                          {cities.map((city, index) => (
                            <option key={index} value={city}>
                              {city}
                            </option>
                          ))}
                        </Field>
                        <ErrorMessage
                          name="city"
                          component="div"
                          className="invalid-feedback"
                        />
                      </div>
                    </div>

                    {/* Hospital Field */}
                    <div className="form-floating mb-3">
                      <Field
                        as="select"
                        name="hospitalId" // Updated to hospitalId
                        className={`form-select ${
                          errors.hospitalId && touched.hospitalId
                            ? "is-invalid"
                            : ""
                        }`}
                      >
                        <option value="">Select Hospital</option>
                        {hospitals.map((hospital) => (
                          <option key={hospital._id} value={hospital._id}>
                            {hospital.hospital_name}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="hospitalId" // Updated to hospitalId
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    {/* Password */}
                    <div className="form-floating mb-3 position-relative">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className={`form-control ${
                          errors.password && touched.password
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Password"
                      />
                      <label htmlFor="password">Password</label>
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
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    {/* Confirm Password */}
                    <div className="form-floating mb-3 position-relative">
                      <Field
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        className={`form-control ${
                          errors.confirmPassword && touched.confirmPassword
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Confirm Password"
                      />
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <button
                        type="button"
                        className="eye-btn"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? (
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
                      <ErrorMessage
                        name="confirmPassword"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    {/* Agree to Terms */}
                    <div className="form-check mb-3">
                      <Field
                        type="checkbox"
                        name="agree"
                        className={`form-check-input ${
                          errors.agree && touched.agree ? "is-invalid" : ""
                        }`}
                      />
                      <label htmlFor="agree" className="form-check-label">
                        I agree to the terms and conditions
                      </label>
                      <ErrorMessage
                        name="agree"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>

                    <button type="submit" className="register-btn w-100">
                      Register
                    </button>
                  </Form>
                )}
              </Formik>

              <div className="text-center mt-3">
                Already have an account? <Link to="/login">Login</Link>
              </div>
            </div>
          </div>

          {/* Right Auth Slider */}
          <div className="col-md-6 d-none d-md-block position-relative">
            <AuthSlider />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
