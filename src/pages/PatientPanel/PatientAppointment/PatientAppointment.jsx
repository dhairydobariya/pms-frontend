import React, { useEffect, useRef, useState } from "react";
import PatientSidebar from "../../../components/PatientSidebar/PatientSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { Tab, Tabs, Card, Dropdown } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./PatientAppointment.scss";
import CancelAppointment from "../../../components/modals/CancelAppointment/CancelAppointment";
import axios from 'axios';

const PatientAppointment = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);

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

  const bookAppointment = () => {
    navigate("/patientBookAppointment")
  }

  const RescheduleAppointment = () => {
    navigate("/appointmentTimeSlot")
  }

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

  const appointment = [
    {
      id: 1,
      doctor: "Dr. Nolan George",
      appointmentType: "Online",
      hospital: "Shambua Hospital",
      date: "2 Jan, 2022",
      time: "10:20 AM",
      patientIssue: "Feeling Tired",
    },
    {
      id: 2,
      doctor: "Dr. Nolan George",
      appointmentType: "Online",
      hospital: "Shambua Hospital",
      date: "2 Jan, 2022",
      time: "10:20 AM",
      patientIssue: "Feeling Tired",
    },
    {
      id: 3,
      doctor: "Dr. Nolan George",
      appointmentType: "Online",
      hospital: "Shambua Hospital",
      date: "2 Jan, 2022",
      time: "10:20 AM",
      patientIssue: "Feeling Tired",
    },
    {
      id: 4,
      doctor: "Dr. Nolan George",
      appointmentType: "Online",
      hospital: "Shambua Hospital",
      date: "2 Jan, 2022",
      time: "10:20 AM",
      patientIssue: "Feeling Tired",
    },
  ];
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
        <div className="container-fluid patient-apointment-page py-4">
          <Tabs
            defaultActiveKey="scheduledappointment"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="scheduledappointment" title="Scheduled Appointment">
              <div className="d-lg-flex d-none align-items-center justify-content-between pat-appo-box">
                <h3 className="patientappointment-title mb-0">
                  My Appointment
                </h3>
                <div className="d-flex align-items-center">
                  <div className="date-range-picker">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      dateFormat="d MMM, yyyy"
                      className="form-control"
                    />
                    <span className="mx-2">to</span>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      dateFormat="d MMM, yyyy"
                      className="form-control"
                    />
                  </div>
                  <button onClick={bookAppointment} className="bookappointment-btn">
                    <img
                      src="/assets/images/calendar-white.svg"
                      alt="calendar-white"
                      className="img-fluid"
                    />
                    <span>Book Appointment</span>
                  </button>
                </div>
              </div>
              <div className="d-lg-none pat-appo-box">
                <div className="d-flex align-items-center justify-content-between px-md-0 px-3">
                  <h3 className="patientappointment-title mb-0">
                    My Appointment
                  </h3>
                  <button onClick={bookAppointment} className="bookappointment-btn">
                    <img
                      src="/assets/images/calendar-white.svg"
                      alt="calendar-white"
                      className="img-fluid"
                    />
                    <span>Book Appointment</span>
                  </button>
                </div>
                <div className="date-range-picker mt-3 px-md-0 px-3">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="d MMM, yyyy"
                    className="form-control"
                  />
                  <span className="mx-2">to</span>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="d MMM, yyyy"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row">
                {appointment?.map((bill) => (
                  <div key={bill.id} className="col-lg-3 col-md-4 col-12 mb-4">
                    <Card className="h-100">
                      <Card.Body>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <Card.Title className="mb-0">
                            {bill.doctor}
                          </Card.Title>
                          <img
                            src="/assets/images/eye-blue.svg"
                            alt="eye-blue"
                            className="img-fluid"
                          />
                        </div>
                        <Card.Text>
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <strong>Appointment Type</strong>
                            <span className="appointmentType">
                              {bill.appointmentType}
                            </span>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <strong>Hospital Name</strong>
                            <span>{bill.hospital}</span>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <strong>Bill Created Date</strong>
                            <span>{bill.date}</span>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <strong>Bill Created Time</strong>
                            <span>{bill.time}</span>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <strong>Patient Issue</strong>
                            <span>{bill.patientIssue}</span>
                          </div>
                        </Card.Text>
                        <div className="d-flex align-items-center">
                          <button className="cancle-btn" onClick={handleCancelAppointment}>
                            <img
                              src="/assets/images/calendar-remove.svg"
                              alt="calendar-remove"
                              className="img-fluid"
                            />
                            Cancel
                          </button>
                          <button onClick={RescheduleAppointment} className="pay-btn">
                            <img
                              src="/assets/images/Reschedule.svg"
                              alt="Reschedule"
                              className="img-fluid"
                            />
                            Reschedule
                          </button>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            </Tab>
            <Tab eventKey="previousappointment" title="Previous Appointment">
              <div className="d-lg-flex d-none align-items-center justify-content-between pat-appo-box">
                <h3 className="patientappointment-title mb-0">
                  My Appointment
                </h3>
                <div className="d-flex align-items-center">
                  <div className="date-range-picker">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      dateFormat="d MMM, yyyy"
                      className="form-control"
                    />
                    <span className="mx-2">to</span>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      dateFormat="d MMM, yyyy"
                      className="form-control"
                    />
                  </div>
                  <button onClick={bookAppointment} className="bookappointment-btn">
                    <img
                      src="/assets/images/calendar-white.svg"
                      alt="calendar-white"
                      className="img-fluid"
                    />
                    <span>Book Appointment</span>
                  </button>
                </div>
              </div>
              <div className="d-lg-none pat-appo-box">
                <div className="d-flex align-items-center justify-content-between px-md-0 px-3">
                  <h3 className="patientappointment-title mb-0">
                    My Appointment
                  </h3>
                  <button onClick={bookAppointment} className="bookappointment-btn">
                    <img
                      src="/assets/images/calendar-white.svg"
                      alt="calendar-white"
                      className="img-fluid"
                    />
                    <span>Book Appointment</span>
                  </button>
                </div>
                <div className="date-range-picker mt-3 px-md-0 px-3">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="d MMM, yyyy"
                    className="form-control"
                  />
                  <span className="mx-2">to</span>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="d MMM, yyyy"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row">
                {appointment?.map((bill) => (
                  <div key={bill.id} className="col-lg-3 col-md-4 col-12 mb-4">
                    <Card className="h-100">
                      <Card.Body>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <Card.Title className="mb-0">
                            {bill.doctor}
                          </Card.Title>
                          <img
                            src="/assets/images/eye-blue.svg"
                            alt="eye-blue"
                            className="img-fluid"
                          />
                        </div>
                        <Card.Text>
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <strong>Appointment Type</strong>
                            <span className="appointmentType">
                              {bill.appointmentType}
                            </span>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <strong>Hospital Name</strong>
                            <span>{bill.hospital}</span>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <strong>Bill Created Date</strong>
                            <span>{bill.date}</span>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <strong>Bill Created Time</strong>
                            <span>{bill.time}</span>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <strong>Patient Issue</strong>
                            <span>{bill.patientIssue}</span>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            </Tab>
            <Tab eventKey="cancelappointment" title="Cancel Appointment">
              <div className="d-lg-flex d-none align-items-center justify-content-between pat-appo-box">
                <h3 className="patientappointment-title mb-0">
                  My Appointment
                </h3>
                <div className="d-flex align-items-center">
                  <div className="date-range-picker">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      dateFormat="d MMM, yyyy"
                      className="form-control"
                    />
                    <span className="mx-2">to</span>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      dateFormat="d MMM, yyyy"
                      className="form-control"
                    />
                  </div>
                  <button onClick={bookAppointment} className="bookappointment-btn">
                    <img
                      src="/assets/images/calendar-white.svg"
                      alt="calendar-white"
                      className="img-fluid"
                    />
                    <span>Book Appointment</span>
                  </button>
                </div>
              </div>
              <div className="d-lg-none pat-appo-box">
                <div className="d-flex align-items-center justify-content-between px-md-0 px-3">
                  <h3 className="patientappointment-title mb-0">
                    My Appointment
                  </h3>
                  <button onClick={bookAppointment} className="bookappointment-btn">
                    <img
                      src="/assets/images/calendar-white.svg"
                      alt="calendar-white"
                      className="img-fluid"
                    />
                    <span>Book Appointment</span>
                  </button>
                </div>
                <div className="date-range-picker mt-3 px-md-0 px-3">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="d MMM, yyyy"
                    className="form-control"
                  />
                  <span className="mx-2">to</span>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="d MMM, yyyy"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row">
                {appointment?.map((bill) => (
                  <div key={bill.id} className="col-lg-3 col-md-4 col-12 mb-4">
                    <Card className="h-100">
                      <Card.Body>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <Card.Title className="mb-0">
                            {bill.doctor}
                          </Card.Title>
                          <img
                            src="/assets/images/eye-blue.svg"
                            alt="eye-blue"
                            className="img-fluid"
                          />
                        </div>
                        <Card.Text>
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <strong>Appointment Type</strong>
                            <span className="appointmentType">
                              {bill.appointmentType}
                            </span>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <strong>Hospital Name</strong>
                            <span>{bill.hospital}</span>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <strong>Bill Created Date</strong>
                            <span>{bill.date}</span>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <strong>Bill Created Time</strong>
                            <span>{bill.time}</span>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <strong>Patient Issue</strong>
                            <span>{bill.patientIssue}</span>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            </Tab>
            <Tab eventKey="pendingappointment" title="Pending Appointment">
              <div className="d-lg-flex d-none align-items-center justify-content-between pat-appo-box">
                <h3 className="patientappointment-title mb-0">
                  My Appointment
                </h3>
                <div className="d-flex align-items-center">
                  <div className="date-range-picker">
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      dateFormat="d MMM, yyyy"
                      className="form-control"
                    />
                    <span className="mx-2">to</span>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      dateFormat="d MMM, yyyy"
                      className="form-control"
                    />
                  </div>
                  <button className="bookappointment-btn">
                    <img
                      src="/assets/images/calendar-white.svg"
                      alt="calendar-white"
                      className="img-fluid"
                    />
                    <span>Book Appointment</span>
                  </button>
                </div>
              </div>
              <div className="d-lg-none pat-appo-box">
                <div className="d-flex align-items-center justify-content-between px-md-0 px-3">
                  <h3 className="patientappointment-title mb-0">
                    My Appointment
                  </h3>
                  <button className="bookappointment-btn">
                    <img
                      src="/assets/images/calendar-white.svg"
                      alt="calendar-white"
                      className="img-fluid"
                    />
                    <span>Book Appointment</span>
                  </button>
                </div>
                <div className="date-range-picker mt-3 px-md-0 px-3">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="d MMM, yyyy"
                    className="form-control"
                  />
                  <span className="mx-2">to</span>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="d MMM, yyyy"
                    className="form-control"
                  />
                </div>
              </div>
              <div className="row">
                {appointment?.map((bill) => (
                  <div key={bill.id} className="col-lg-3 col-md-4 col-12 mb-4">
                    <Card className="h-100">
                      <Card.Body>
                        <div className="d-flex align-items-center justify-content-between mb-3">
                          <Card.Title className="mb-0">
                            {bill.doctor}
                          </Card.Title>
                          <img
                            src="/assets/images/eye-blue.svg"
                            alt="eye-blue"
                            className="img-fluid"
                          />
                        </div>
                        <Card.Text>
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <strong>Appointment Type</strong>
                            <span className="appointmentType">
                              {bill.appointmentType}
                            </span>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <strong>Hospital Name</strong>
                            <span>{bill.hospital}</span>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <strong>Bill Created Date</strong>
                            <span>{bill.date}</span>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <strong>Bill Created Time</strong>
                            <span>{bill.time}</span>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <strong>Patient Issue</strong>
                            <span>{bill.patientIssue}</span>
                          </div>
                        </Card.Text>
                        <div className="d-flex align-items-center">
                          <button className="cancle-btn" onClick={handleCancelAppointment}>
                            <img
                              src="/assets/images/calendar-remove.svg"
                              alt="calendar-remove"
                              className="img-fluid"
                            />
                            Cancel
                          </button>
                          <button onClick={RescheduleAppointment} className="pay-btn">
                            <img
                              src="/assets/images/Reschedule.svg"
                              alt="Reschedule"
                              className="img-fluid"
                            />
                            Reschedule
                          </button>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
      <CancelAppointment show={showModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default PatientAppointment;
