import React, { useEffect, useRef, useState } from "react";
import "./PrescriptionToolsManage.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { Dropdown, Modal, Tab, Tabs } from "react-bootstrap";
import DoctorSidebar from "../../../components/DoctorSidebar/DoctorSidebar";
import { Calendar } from "lucide-react";
import DateRangeModal from "../../../components/modals/DateRangeModal/DateRangeModal";

const PrescriptionToolsManage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [showDateRangeModal, setShowDateRangeModal] = useState(false);
  const [activeTab, setActiveTab] = useState("todayPrescription");
  const [searchTerm, setSearchTerm] = useState("");
  const [prescriptionPreview, setPrescriptionPreview] = useState(false);

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

  const patients = [
    {
      name: "Marcus Philips",
      number: "89564 25462",
      type: "Online",
      date: "2 Jan, 2022",
      time: "4:30 PM",
      age: 22,
      gender: "male-gender.png",
    },
    {
      name: "London Shaffer",
      number: "89564 25462",
      type: "Onsite",
      date: "2 Jan, 2022",
      time: "4:30 PM",
      age: 55,
      gender: "male-gender.png",
    },
    {
      name: "Julianna Warren",
      number: "89564 25462",
      type: "Online",
      date: "2 Jan, 2022",
      time: "4:30 PM",
      age: 11,
      gender: "female-gender.png",
    },
    // Add more patient data as needed
  ];

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.number.includes(searchTerm)
  );

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
                      Prescription Tools
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Manage
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
        <div className="container-fluid prescription-manage-container py-4">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "todayPrescription" ? "active" : ""
                }`}
                onClick={() => setActiveTab("todayPrescription")}
              >
                Today Prescription
              </a>
            </li>
            <li className="nav-item">
              <a
                className={`nav-link ${
                  activeTab === "olderPrescription" ? "active" : ""
                }`}
                onClick={() => setActiveTab("olderPrescription")}
              >
                Older Prescription
              </a>
            </li>
          </ul>

          <div className="tab-content mt-4">
            <div
              className={`tab-pane ${
                activeTab === "todayPrescription" ? "active" : ""
              }`}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0 prescription-manage-title">
                  Patient Details
                </h2>
                <div className="d-flex">
                  <div className="prescription-manage-search-container">
                    <input
                      type="text"
                      className="form-control me-2"
                      placeholder="Search Patient"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <img
                      src="/assets/images/search.svg"
                      alt="search"
                      className="search-icon"
                    />
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Patient Name</th>
                      <th>Patient Number</th>
                      <th>Appointment Type</th>
                      <th>Appointment Time</th>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map((patient, index) => (
                      <tr key={index}>
                        <td>{patient.name}</td>
                        <td>{patient.number}</td>
                        <td>
                          <span
                            className={`badge ${
                              patient.type.toLowerCase() === "online"
                                ? "badge-warning"
                                : "badge-primary"
                            }`}
                          >
                            {patient.type}
                          </span>
                        </td>
                        <td>
                          <span className="badge-time">{patient.time}</span>
                        </td>
                        <td>{patient.age} Years</td>
                        <td>
                          <img
                            src={`/assets/images/${patient.gender}`}
                            alt={patient.name}
                            style={{
                              width: "30px",
                              height: "30px",
                              marginRight: "10px",
                            }}
                            className="img-fluid"
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            className="border-0 bg-transparent"
                            onClick={handlePrescriptionPreview}
                          >
                            <img
                              src="/assets/images/eye-blue-2.svg"
                              alt="eye-blue-2"
                              className="img-fluid"
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div
              className={`tab-pane ${
                activeTab === "olderPrescription" ? "active" : ""
              }`}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0 prescription-manage-title">
                  Patient Details
                </h2>
                <div className="d-flex">
                  <div className="prescription-manage-search-container">
                    <input
                      type="text"
                      className="form-control me-2"
                      placeholder="Search Patient"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <img
                      src="/assets/images/search.svg"
                      alt="search"
                      className="search-icon"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowDateRangeModal(true)}
                    className="calendar-btn me-2 mt-lg-0 mt-2"
                  >
                    <Calendar size={16} /> Any Date
                  </button>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Patient Name</th>
                      <th>Patient Number</th>
                      <th>Appointment Type</th>
                      <th>Appointment Date</th>
                      <th>Appointment Time</th>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map((patient, index) => (
                      <tr key={index}>
                        <td>{patient.name}</td>
                        <td>{patient.number}</td>
                        <td>
                          <span
                            className={`badge ${
                              patient.type.toLowerCase() === "online"
                                ? "badge-warning"
                                : "badge-primary"
                            }`}
                          >
                            {patient.type}
                          </span>
                        </td>
                        <td>{patient.date}</td>
                        <td>
                          {" "}
                          <span className="badge-time">{patient.time}</span>
                        </td>
                        <td>{patient.age} Years</td>
                        <td>
                          <img
                            src={`/assets/images/${patient.gender}`}
                            alt={patient.name}
                            style={{
                              width: "30px",
                              height: "30px",
                              marginRight: "10px",
                            }}
                            className="img-fluid"
                          />
                        </td>
                        <td>
                          <button
                            type="button"
                            className="border-0 bg-transparent"
                            onClick={handlePrescriptionPreview}
                          >
                            <img
                              src="/assets/images/eye-blue-2.svg"
                              alt="eye-blue-2"
                              className="img-fluid"
                            />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prescription Preview Modal */}
      <Modal
        className="prescriptiontools-preview-modal"
        show={prescriptionPreview}
        onHide={handlePrescriptionPreviewClose}
        centered
      >
        <Modal.Header closeButton>
            <h2 className="prescriptiontools-preview-title">Prescription</h2>
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

      <DateRangeModal
        show={showDateRangeModal}
        handleClose={() => setShowDateRangeModal(false)}
        handleApply={(startDate, endDate) => {
          console.log("Date range selected:", startDate, endDate);
          // Add your logic here to handle the selected date range
        }}
      />
    </div>
  );
};

export default PrescriptionToolsManage;
