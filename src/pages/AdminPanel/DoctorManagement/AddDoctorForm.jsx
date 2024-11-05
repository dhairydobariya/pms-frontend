import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./AddDoctorForm.scss";
import { IconButton } from "@mui/material";
import { UploadFile } from "@mui/icons-material";
import axios from "axios";

const validationSchema = Yup.object().shape({
  doctorName: Yup.string().required("Doctor Name is required"),
  qualification: Yup.string().required("Qualification is required"),
  gender: Yup.string().required("Gender is required"),
  specialty: Yup.string().required("Specialty is required"),
  checkupTime: Yup.string().required("Checkup Time is required"),
  workingTime: Yup.string().required("Working Time is required"),
  breakTime: Yup.string().required("Break Time is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  country: Yup.string().required("Country is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  onlineRate: Yup.number().required("Online Consultation Rate is required"),
  zipCode: Yup.string().required("Zip Code is required"),
  doctorAddress: Yup.string().required("Doctor Address is required"),
  description: Yup.string().required("Description is required"),
  currentHospital: Yup.string().required("Current Hospital is required"),
  hospitalName: Yup.string().required("Hospital Name is required"),
  hospitalAddress: Yup.string().required("Hospital Address is required"),
  emergencyContact: Yup.string().required(
    "Emergency Contact Number is required"
  ),
});

const AddDoctorForm = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [signature, setSignature] = useState(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Change Invoice Theme",
      description: "Lincoln Philips changed the Invoice Theme.",
      time: "5 min ago",
      icon: "theme-icon.svg",
    },
    {
      id: 2,
      title: "Dr.Bharat",
      description: "Created a bill by Dr. Bharat.",
      time: "5 min ago",
      icon: "theme-icon.svg",
    },
    {
      id: 3,
      title: "Payment Received",
      description: "24,668 is the payment done of Miracle Canter.",
      time: "1:52PM",
      icon: "payment-received-icon.svg",
    },
    {
      id: 4,
      title: "Payment Cancelled",
      description: "24,668 is the payment cancelled of Miracle Canter.",
      time: "1:52PM",
      icon: "payment-cancelled-icon.svg",
    },
  ]);

  const noNotificationImage = "/assets/images/no-notification.png";

  const clearNotifications = () => {
    setNotifications([]); // Clear the notifications array
  };

  const sidebarRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleClickOutside = (event) => {
    if (
      isSidebarOpen &&
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target)
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const handlePhotoUpload = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleSignatureUpload = (event) => {
    setSignature(event.currentTarget.files[0]);
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("doctorName", values.doctorName);
      formData.append("qualification", values.qualification);
      formData.append("gender", values.gender);
      formData.append("specialty", values.specialty);
      formData.append("checkupTime", values.checkupTime);
      formData.append("workingTime", values.workingTime);
      formData.append("breakTime", values.breakTime);
      formData.append("email", values.email);
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("country", values.country);
      formData.append("state", values.state);
      formData.append("city", values.city);
      formData.append("onlineRate", values.onlineRate);
      formData.append("zipCode", values.zipCode);
      formData.append("doctorAddress", values.doctorAddress);
      formData.append("description", values.description);
      formData.append("currentHospital", values.currentHospital);
      formData.append("hospitalName", values.hospitalName);
      formData.append("hospitalAddress", values.hospitalAddress);
      formData.append("websiteLink", values.websiteLink);
      formData.append("emergencyContact", values.emergencyContact);
      
      if (profilePhoto) {
        formData.append("profilePhoto", profilePhoto);
      }
      if (signature) {
        formData.append("signature", signature);
      }

      const response = await axios.post("http://localhost:9500/v1/admin/add-doctor-by-admin", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Doctor added successfully:", response.data);
      // Optionally reset the form or navigate after submission
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  };
  return (
    <div className="d-flex">
      <div className="w-15 w-md-0">
        <Sidebar
          isOpen={isSidebarOpen}
          sidebarRef={sidebarRef}
          activeLink={location.pathname}
        />
      </div>
      <div className="w-85 w-md-100">
        <div className="profile-header">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-md-6 col-12 mobile-screen">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">
                        <img
                          src="/assets/images/home-2.svg"
                          alt="Home"
                          className="breadcrumb-icon"
                        />
                      </a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Doctor Management
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="col-md-6 col-12 d-lg-flex d-block justify-content-lg-end">
                <div className="d-lg-flex d-none search-container me-3 mt-lg-0 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Quick Search"
                  />
                  <img
                    src="/assets/images/search.svg"
                    alt="search"
                    className="search-icon"
                  />
                  <Dropdown className="me-3">
                    <Dropdown.Toggle variant="link" id="dropdown-all">
                      All
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">All</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Doctor</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Patient</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="d-lg-none d-flex align-items-center justify-content-between">
                  <nav className="breadcrumb-container d-block d-lg-none p-0">
                    <button className="btn btn-primary" onClick={toggleSidebar}>
                      <i className="bi bi-text-left"></i>
                    </button>
                  </nav>
                  <div className="d-flex align-items-center justify-content-center">
                    <button className="btn" onClick={toggleSearch}>
                      <img
                        src="/assets/images/search.svg"
                        alt="search"
                        className="search-icon"
                      />
                    </button>
                    {isSearchVisible && (
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Quick Search"
                        style={{ display: isSearchVisible ? "block" : "none" }}
                      />
                    )}
                    <Dropdown className="notification-dropdown mx-3">
                      <Dropdown.Toggle
                        variant="link"
                        className="notification-toggle"
                      >
                        <img
                          src="/assets/images/notification-bing.svg"
                          alt="Notification Icon"
                          className="img-fluid"
                        />
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="notification-menu">
                        <div className="notification-header d-flex justify-content-between align-items-center">
                          <span>Notification</span>
                          <button className="close-btn" onClick={clearNotifications}>&times;</button>
                        </div>
                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className="notification-item d-flex align-items-start"
                            >
                              <img
                                src={`/assets/images/${notification.icon}`}
                                alt={notification.title}
                                className="notification-icon"
                              />
                              <div className="notification-content">
                                <h5>{notification.title}</h5>
                                <p>{notification.description}</p>
                              </div>
                              <span className="notification-time">
                                {notification.time}
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="no-notifications text-center">
                            <img
                              src={noNotificationImage}
                              alt="No Notifications"
                              className="no-notifications-img"
                            />
                          </div>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                      <Dropdown.Toggle variant="link" id="dropdown-user">
                        <div className="d-flex align-items-center">
                          <img
                            src="/assets/images/profile.png"
                            alt="Lincoln Philips"
                            className="profile-pic img-fluid"
                          />
                          <div className="d-none text-start">
                            <h3 className="user-name mb-0">Lincoln Philips</h3>
                            <span className="user-role">Admin</span>
                          </div>
                        </div>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
                        <Dropdown.Item href="#/settings">
                          Settings
                        </Dropdown.Item>
                        <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className="d-lg-flex d-none align-items-center">
                  <Dropdown className="notification-dropdown">
                    <Dropdown.Toggle
                      variant="link"
                      className="notification-toggle"
                    >
                      <img
                        src="/assets/images/notification-bing.svg"
                        alt="Notification Icon"
                        className="img-fluid"
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="notification-menu">
                      <div className="notification-header d-flex justify-content-between align-items-center">
                        <span>Notification</span>
                        <button className="close-btn" onClick={clearNotifications}>&times;</button>
                      </div>
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="notification-item d-flex align-items-start"
                          >
                            <img
                              src={`/assets/images/${notification.icon}`}
                              alt={notification.title}
                              className="notification-icon"
                            />
                            <div className="notification-content">
                              <h5>{notification.title}</h5>
                              <p>{notification.description}</p>
                            </div>
                            <span className="notification-time">
                              {notification.time}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="no-notifications text-center">
                          <img
                            src={noNotificationImage}
                            alt="No Notifications"
                            className="no-notifications-img"
                          />
                        </div>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle variant="link" id="dropdown-user">
                      <div className="d-flex align-items-center">
                        <img
                          src="/assets/images/profile.png"
                          alt="Lincoln Philips"
                          className="profile-pic img-fluid"
                        />
                        <div className="d-block text-start">
                          <h3 className="user-name mb-0">Lincoln Philips</h3>
                          <span className="user-role">Admin</span>
                        </div>
                      </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
                      <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
                      <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid add_doctor_form py-4">
      <h2 className="add_doctor_title mb-4">Add New Doctor</h2>
      <Formik
        initialValues={{
          doctorName: "",
          qualification: "",
          gender: "",
          specialty: "",
          checkupTime: "",
          workingTime: "",
          breakTime: "",
          email: "",
          phoneNumber: "",
          country: "",
          state: "",
          city: "",
          onlineRate: "",
          zipCode: "",
          doctorAddress: "",
          description: "",
          currentHospital: "",
          hospitalName: "",
          hospitalAddress: "",
          websiteLink: "",
          emergencyContact: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, setFieldValue }) => (
          <Form className="row g-3">
            {/* Profile Section */}
            <div className="col-md-3 text-center">
              <div className="mb-3">
                <input
                  accept="image/*"
                  type="file"
                  onChange={handlePhotoUpload}
                  id="profile-upload"
                  hidden
                />
                <label htmlFor="profile-upload">
                  <div className="cursor-pointer mb-2">
                    <img
                      src={
                        profilePhoto
                          ? URL.createObjectURL(profilePhoto)
                          : "/assets/images/placeholder.png"
                      }
                      alt="Profile"
                      className="rounded-circle img-thumbnail mb-2"
                    />
                    <div className="text-center mt-3">
                      <button className="choose-photo-btn">
                        Choose Photo
                      </button>
                    </div>
                  </div>
                </label>
              </div>
              <h4 className="upload_title">Upload Signature</h4>
              <div className="upload_box mb-3">
                <input
                  accept=".png,.jpg,.jpeg"
                  type="file"
                  onChange={handleSignatureUpload}
                  id="signature-upload"
                  hidden
                />
                <label htmlFor="signature-upload">
                  <div className="cursor-pointer text-center">
                    {signature ? signature.name : "Upload Signature"}
                    <IconButton
                      component="span"
                      className="btn btn-outline-primary"
                    >
                      <UploadFile />
                    </IconButton>
                  </div>
                </label>
              </div>
            </div>

            {/* Doctor Information Section */}
            <div className="col-md-9 row g-3">
              {/* Doctor Name Field */}
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    name="doctorName"
                    className="form-control"
                    type="text"
                    placeholder="Enter Doctor Name"
                    value={values.doctorName}
                    onChange={handleChange}
                  />
                  <label>Doctor Name</label>
                </div>
                <ErrorMessage
                  name="doctorName"
                  component="div"
                  className="text-danger small"
                />
              </div>

              {/* Qualification Field */}
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    name="qualification"
                    className="form-control"
                    type="text"
                    placeholder="Enter Doctor Qualification"
                    value={values.qualification}
                    onChange={handleChange}
                  />
                  <label>Doctor Qualification</label>
                </div>
                <ErrorMessage
                  name="qualification"
                  component="div"
                  className="text-danger small"
                />
              </div>

              {/* Gender Select */}
              <div className="col-md-4">
                <div className="form-floating form-floating-select mb-3">
                  <select
                    name="gender"
                    id="gender"
                    className="form-select"
                    value={values.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <label htmlFor="gender">Gender</label>
                </div>
                <ErrorMessage
                  name="gender"
                  component="div"
                  className="text-danger small"
                />
              </div>

              {/* Specialty Field */}
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    name="specialty"
                    className="form-control"
                    type="text"
                    placeholder="Enter Specialty Type"
                    value={values.specialty}
                    onChange={handleChange}
                  />
                  <label>Specialty Type</label>
                </div>
                <ErrorMessage
                  name="specialty"
                  component="div"
                  className="text-danger small"
                />
              </div>

              {/* Working Time */}
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    name="workingTime"
                    className="form-control"
                    type="time"
                    placeholder="Enter Working Time"
                    value={values.workingTime}
                    onChange={handleChange}
                  />
                  <label>Working Time</label>
                </div>
                <ErrorMessage
                  name="workingTime"
                  component="div"
                  className="text-danger small"
                />
              </div>

              {/* Checkup Time */}
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    name="checkupTime"
                    className="form-control"
                    type="time"
                    placeholder="Enter Checkup Time"
                    value={values.checkupTime}
                    onChange={handleChange}
                  />
                  <label>Checkup Time</label>
                </div>
                <ErrorMessage
                  name="checkupTime"
                  component="div"
                  className="text-danger small"
                />
              </div>

              {/* Break Time */}
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    name="breakTime"
                    className="form-control"
                    type="time"
                    placeholder="Enter Break Time"
                    value={values.breakTime}
                    onChange={handleChange}
                  />
                  <label>Break Time</label>
                </div>
                <ErrorMessage
                  name="breakTime"
                  component="div"
                  className="text-danger small"
                />
              </div>

              {/* Phone Number */}
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    name="phoneNumber"
                    className="form-control"
                    type="text"
                    placeholder="Enter Phone Number"
                    value={values.phoneNumber}
                    onChange={handleChange}
                  />
                  <label>Phone Number</label>
                </div>
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-danger small"
                />
              </div>

              {/* Email */}
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    name="email"
                    className="form-control"
                    type="email"
                    placeholder="Enter Doctor Email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  <label>Doctor Email</label>
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-danger small"
                />
              </div>

              {/* Country Select */}
              <div className="col-md-4">
                <div className="form-floating form-floating-select mb-3">
                  <select
                    name="country"
                    id="country"
                    className="form-select"
                    value={values.country}
                    onChange={handleChange}
                  >
                    <option value="">Select Country</option>
                    <option value="India">India</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Nepal">Nepal</option>
                    <option value="America">America</option>
                    <option value="Canada">Canada</option>
                  </select>
                  <label htmlFor="country">Country</label>
                </div>
                <ErrorMessage
                  name="country"
                  component="div"
                  className="text-danger small"
                />
              </div>

              {/* State Field */}
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    name="state"
                    className="form-control"
                    type="text"
                    placeholder="Enter State"
                    value={values.state}
                    onChange={handleChange}
                  />
                  <label>State</label>
                </div>
                <ErrorMessage
                  name="state"
                  component="div"
                  className="text-danger small"
                />
              </div>

              {/* City Field */}
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    name="city"
                    className="form-control"
                    type="text"
                    placeholder="Enter City"
                    value={values.city}
                    onChange={handleChange}
                  />
                  <label>City</label>
                </div>
                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-danger small"
                />
              </div>

              {/* Online Rate Field */}
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    name="onlineRate"
                    className="form-control"
                    type="number"
                    placeholder="Enter Online Rate"
                    value={values.onlineRate}
                    onChange={handleChange}
                  />
                  <label>Online Rate</label>
                </div>
                <ErrorMessage
                  name="onlineRate"
                  component="div"
                  className="text-danger small"
                />
              </div>

              {/* Zip Code Field */}
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    name="zipCode"
                    className="form-control"
                    type="text"
                    placeholder="Enter Zip Code"
                    value={values.zipCode}
                    onChange={handleChange}
                  />
                  <label>Zip Code</label>
                </div>
                <ErrorMessage
                  name="zipCode"
                  component="div"
                  className="text-danger small"
                />
              </div>

              {/* Doctor Address Field */}
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    name="doctorAddress"
                    className="form-control"
                    type="text"
                    placeholder="Enter Doctor Address"
                    value={values.doctorAddress}
                    onChange={handleChange}
                  />
                  <label>Doctor Address</label>
                </div>
                <ErrorMessage
                  name="doctorAddress"
                  component="div"
                  className="text-danger small"
                />
              </div>

              {/* Description Field */}
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <textarea
                    name="description"
                    className="form-control"
                    placeholder="Enter Description"
                    value={values.description}
                    onChange={handleChange}
                  />
                  <label>Description</label>
                </div>
                <ErrorMessage
                  name="description"
                  component="div"
                  className="text-danger small"
                />
              </div>

              {/* Current Hospital Field */}
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    name="currentHospital"
                    className="form-control"
                    type="text"
                    placeholder="Enter Current Hospital"
                    value={values.currentHospital}
                    onChange={handleChange}
                  />
                  <label>Current Hospital</label>
                </div>
                <ErrorMessage
                  name="currentHospital"
                  component="div"
                  className="text-danger small"
                />
              </div>

              {/* Hospital Name Field */}
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    name="hospitalName"
                    className="form-control"
                    type="text"
                    placeholder="Enter Hospital Name"
                    value={values.hospitalName}
                    onChange={handleChange}
                  />
                  <label>Hospital Name</label>
                </div>
                <ErrorMessage
                  name="hospitalName"
                  component="div"
                  className="text-danger small"
                />
              </div>

              {/* Hospital Address Field */}
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    name="hospitalAddress"
                    className="form-control"
                    type="text"
                    placeholder="Enter Hospital Address"
                    value={values.hospitalAddress}
                    onChange={handleChange}
                  />
                  <label>Hospital Address</label>
                </div>
                <ErrorMessage
                  name="hospitalAddress"
                  component="div"
                  className="text-danger small"
                />
              </div>

              {/* Emergency Contact Field */}
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    name="emergencyContact"
                    className="form-control"
                    type="text"
                    placeholder="Enter Emergency Contact"
                    value={values.emergencyContact}
                    onChange={handleChange}
                  />
                  <label>Emergency Contact</label>
                </div>
                <ErrorMessage
                  name="emergencyContact"
                  component="div"
                  className="text-danger small"
                />
              </div>

              {/* Submit Button */}
              <div className="col-12">
                <button type="submit" className="btn btn-primary">
                  Add Doctor
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>

      </div>
    </div>
  );
};

export default AddDoctorForm;
