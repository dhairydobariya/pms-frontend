import React, { useEffect, useRef, useState } from "react";
import "./PatientDetails.scss";
import { Badge, Dropdown, Table } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import DoctorSidebar from "../../../components/DoctorSidebar/DoctorSidebar";
import AddRecordModal from "../../../components/modals/AddRecordModal/AddRecordModal";

const PatientDetails = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [showAddRecordModal, setShowAddRecordModal] = useState(false);

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

  const patientInfo = {
    name: "Marcus Philips",
    number: "99130 44537",
    issue: "Feeling tired",
    gender: "Male",
    lastAppointmentDate: "2 Jan, 2022",
    doctorName: "Dr. Marcus Philips",
    age: "20 Years",
    appointmentType: "Online",
    address: "B-408 Swastik society, mota varachha rajkot.",
    lastAppointmentTime: "4:30 PM",
  };

  const appointments = [
    {
      name: "Marcus Philips",
      issue: "Feeling Tired",
      date: "2 Jan, 2022",
      time: "4:30 PM",
      type: "Online",
    },
    {
      name: "London Shaffer",
      issue: "Stomach Ache",
      date: "2 Jan, 2022",
      time: "5:00 PM",
      type: "Onsite",
    },
    {
      name: "Marcus Philips",
      issue: "Feeling Tired",
      date: "2 Jan, 2022",
      time: "1:30 PM",
      type: "Online",
    },
    {
      name: "London Shaffer",
      issue: "Stomach Ache",
      date: "2 Jan, 2022",
      time: "8:00 AM",
      type: "Onsite",
    },
    {
      name: "Marcus Philips",
      issue: "Feeling Tired",
      date: "2 Jan, 2022",
      time: "5:00 PM",
      type: "Onsite",
    },
    {
      name: "Marcus Philips",
      issue: "Feeling Tired",
      date: "7 Jan, 2022",
      time: "4:30 PM",
      type: "Online",
    },
    {
      name: "Marcus Philips",
      issue: "Feeling Tired",
      date: "8 Jan, 2022",
      time: "4:30 PM",
      type: "Onsite",
    },
    {
      name: "Marcus Philips",
      issue: "Feeling Tired",
      date: "8 Jan, 2022",
      time: "4:30 PM",
      type: "Online",
    },
  ];
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
        <div className="container-fluid patient-details-page py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h1 className="patient-details-title">Patient Details</h1>
            <button
              type="button"
              className="add-btn"
              onClick={() => setShowAddRecordModal(true)}
            >
              <img
                src="/assets/images/add.svg"
                alt="add"
                className="img-fluid me-3"
              />
              Add Record
            </button>
          </div>
          <div className="patient-info-card mb-4">
            <div className="row">
              <div className="col-md-2">
                <img
                  src="/assets/images/patient_image.png"
                  alt={patientInfo.name}
                  className="patient-image img-fluid rounded-circle"
                />
              </div>
              <div className="col-md-10">
                <div className="row">
                  <div className="col-md-2 col-6 mt-md-0 mt-2">
                    <p className="info-label">Patient Name</p>
                    <p className="info-value">{patientInfo.name}</p>
                  </div>
                  <div className="col-md-2 col-6 mt-md-0 mt-2">
                    <p className="info-label">Patient Number</p>
                    <p className="info-value">{patientInfo.number}</p>
                  </div>
                  <div className="col-md-2 col-6 mt-md-0 mt-2">
                    <p className="info-label">Patient Issue</p>
                    <p className="info-value">{patientInfo.issue}</p>
                  </div>
                  <div className="col-md-4 col-6 mt-md-0 mt-2">
                    <p className="info-label">Patient Gender</p>
                    <p className="info-value">{patientInfo.gender}</p>
                  </div>
                  <div className="col-md-2 col-6 mt-md-0 mt-2">
                    <p className="info-label">Last Appointment Date</p>
                    <p className="info-value">
                      {patientInfo.lastAppointmentDate}
                    </p>
                  </div>
                  <div className="col-md-2 col-6 mt-md-3 mt-2">
                    <p className="info-label">Doctor Name</p>
                    <p className="info-value">{patientInfo.doctorName}</p>
                  </div>
                  <div className="col-md-2 col-6 mt-md-3 mt-2">
                    <p className="info-label">Patient Age</p>
                    <p className="info-value">{patientInfo.age}</p>
                  </div>
                  <div className="col-md-2 col-6 mt-md-3 mt-2">
                    <p className="info-label">Appointment Type</p>
                    <p className="info-value">{patientInfo.appointmentType}</p>
                  </div>
                  <div className="col-md-4 col-6 mt-md-3 mt-2">
                    <p className="info-label">Patient Address</p>
                    <p className="info-value">{patientInfo.address}</p>
                  </div>
                  <div className="col-md-2 col-6 mt-md-3 mt-2">
                    <p className="info-label">Last Appointment Time</p>
                    <p className="info-value">
                      {patientInfo.lastAppointmentTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="appointments-title mb-3">All Appointments</h2>
          <Table responsive className="appointments-table">
            <thead>
              <tr>
                <th>Dieses Name</th>
                <th>Patient Issue</th>
                <th>Appointment Date</th>
                <th>Appointment Time</th>
                <th>Appointment Type</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appointment, index) => (
                <tr key={index}>
                  <td>{appointment.name}</td>
                  <td>{appointment.issue}</td>
                  <td>{appointment.date}</td>
                  <td className="text-blue">{appointment.time}</td>
                  <td className="appo-badge">
                    <Badge
                      bg={appointment.type === "Online" ? "warning" : "primary"}
                    >
                      {appointment.type}
                    </Badge>
                  </td>
                  <td>
                    <button className="btn btn-link p-0">
                      <img src="/assets/images/eye-blue.svg" alt="More" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <AddRecordModal
        show={showAddRecordModal}
        onHide={() => setShowAddRecordModal(false)}
      />
    </div>
  );
};

export default PatientDetails;
