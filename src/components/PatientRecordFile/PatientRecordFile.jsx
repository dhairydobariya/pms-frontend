import React, { useEffect, useRef, useState } from "react";
import "./PatientRecordFile.scss";
import { useLocation, useNavigate } from "react-router-dom";
import DoctorSidebar from "../DoctorSidebar/DoctorSidebar";
import { Dropdown, Modal } from "react-bootstrap";

const PatientRecordFile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [prescriptionPreview, setPrescriptionPreview] = useState(false);
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

  const handlePrescriptionPreview = () => {
    setPrescriptionPreview(true);
  };

  const handlePrescriptionPreviewClose = () => setPrescriptionPreview(false);
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
                    <li className="breadcrumb-item" aria-current="page">
                      Patient Record Access
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Patient Details
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
        <div className="container-fluid patient-record-file py-4">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">All Files</h5>
            </div>
            <div className="card-body">
              <h6 className="mb-3">All Uploaded Files</h6>
              <div className="row mb-3">
                {[
                  "Right Hand Xray.JPG",
                  "Right Leg Xray.JPG",
                  "Left Leg Xray.JPG",
                  "Left Hand Xray.JPG",
                ].map((file, index) => (
                  <div key={index} className="col-md-6 mb-2">
                    <div className="file-item">
                      <img
                        src="/assets/images/img-prev.svg"
                        alt="img-prev"
                        className="img-fluid me-2"
                      />
                      <span>{file}</span>
                      <small>{(3 + Math.random() * 0.1).toFixed(2)} MB</small>
                      <button className="show-btn ms-2">
                        <i className="bi bi-eye"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <h6 className="mb-3">Prescription</h6>
              <div className="prescription-card">
                <div className="prescription-content">
                  <div className="prescription-header">
                    <div className="hospital-info">
                      <img
                        src="/assets/images/logo.png"
                        alt="Hospital Logo"
                        className="hospital-logo img-fluid"
                      />
                    </div>
                    <div className="doctor-info">
                      <h3 className="m-0 doctor-name">Dr. Bharat Patel</h3>
                      <p className="doctor-specialty">
                        Obstetrics and gynecology
                      </p>
                    </div>
                  </div>
                  <div className="prescription-body">
                    <div className="row">
                      <div className="col-md-6">
                        <p>
                          <strong>Hospital Name:</strong> Medical Center
                        </p>
                        <p>
                          <strong>Patient Name:</strong> Alokova Bhajirao
                        </p>
                        <p>
                          <strong>Gender:</strong> Male
                        </p>
                        <p className="d-ruby">
                          <strong>Address:</strong> B-105 Virat Bungalows
                          Punagam Motavaracha Jamnagar.
                        </p>
                      </div>
                      <div className="col-md-6">
                        <p>
                          <strong>Prescription Date:</strong> 2 Jan, 2022
                        </p>
                        <p>
                          <strong>Age:</strong> 36 Year
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="prescription-overlay">
                  <button
                    className="prescription-overlay-btn"
                    onClick={handlePrescriptionPreview}
                  >
                    View Full Prescription
                  </button>
                </div>
              </div>
              <div className="description mt-3">
                <h6>Description</h6>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                  mattis turpis nulla, feugiat Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Proin mattis turpis nulla,
                  feugiat...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prescription Preview Modal */}
      <Modal
        className="prescription-preview-modal"
        show={prescriptionPreview}
        onHide={handlePrescriptionPreviewClose}
        centered
      >
        <Modal.Header closeButton>
            <h2 className="prescription-preview-title">Prescription</h2>
        </Modal.Header>
        <div className="prescription-preview-header">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div className="d-flex align-items-center">
              <img
                src="/assets/images/logo.png"
                alt="Hospital Logo"
                className="hospital-logo img-fluid"
              />
            </div>
            <div className="text-end">
              <h3 className="m-0 doctor-name">Dr. Bharat Patel</h3>
              <p className="doctor-specialty">Obstetrics and gynecology</p>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col-md-6">
              <p>
                <strong>Hospital Name:</strong> Medical Center
              </p>
              <p>
                <strong>Patient Name:</strong> Alabtrao Bhajirao
              </p>
              <p>
                <strong>Gender:</strong> Male
              </p>
              <p className="d-ruby">
                <strong>Address:</strong> B-105 Virat Bungalows Punagam
                Motavaracha Jamnagar.
              </p>
            </div>
            <div className="col-md-6">
              <p>
                <strong>Prescription Date:</strong>{" "}
                {new Date().toLocaleDateString()}
              </p>
              <p>
                <strong>Age:</strong> 36 Year
              </p>
            </div>
          </div>
        </div>
        <div className="table-responsive">
          <table className="table mb-4">
            <thead>
              <tr>
                <th>Medicine Name</th>
                <th>Strength</th>
                <th>Dose</th>
                <th>Duration</th>
                <th>When to take</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Calcium carbonate</td>
                <td>100 Mg</td>
                <td>1-0-1</td>
                <td className="duration">2 Day</td>
                <td className="whentotake">Before Food</td>
              </tr>
              <tr>
                <td>Cyclobenzaprine</td>
                <td>200 Mg</td>
                <td>1-1-1</td>
                <td className="duration">4 Day</td>
                <td className="whentotake">With Food</td>
              </tr>
              <tr>
                <td>Fluticasone Almeterol</td>
                <td>150 Mg</td>
                <td>0-1-0</td>
                <td className="duration">5 Day</td>
                <td className="whentotake">Before Food</td>
              </tr>
              <tr>
                <td>Hydrochlorothiazide</td>
                <td>250 Mg</td>
                <td>0-0-1</td>
                <td className="duration">2 Day</td>
                <td className="whentotake">After Food</td>
              </tr>
              <tr>
                <td>Flonase Allergy Relief</td>
                <td>100 Mg</td>
                <td>1-0-0</td>
                <td className="duration">1 Day</td>
                <td className="whentotake">Before Food</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="form-group additional-note mb-4">
          <label>
            <strong>Additional Note</strong>
          </label>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the{" "}
          </p>
        </div>
        <div className="d-flex justify-content-between align-items-end">
          <div className="doctor-signature">
            <img src="/assets/images/doctor-sign.png" alt="Doctor Signature" />
            <p>Doctor Signature</p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PatientRecordFile;
