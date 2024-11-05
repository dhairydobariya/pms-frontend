import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import "./DoctorProfile.scss";
import { useLocation } from "react-router-dom";
import DoctorSidebar from "../../../components/DoctorSidebar/DoctorSidebar";

const DoctorProfile = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    hospitalName: "",  
    gender: "",
    city: "",
    state: "",
    country: "",
  });
  const [profileImage, setProfileImage] = useState(
    "./assets/images/doctor-pic.png"
  );
  const [imagePreview, setImagePreview] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();

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

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const togglePasswordVisibility3 = () => {
    setShowPassword3(!showPassword3);
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? "" : section);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
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

  const handleEditProfile = () => {
    setIsEditable(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
      setProfileImage(file);
    }
  };

  const handleSaveProfile = () => {
    setIsEditable(false);
    if (imagePreview) {
      setProfileImage(imagePreview);
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("doctorData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
     
      setProfileData({
        firstName: parsedData.firstName || "",
        lastName: parsedData.lastName || "",  
        email: parsedData.email || "",
        phoneNumber: parsedData.phoneNumber || "",
        hospitalName: parsedData.hospitalName || "",  
        gender: parsedData.gender === "1" ? "Male" : "Female",  
        city: parsedData.city || "",
        state: parsedData.state || "",
        country: parsedData.country || "",
      });
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <div className="d-flex">
      <div className="w-15 w-md-0">
        <DoctorSidebar
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
                      Profile Setting
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
                      <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
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
        <div className="container-fluid doctor-profile-page py-4">
          <h1 className="page-title">Profile Setting</h1>
          <div className="row">
            <div className="col-lg-12 col-md-4 mt-4">
              <div className="admin-spacing">
                <div className="card">
                  <div className="row">
                    <div className="col-lg-3 col-md-6 col-12">
                      <div className="text-center">
                        <img
                          src={imagePreview || profileImage}
                          alt="Profile"
                          className="rounded-circle img-fluid mb-3 profile-img"
                        />
                        {isEditable ? (
                          <div className="form-group d-flex align-items-center img-upload">
                            <img
                              src="./assets/images/camera.svg"
                              alt="camera"
                              className="img-fluid"
                            />
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChange}
                              className="form-control"
                            />
                          </div>
                        ) : (
                          <h5 className="profile-username">
                            {profileData.firstName} {profileData.lastName}
                          </h5>
                        )}
                      </div>
                      <h5 className="menu-title">Menu</h5>
                      <ul className="list-unstyled menu">
                        <li className="mt-4">
                          <a
                            href="#profile"
                            className={
                              activeSection === "profile"
                                ? "active nav-link-1"
                                : "nav-link-1"
                            }
                            onClick={() => toggleSection("profile")}
                            aria-expanded={activeSection === "profile"}
                          >
                            Profile
                          </a>
                        </li>
                        <li>
                          <a
                            href="#change-password"
                            className={
                              activeSection === "change-password"
                                ? "active nav-link-2"
                                : "nav-link-2"
                            }
                            onClick={() => toggleSection("change-password")}
                            aria-expanded={activeSection === "change-password"}
                          >
                            Change Password
                          </a>
                        </li>
                        <li>
                          <a
                            href="#terms"
                            className={
                              activeSection === "terms"
                                ? "active nav-link-3"
                                : "nav-link-3"
                            }
                            onClick={() => toggleSection("terms")}
                            aria-expanded={activeSection === "terms"}
                          >
                            Terms & Conditions
                          </a>
                        </li>
                        <li>
                          <a
                            href="#privacy"
                            className={
                              activeSection === "privacy"
                                ? "active nav-link-4"
                                : "nav-link-4"
                            }
                            onClick={() => toggleSection("privacy")}
                            aria-expanded={activeSection === "privacy"}
                          >
                            Privacy Policy
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-9 col-md-6 col-12">
                      {/* Profile Section */}
                      <div
                        className={`collapse ${
                          activeSection === "profile" ? "show" : ""
                        }`}
                        id="profile"
                      >
                        <div className="p-lg-4 p-0">
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4 className="admin-title">Profile</h4>
                            <button
                              onClick={handleEditProfile}
                              className="edit-btn"
                            >
                              <img
                                src="./assets/images/edit.svg"
                                alt="edit"
                                className="img-fluid me-2"
                              />
                              Edit Profile
                            </button>
                          </div>
                          <form>
                            <div className="row">
                              <div className="col-lg-4 col-md-6 mb-3">
                                <div className="form-floating mb-3">
                                  <input
                                    type="text"
                                    name="firstName"
                                    className={"form-control"}
                                    id="FirstName"
                                    placeholder="First Name"
                                    value={profileData.firstName}
                                    onChange={handleInputChange}
                                    disabled={!isEditable}
                                  />
                                  <label htmlFor="FirstName">First Name</label>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-6 mb-3">
                                <div className="form-floating mb-3">
                                  <input
                                    type="text"
                                    name="lastName"
                                    className={"form-control"}
                                    id="LastName"
                                    placeholder="Last Name"
                                    value={profileData.lastName}
                                    onChange={handleInputChange}
                                    disabled={!isEditable}
                                  />
                                  <label htmlFor="LastName">Last Name</label>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-6 mb-3">
                                <div className="form-floating mb-3">
                                  <input
                                    type="text"
                                    name="phoneNumber"
                                    className={"form-control"}
                                    id="PhoneNumber"
                                    placeholder="Phone Number"
                                    value={profileData.phoneNumber}
                                    onChange={handleInputChange}
                                    disabled={!isEditable}
                                  />
                                  <label htmlFor="PhoneNumber">
                                    Phone Number
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-6 mb-3">
                                <div className="form-floating mb-3">
                                  <input
                                    type="text"
                                    name="hospitalName"
                                    className={"form-control"}
                                    id="HospitalName"
                                    placeholder="Hospital Name"
                                    value={profileData.hospitalName}
                                    onChange={handleInputChange}
                                    disabled={!isEditable}
                                  />
                                  <label htmlFor="HospitalName">
                                    Hospital Name
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-6 mb-3">
                                <div className="form-floating mb-3">
                                  <input
                                    type="text"
                                    name="gender"
                                    className={"form-control"}
                                    id="Gender"
                                    placeholder="Gender"
                                    value={profileData.gender}
                                    onChange={handleInputChange}
                                    disabled={!isEditable}
                                  />
                                  <label htmlFor="Gender">Gender</label>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-6 mb-3">
                                <div className="form-floating mb-3">
                                  <input
                                    type="email"
                                    name="emailAddress"
                                    className={"form-control"}
                                    id="EmailAddress"
                                    placeholder="Email Address"
                                    value={profileData.emailAddress}
                                    onChange={handleInputChange}
                                    disabled={!isEditable}
                                  />
                                  <label htmlFor="EmailAddress">
                                    Email Address
                                  </label>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-6 mb-3">
                                <div className="form-floating mb-3">
                                  <input
                                    type="text"
                                    name="city"
                                    className={"form-control"}
                                    id="City"
                                    placeholder="City"
                                    value={profileData.city}
                                    onChange={handleInputChange}
                                    disabled={!isEditable}
                                  />
                                  <label htmlFor="City">City</label>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-6 mb-3">
                                <div className="form-floating mb-3">
                                  <input
                                    type="text"
                                    name="state"
                                    className={"form-control"}
                                    id="State"
                                    placeholder="State"
                                    value={profileData.state}
                                    onChange={handleInputChange}
                                    disabled={!isEditable}
                                  />
                                  <label htmlFor="State">State</label>
                                </div>
                              </div>
                              <div className="col-lg-4 col-md-6 mb-3">
                                <div className="form-floating mb-3">
                                  <input
                                    type="text"
                                    name="country"
                                    className={"form-control"}
                                    id="Country"
                                    placeholder="Country"
                                    value={profileData.country}
                                    onChange={handleInputChange}
                                    disabled={!isEditable}
                                  />
                                  <label htmlFor="Country">Country</label>
                                </div>
                              </div>
                            </div>
                            {isEditable && (
                              <div className="d-flex justify-content-end">
                                <button
                                  type="button"
                                  className="close-btn me-3"
                                >
                                  Close
                                </button>
                                <button
                                  type="button"
                                  className="edit-admin-btn"
                                  onClick={handleSaveProfile}
                                >
                                  Save
                                </button>
                              </div>
                            )}
                          </form>
                        </div>
                      </div>

                      {/* Change Password Section */}
                      <div
                        className={`collapse ${
                          activeSection === "change-password" ? "show" : ""
                        }`}
                        id="change-password"
                      >
                        <div className="change-password-sec">
                          <h4 className="admin-title">Change Password</h4>
                          <p className="admin-content mb-4">
                            To change your password, please fill in the fields
                            below. Your password must contain at least 8
                            characters, it must also include at least one upper
                            case letter, one lower case letter, one number and
                            one special character.
                          </p>
                          <form>
                            <div className="form-floating mb-3 position-relative">
                              <input
                                type={showPassword ? "text" : "password"}
                                name="CurrentPassword"
                                className={"form-control"}
                                id="CurrentPassword"
                                placeholder="Enter Current Password"
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
                              <label
                                htmlFor="CurrentPassword"
                                className="floating-label"
                              >
                                Current Password
                              </label>
                            </div>
                            <div className="form-floating mb-3 position-relative">
                              <input
                                type={showPassword2 ? "text" : "password"}
                                name="newpassword"
                                className={"form-control"}
                                id="newpassword"
                                placeholder="Enter New Password"
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
                                htmlFor="newpassword"
                                className="floating-label"
                              >
                                New Password
                              </label>
                            </div>
                            <div className="form-floating mb-3 position-relative">
                              <input
                                type={showPassword3 ? "text" : "password"}
                                name="ConfirmPassword"
                                className={"form-control"}
                                id="ConfirmPassword"
                                placeholder="Enter Confirm Password"
                              />
                              <button
                                type="button"
                                className="eye-btn"
                                onClick={togglePasswordVisibility3}
                              >
                                {showPassword3 ? (
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
                            </div>
                            <button type="submit" className="submit-btn">
                              Change Password
                            </button>
                          </form>
                        </div>
                      </div>

                      {/* Terms & Conditions Section */}
                      <div
                        className={`collapse ${
                          activeSection === "terms" ? "show" : ""
                        }`}
                        id="terms"
                      >
                        <div className="p-lg-4 p-0">
                          <h4 className="admin-title">Terms & Conditions</h4>
                          <div className="card mt-4">
                            <p className="admin-content mt-0">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Fusce quis ante ornare, venenatis tortor
                              sed, fringilla ante. Morbi nec semper justo. Cras
                              eget rhoncus urna, eu fringilla nibh. Class aptent
                              taciti sociosqu ad litora torquent per conubia
                              nostra, per inceptos himenaeos. Nam pretium
                              eleifend neque, vel blandit erat iaculis id. Etiam
                              ut lectus vitae metus convallis condimentum quis
                              cursus mi. Aenean non varius enim. Pellentesque
                              sit amet interdum sapien. Fusce ac augue erat.
                              Suspendisse sodales est et laoreet fringilla. Duis
                              justo mauris, semper et justo eu, mollis porttitor
                              eros.
                            </p>
                            <p className="admin-content">
                              Dolor sit amet, consectetur adipiscing elit. Fusce
                              quis ante ornare, venenatis tortor sed, fringilla
                              ante. Morbi nec semper justo. Cras eget rhoncus
                              urna, eu fringilla nibh. Class aptent taciti
                              sociosqu ad litora torquent per conubia nostra,
                              per inceptos himenaeos. Nam pretium eleifend
                              neque, vel blandit erat iaculis id. Etiam ut
                              lectus vitae metus convallis condimentum quis
                              cursus mi. Aenean non varius enim. Pellentesque
                              sit amet interdum sapien. Fusce ac augue erat.
                              Suspendisse sodales est et laoreet fringilla. Duis
                              justo mauris, semper et justo eu, mollis porttitor
                              eros.
                            </p>
                            <p className="admin-content">
                              Consectetur adipiscing elit. Fusce quis ante
                              ornare, venenatis tortor sed, fringilla ante.
                              Morbi nec semper justo. Cras eget rhoncus urna, eu
                              fringilla nibh. Class aptent taciti sociosqu ad
                              litora torquent per conubia nostra, per inceptos
                              himenaeos. Nam pretium eleifend neque, vel blandit
                              erat iaculis id. Etiam ut lectus vitae metus
                              convallis condimentum quis cursus mi. Aenean non
                              varius enim. Pellentesque sit amet interdum
                              sapien. Fusce ac augue erat. Suspendisse sodales
                              est et laoreet fringilla. Duis justo mauris,
                              semper et justo eu, mollis porttitor eros.rat.
                              Suspendisse sodales est et laoreet fringilla. Duis
                              justo mauris, semper et justo eu, mollis porttitor
                              eros.
                            </p>
                            <p className="admin-content">
                              Consectetur adipiscing elit. Fusce quis ante
                              ornare, venenatis tortor sed, fringilla ante.
                              Morbi nec semper justo. Cras eget rhoncus urna, eu
                              fringilla nibh. Class aptent taciti sociosqu ad
                              litora torquent per conubia nostra, per inceptos
                              himenaeos. Nam pretium eleifend neque, vel blandit
                              erat iaculis id. Etiam ut lectus vitae metus
                              convallis condimentum quis cursus mi. Aenean non
                              varius enim. Pellentesque sit amet interdum
                              sapien. Fusce ac augue erat. Suspendisse sodales
                              est et laoreet fringilla. Duis justo mauris,
                              semper et justo eu, mollis porttitor eros.rat.
                              Suspendisse sodales est et laoreet fringilla. Duis
                              justo mauris, semper et justo eu, mollis porttitor
                              eros.
                            </p>
                            <p className="admin-content">
                              Consectetur adipiscing elit. Fusce quis ante
                              ornare, venenatis tortor sed, fringilla ante.
                              Morbi nec semper justo. Cras eget rhoncus urna, eu
                              fringilla nibh. Class aptent taciti sociosqu ad
                              litora torquent per conubia nostra, per inceptos
                              himenaeos. Nam pretium eleifend neque, vel blandit
                              erat iaculis id. Etiam ut lectus vitae metus
                              convallis condimentum quis cursus mi. Aenean non
                              varius enim. Pellentesque sit amet.
                            </p>
                            <p className="admin-content">
                              Consectetur adipiscing elit. Fusce quis ante
                              ornare, venenatis tortor sed, fringilla ante.
                              Morbi nec semper justo. Cras eget rhoncus urna, eu
                              fringilla nibh. Class aptent taciti sociosqu ad
                              litora torquent per conubia nostra, per inceptos
                              himenaeos. Nam pretium eleifend neque, vel blandit
                              erat iaculis id. Etiam ut lectus vitae metus
                              convallis condimentum quis cursus mi. Aenean non
                              varius enim. Pellentesque sit amet.
                            </p>
                            <p className="admin-content">
                              Consectetur adipiscing elit. Fusce quis ante
                              ornare, venenatis tortor sed, fringilla ante.
                              Morbi nec semper justo. Cras eget rhoncus urna, eu
                              fringilla nibh. Class aptent taciti sociosqu ad
                              litora torquent per conubia nostra, per inceptos
                              himenaeos. Nam pretium eleifend neque, vel.
                            </p>
                          </div>
                          {/* Your Terms & Conditions Content */}
                        </div>
                      </div>

                      {/* Privacy Policy Section */}
                      <div
                        className={`collapse ${
                          activeSection === "privacy" ? "show" : ""
                        }`}
                        id="privacy"
                      >
                        <div className="p-lg-4 p-0">
                          <h4 className="admin-title">Privacy Policy</h4>
                          <div className="card mt-4">
                            <p className="admin-content mt-0">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Fusce quis ante ornare, venenatis tortor
                              sed, fringilla ante. Morbi nec semper justo. Cras
                              eget rhoncus urna, eu fringilla nibh. Class aptent
                              taciti sociosqu ad litora torquent per conubia
                              nostra, per inceptos himenaeos. Nam pretium
                              eleifend neque, vel blandit erat iaculis id. Etiam
                              ut lectus vitae metus convallis condimentum quis
                              cursus mi. Aenean non varius enim. Pellentesque
                              sit amet interdum sapien. Fusce ac augue erat.
                              Suspendisse sodales est et laoreet fringilla. Duis
                              justo mauris, semper et justo eu, mollis porttitor
                              eros.
                            </p>
                            <p className="admin-content">
                              Dolor sit amet, consectetur adipiscing elit. Fusce
                              quis ante ornare, venenatis tortor sed, fringilla
                              ante. Morbi nec semper justo. Cras eget rhoncus
                              urna, eu fringilla nibh. Class aptent taciti
                              sociosqu ad litora torquent per conubia nostra,
                              per inceptos himenaeos. Nam pretium eleifend
                              neque, vel blandit erat iaculis id. Etiam ut
                              lectus vitae metus convallis condimentum quis
                              cursus mi. Aenean non varius enim. Pellentesque
                              sit amet interdum sapien. Fusce ac augue erat.
                              Suspendisse sodales est et laoreet fringilla. Duis
                              justo mauris, semper et justo eu, mollis porttitor
                              eros.
                            </p>
                            <p className="admin-content">
                              Consectetur adipiscing elit. Fusce quis ante
                              ornare, venenatis tortor sed, fringilla ante.
                              Morbi nec semper justo. Cras eget rhoncus urna, eu
                              fringilla nibh. Class aptent taciti sociosqu ad
                              litora torquent per conubia nostra, per inceptos
                              himenaeos. Nam pretium eleifend neque, vel blandit
                              erat iaculis id. Etiam ut lectus vitae metus
                              convallis condimentum quis cursus mi. Aenean non
                              varius enim. Pellentesque sit amet interdum
                              sapien. Fusce ac augue erat. Suspendisse sodales
                              est et laoreet fringilla. Duis justo mauris,
                              semper et justo eu, mollis porttitor eros.rat.
                              Suspendisse sodales est et laoreet fringilla. Duis
                              justo mauris, semper et justo eu, mollis porttitor
                              eros.
                            </p>
                            <p className="admin-content">
                              Consectetur adipiscing elit. Fusce quis ante
                              ornare, venenatis tortor sed, fringilla ante.
                              Morbi nec semper justo. Cras eget rhoncus urna, eu
                              fringilla nibh. Class aptent taciti sociosqu ad
                              litora torquent per conubia nostra, per inceptos
                              himenaeos. Nam pretium eleifend neque, vel blandit
                              erat iaculis id. Etiam ut lectus vitae metus
                              convallis condimentum quis cursus mi. Aenean non
                              varius enim. Pellentesque sit amet interdum
                              sapien. Fusce ac augue erat. Suspendisse sodales
                              est et laoreet fringilla. Duis justo mauris,
                              semper et justo eu, mollis porttitor eros.rat.
                              Suspendisse sodales est et laoreet fringilla. Duis
                              justo mauris, semper et justo eu, mollis porttitor
                              eros.
                            </p>
                            <p className="admin-content">
                              Consectetur adipiscing elit. Fusce quis ante
                              ornare, venenatis tortor sed, fringilla ante.
                              Morbi nec semper justo. Cras eget rhoncus urna, eu
                              fringilla nibh. Class aptent taciti sociosqu ad
                              litora torquent per conubia nostra, per inceptos
                              himenaeos. Nam pretium eleifend neque, vel blandit
                              erat iaculis id. Etiam ut lectus vitae metus
                              convallis condimentum quis cursus mi. Aenean non
                              varius enim. Pellentesque sit amet.
                            </p>
                            <p className="admin-content">
                              Consectetur adipiscing elit. Fusce quis ante
                              ornare, venenatis tortor sed, fringilla ante.
                              Morbi nec semper justo. Cras eget rhoncus urna, eu
                              fringilla nibh. Class aptent taciti sociosqu ad
                              litora torquent per conubia nostra, per inceptos
                              himenaeos. Nam pretium eleifend neque, vel blandit
                              erat iaculis id. Etiam ut lectus vitae metus
                              convallis condimentum quis cursus mi. Aenean non
                              varius enim. Pellentesque sit amet.
                            </p>
                            <p className="admin-content">
                              Consectetur adipiscing elit. Fusce quis ante
                              ornare, venenatis tortor sed, fringilla ante.
                              Morbi nec semper justo. Cras eget rhoncus urna, eu
                              fringilla nibh. Class aptent taciti sociosqu ad
                              litora torquent per conubia nostra, per inceptos
                              himenaeos. Nam pretium eleifend neque, vel.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
