import React, { useEffect, useRef, useState } from "react";
import "./DoctorAppointment.scss";
import { useLocation, useNavigate } from "react-router-dom";
import DoctorSidebar from "../../../components/DoctorSidebar/DoctorSidebar";
import { Button, Dropdown, Form, Modal, Tab, Tabs } from "react-bootstrap";
import { Calendar, Clock } from "lucide-react";
import CancelDoctorAppointment from "../../../components/modals/CancelDoctorAppointment/CancelDoctorAppointment";
import DateRangeModal from "../../../components/modals/DateRangeModal/DateRangeModal";

const DoctorAppointment = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showDateRangeModal, setShowDateRangeModal] = useState(false);
  const sidebarRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

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

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const doctorAppointmentTableRidrect = () => {
    navigate("/doctorAppointmentTimeSlot");
  }

  const handleClickOutside = (event) => {
    if (
      isSidebarOpen &&
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target)
    ) {
      closeSidebar();
    }
  };

  const handleCancelAppointment = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "Marcus Philips",
      dieseName: "Viral Infection",
      patientIssue: "Stomach Ache",
      appointmentDate: "2 Jan, 2022",
      appointmentTime: "4:30 PM",
      appointmentType: "Online",
    },
    {
      id: 2,
      patientName: "Julianna Warren",
      dieseName: "Diabetes",
      patientIssue: "Stomach Ache",
      appointmentDate: "3 Jan, 2022",
      appointmentTime: "2:40 PM",
      appointmentType: "Onsite",
    },
  ]);

  const renderAppointmentTable = () => {
    if (appointments.length === 0) {
      return (
        <div className="text-center py-5">
          <img
            src="/assets/images/no-today-appointment.png"
            alt="No appointments"
            className="mb-3 img-fluid"
          />
        </div>
      );
    }

    return (
      <div className="table-responsive">
        <table className="table today-appoint-table table-hover">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Dieses Name</th>
              <th>Patient Issue</th>
              <th>Appointment Date</th>
              <th>Appointment Time</th>
              <th>Appointment Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr key={appointment.id}>
                <td>{appointment.patientName}</td>
                <td>{appointment.dieseName}</td>
                <td>{appointment.patientIssue}</td>
                <td>{appointment.appointmentDate}</td>
                <td className="appo-time">{appointment.appointmentTime}</td>
                <td className="text-center appo-badge">
                  <span
                    className={`badge badge-${
                      appointment.appointmentType === "Online"
                        ? "warning"
                        : "primary"
                    }`}
                  >
                    {appointment.appointmentType}
                  </span>
                </td>
                <td>
                  <button className="me-3" onClick={handleCancelAppointment}>
                    <img
                      src="/assets/images/calendar-red-remove.svg"
                      alt="calendar-red-remove"
                      className="img-fluid"
                    />
                  </button>
                  <button onClick={doctorAppointmentTableRidrect}>
                    <img
                      src="/assets/images/calendar-blue-tick.svg"
                      alt="calendar-blue-tick"
                      className="img-fluid"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

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
                      Appointment Booking
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
        <div className="container-fluid doctor-apointment-page py-4">
          <Tabs
            defaultActiveKey="doctorscheduledappointment"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab
              eventKey="doctorscheduledappointment"
              title="Today Appointment"
            >
              <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center mb-3">
                <h2 className="doctorAppointment-title">Today Appointment</h2>
                <div className="d-flex align-items-center flex-lg-row flex-column">
                  <div className="today-search-container me-2 mt-lg-0 mt-2">
                    <input
                      type="text"
                      placeholder="Search Patient"
                      className="form-control"
                    />
                    <img
                      src="/assets/images/search.svg"
                      alt="search"
                      className="search-icon"
                    />
                  </div>
                  <button type="button"  onClick={() => setShowDateRangeModal(true)} className="calendar-btn">
                    <Calendar size={16} /> Any Date
                  </button>
                  <button type="button" className="clock-btn mt-lg-0 mt-2">
                    <Clock size={16} /> Appointment Time Slot
                  </button>
                </div>
              </div>
              {renderAppointmentTable()}
            </Tab>
            <Tab
              eventKey="doctorupcomingappointment"
              title="Upcoming Appointment"
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="doctorAppointment-title">
                  Upcoming Appointment
                </h2>
                <div className="d-flex align-items-center">
                  <div className="today-search-container me-2">
                    <input
                      type="text"
                      placeholder="Search Patient"
                      className="form-control"
                    />
                    <img
                      src="/assets/images/search.svg"
                      alt="search"
                      className="search-icon"
                    />
                  </div>
                  <button type="button"  onClick={() => setShowDateRangeModal(true)} className="calendar-btn me-2">
                    <Calendar size={16} /> Any Date
                  </button>
                  <button type="button" className="clock-btn">
                    <Clock size={16} /> Appointment Time Slot
                  </button>
                </div>
              </div>
              {renderAppointmentTable()}
            </Tab>
            <Tab
              eventKey="doctorpreviousappointment"
              title="Previous Appointment"
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="doctorAppointment-title">
                  Previous Appointment
                </h2>
                <div className="d-flex align-items-center">
                  <div className="today-search-container me-2">
                    <input
                      type="text"
                      placeholder="Search Patient"
                      className="form-control"
                    />
                    <img
                      src="/assets/images/search.svg"
                      alt="search"
                      className="search-icon"
                    />
                  </div>
                  <button type="button" onClick={() => setShowDateRangeModal(true)} className="calendar-btn me-2">
                    <Calendar size={16} /> Any Date
                  </button>
                  <button type="button" className="clock-btn">
                    <Clock size={16} /> Appointment Time Slot
                  </button>
                </div>
              </div>
              {renderAppointmentTable()}
            </Tab>
            <Tab eventKey="doctorcancelappointment" title="Cancel Appointment">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="doctorAppointment-title">Cancel Appointment</h2>
                <div className="d-flex align-items-center">
                  <div className="today-search-container me-2">
                    <input
                      type="text"
                      placeholder="Search Patient"
                      className="form-control"
                    />
                    <img
                      src="/assets/images/search.svg"
                      alt="search"
                      className="search-icon"
                    />
                  </div>
                  <button type="button" onClick={() => setShowDateRangeModal(true)} className="calendar-btn me-2">
                    <Calendar size={16} /> Any Date
                  </button>
                  <button type="button" className="clock-btn">
                    <Clock size={16} /> Appointment Time Slot
                  </button>
                </div>
              </div>
              {renderAppointmentTable()}
            </Tab>
          </Tabs>
        </div>
      </div>
      <CancelDoctorAppointment show={showModal} handleClose={handleCloseModal} />
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

export default DoctorAppointment;
