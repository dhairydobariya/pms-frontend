import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import PatientSidebar from "../../../components/PatientSidebar/PatientSidebar";
import "./PatientDetailsEdit.scss";

const PatientDetailsEdit = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const sidebarRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

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
  return (
    <div className="d-flex">
      <div className="w-15 w-md-0">
        <PatientSidebar
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
        <div className="container-fluid personal-details-edit-container py-4">
          <h1 className="page-title">Profile Setting</h1>
          <div className="row">
            <div className="col-lg-12 col-md-4 mt-4">
              <div className="admin-spacing">
                <div className="card">
                  <div className="row">
                    <div className="col-lg-3 col-md-6 col-12 border-right">
                      <div className="text-center">
                        <img
                          src="/assets/images/patient_image.png"
                          alt="Profile"
                          className="rounded-circle img-fluid mb-3 profile-img"
                        />

                        <div className="img-upload">
                          <img
                            src="./assets/images/camera.svg"
                            alt="camera"
                            className="img-fluid"
                          />
                          <label>
                            Change Profile
                            <input type="file" accept="image/*" hidden />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-9 col-md-6 col-12">
                      <div className="patient-edit-form-box">
                        <h4 className="admin-title">Edit Profile </h4>
                        <form>
                          <div className="row">
                            <div className="col-lg-4 col-md-6 mb-3">
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  name="name"
                                  className={"form-control"}
                                  id="name"
                                  placeholder="Enter FirstName"
                                  value={"Marcus Philips"}
                                />
                                <label htmlFor="name">Name</label>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-3">
                              <div className="form-floating mb-3">
                                <input
                                  type="number"
                                  name="number"
                                  className={"form-control"}
                                  id="Number"
                                  placeholder="Enter Number"
                                  value={"99130 44537"}
                                />
                                <label htmlFor="Number">Number</label>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-3">
                              <div className="form-floating mb-3">
                                <input
                                  type="email"
                                  name="email"
                                  className={"form-control"}
                                  id="Email"
                                  placeholder="Enter Email"
                                  value={"John@gmail.com"}
                                />
                                <label htmlFor="Email">Email</label>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-3">
                              <div className="form-floating mb-3">
                                <input
                                  type="text"
                                  name="gender"
                                  className={"form-control"}
                                  id="Gender"
                                  placeholder="Enter Gender"
                                  value={"Male"}
                                />
                                <label htmlFor="Gender">Gender</label>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-3">
                              <div className="form-floating mb-3">
                                <input
                                  type="date"
                                  name="dob"
                                  className={"form-control"}
                                  id="DOB"
                                  placeholder="Enter DOB"
                                  value={"2 Jan, 2022"}
                                />
                                <label htmlFor="DOB">DOB</label>
                              </div>
                            </div>
                            <div className="col-lg-4 col-6 mb-3">
                              <div className="form-floating mb-3">
                                <input
                                  type="number"
                                  name="age"
                                  className={"form-control"}
                                  id="Age"
                                  placeholder="Enter Age"
                                  value={"20"}
                                />
                                <label htmlFor="Age">Age</label>
                              </div>
                            </div>
                            <div className="col-lg-4 col-6 mb-3">
                              <div className="form-floating form-floating-select mb-3">
                                <select
                                  name="bloodgroup"
                                  id="bloodgroup"
                                  className="form-select"
                                >
                                  <option value="1">A+</option>
                                  <option value="1">B+</option>
                                  <option value="1">AB+</option>
                                  <option value="1">A-</option>
                                  <option value="1">B-</option>
                                  <option value="1">AB-</option>
                                </select>
                                <label htmlFor="bloodgroup">Blood Group</label>
                              </div>
                            </div>
                            <div className="col-lg-4 col-6 mb-3">
                              <div className="form-floating mb-3">
                                <input
                                  type="number"
                                  name="hight"
                                  className={"form-control"}
                                  id="hight"
                                  placeholder="Enter Hight"
                                  value={"160"}
                                />
                                <label htmlFor="hight">Hight (Cm)</label>
                              </div>
                            </div>
                            <div className="col-lg-4 col-6 mb-3">
                              <div className="form-floating mb-3">
                                <input
                                  type="number"
                                  name="weight"
                                  className={"form-control"}
                                  id="weight"
                                  placeholder="Enter Weight"
                                  value={"60"}
                                />
                                <label htmlFor="weight">Weight (Kg)</label>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-3">
                              <div className="form-floating form-floating-select mb-3">
                                <select
                                  name="country"
                                  id="country"
                                  className="form-select"
                                >
                                  <option value="1">India</option>
                                  <option value="1">USA</option>
                                  <option value="1">Nepal</option>
                                  <option value="1">Pakistan</option>
                                  <option value="1">Russia</option>
                                  <option value="1">Canada</option>
                                </select>
                                <label htmlFor="country">Country</label>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-3">
                              <div className="form-floating form-floating-select mb-3">
                                <select
                                  name="state"
                                  id="state"
                                  className="form-select"
                                >
                                  <option value="1">Gujarat</option>
                                  <option value="1">Maharatra</option>
                                  <option value="1">Rajasthan</option>
                                  <option value="1">Delhi</option>
                                  <option value="1">UttarPradesh</option>
                                  <option value="1">WestBengal</option>
                                </select>
                                <label htmlFor="state">State</label>
                              </div>
                            </div>
                            <div className="col-lg-4 col-md-6 mb-3">
                              <div className="form-floating form-floating-select mb-3">
                                <select
                                  name="city"
                                  id="city"
                                  className="form-select"
                                >
                                  <option value="1">Surat</option>
                                  <option value="1">Rajkot</option>
                                  <option value="1">Vadodara</option>
                                  <option value="1">Ahamadabad</option>
                                  <option value="1">Junagadh</option>
                                  <option value="1">Amaroli</option>
                                </select>
                                <label htmlFor="city">City</label>
                              </div>
                            </div>
                            <div className="col-12 mb-3">
                              <div className="form-floating form-floating-select mb-3">
                                <textarea
                                  name="address"
                                  id="address"
                                  className="form-control"
                                  value={
                                    "B-408 Swastik society, mota varacha rajkot."
                                  }
                                ></textarea>
                                <label htmlFor="address">Address</label>
                              </div>
                            </div>
                          </div>
                          <div className="d-flex justify-content-end">
                            <button type="button" className="close-btn me-3">
                              Close
                            </button>
                            <button type="button" className="edit-admin-btn">
                              Save
                            </button>
                          </div>
                        </form>
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

export default PatientDetailsEdit;
