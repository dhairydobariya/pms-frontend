import React, { useEffect, useRef, useState } from "react";
import { Button, Dropdown, Form, Modal, Tab, Tabs } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DoctorTeleconsultation.scss";
import DoctorSidebar from "../../../components/DoctorSidebar/DoctorSidebar";

const CustomDateRangeSelector = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const resetDates = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="custom-date-selector">
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          const [start, end] = update;
          setStartDate(start);
          setEndDate(end);
        }}
        isClearable={false}
        customInput={
          <Form.Control as="button" className="date-range-button">
            {startDate && endDate
              ? `${formatDate(startDate)} - ${formatDate(endDate)}`
              : "Select Date Range"}
          </Form.Control>
        }
      />
      {startDate && endDate && (
        <Button variant="link" className="reset-dates-btn" onClick={resetDates}>
          <img src="./assets/images/cross-icon.svg" alt="Reset" />
        </Button>
      )}
    </div>
  );
};

const PatientDetailsModal = ({ show, handleClosePatientModal, patient }) => {
  return (
    <Modal show={show} onHide={handleClosePatientModal} centered className="patientDetailsModal">
      <Modal.Header closeButton>
        <Modal.Title>Patient Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-6 pb-3">
          <p>Appointment Date</p>
          </div>
          <div className="col-md-6 text-end pb-3">
          <strong>{patient.date}</strong>
          </div>
          <div className="col-md-6 pb-3">
          <p>Appointment Time</p>
          </div>
          <div className="col-md-6 text-end">
          <strong>{patient.time}</strong>
          </div>
          <div className="col-md-6 pb-3">
          <p>Patient Name</p>
          </div>
          <div className="col-md-6 text-end">
          <strong>{patient.name}</strong>
          </div>
          <div className="col-md-6 pb-3">
            <p>Patient Phone Number</p>
          </div>
          <div className="col-md-6 text-end pb-3">
            <strong>{patient.number || "92584 58475"}</strong>
          </div>
          <div className="col-md-6 pb-3">
            <p>Patient Age</p>
          </div>
          <div className="col-md-6 text-end pb-3">
            <strong>{patient.age || "27 Years"}</strong>
          </div>
          <div className="col-md-6 pb-3">
            <p>Patient Gender</p>
          </div>
          <div className="col-md-6 text-end pb-3">
            <strong>{patient.gender || "Male"}</strong>
          </div>
          <div className="col-md-6 pb-3">
            <p>Patient Issue</p>
          </div>
          <div className="col-md-6 text-end pb-3">
            <strong>{patient.patientissue}</strong>
          </div>
          <div className="col-md-6 pb-3">
            <p>Disease Name</p>
          </div>
          <div className="col-md-6 text-end pb-3">
            <strong>{patient.diesesname}</strong>
          </div>
          <div className="col-md-6 pb-3">
            <p>Doctor Name</p>
          </div>
          <div className="col-md-6 text-end pb-3">
            <strong>{patient.doctorName || "Dr. Mathew Best"}</strong>
          </div>
          <div className="col-md-12">
            <p>Patient Address</p>
            <strong>{patient.address || "B-408 Swastik society, Shivaji marg mota varacha rajkot."}</strong>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

const DoctorTeleconsultation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [startDate, setStartDate] = useState(new Date("2022-01-02"));
  const [endDate, setEndDate] = useState(new Date("2022-01-13"));
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleJoinClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
  };

  const handleVideoModalNavigate = () => {
    navigate("/doctorMeetingConference");
  };

  const handleTelAppointmentNavigation = () => {
    navigate("/doctorTeleconsulationAppointmentTimeSlot");
  };

  const appointments = [
    {
      name: "Ryan Vetrovs",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      name: "Marcus Septimus",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      name: "Alfonso Dokidis",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      name: "Davis Korsgaard",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      name: "Ryan Botosh",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      name: "Nolan Dias",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      name: "Ahmad Arcand",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      name: "Wilson Arcand",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      name: "Jaylon Korsgaard",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      name: "Abram Stanton",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      name: "James Saris",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      name: "Leo Lipshutz",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
  ];

  const patients = [
    {
      name: "Marcus Philips",
      diesesname: "Viral Infection",
      patientissue: "Feeling Tired",
      date: "2 Jan, 2022",
      time: "4:30 PM",
      number: "92584 58475",
      age: "27 Years",
      gender: "Male",
      doctorName: "Dr. Mathew Best",
      address: "B-408 Swastik society, Shivaji marg mota varacha rajkot."
    },
    {
      name: "London Shaffer",
      diesesname: "Viral Infection",
      patientissue: "Stomach Ache",
      date: "2 Jan, 2022",
      time: "4:30 PM",
      number: "92584 58475",
      age: "35 Years",
      gender: "Male",
      doctorName: "Dr. Mathew Best",
      address: "B-408 Swastik society, Shivaji marg mota varacha rajkot."
    },
    {
      name: "Julianna Warren",
      diesesname: "Stomach Ache",
      patientissue: "Feeling Tired",
      date: "2 Jan, 2022",
      time: "4:30 PM",
      number: "92584 58475",
      age: "30 Years",
      gender: "FeMale",
      doctorName: "Dr. Mathew Best",
      address: "B-408 Swastik society, Shivaji marg mota varacha rajkot."
    },
    // Add more patient data as needed
  ];

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.number.includes(searchTerm)
  );

  const renderAppointmentCard = (appointment) => (
    <div className="appointment-card">
      <h3>{appointment.name}</h3>
      <div className="appointment-card-details">
        <div className="row">
          <div className="col-6">
            <p className="appo-card-details-title">Patient Issue</p>
            <p className="appo-card-details-title">Disease Name</p>
            <p className="appo-card-details-title">Appointment Date</p>
            <p className="appo-card-details-title">Appointment Time</p>
          </div>
          <div className="col-6 text-end">
            <p>{appointment.issue}</p>
            <p>{appointment.disease}</p>
            <p>{appointment.date}</p>
            <p>{appointment.time}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-3">
          <button
            type="button"
            className="join-call-btn"
            onClick={() => handleJoinClick(appointment)}
          >
            <img
              src="/assets/images/call-calling.svg"
              alt="call-calling"
              className="img-fluid me-2"
            />{" "}
            Join Call
          </button>
          <button
            type="button"
            className="reschedule-btn"
            onClick={handleTelAppointmentNavigation}
          >
            <img
              src="/assets/images/Reschedule.svg"
              alt="Reschedule"
              className="img-fluid me-2"
            />{" "}
            Reschedule
          </button>
        </div>
      </div>
    </div>
  );

  const renderAppointmentList = () => (
    <div className="appointment-list">
      <div className="row">
        {appointments.map((appointment, index) => (
          <div className="col-lg-3 col-md-6 col-12 mb-4" key={index}>
            {renderAppointmentCard(appointment)}
          </div>
        ))}
      </div>
    </div>
  );

  const ReminderModal = ({ show, onHide, appointment }) => (
    <Modal show={show} onHide={onHide} centered className="reminder-modal">
      <Modal.Body>
        <h5 className="reminder-title">Reminder</h5>
        <div className="reminder-content">
          <div className="meet-box">
            <img
              src="/assets/images/appointment-yellow.svg"
              alt="appointment-yellow"
              className="img-fluyid me-2"
            />{" "}
            This patient wants to meet you
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <p className="reminder-modal-title">Patient Name</p>
            </div>
            <div className="col-6 text-end">
              <p className="reminder-modal-text">{appointment?.name}</p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <p className="reminder-modal-title">Patient Issue</p>
            </div>
            <div className="col-6 text-end">
              <p className="reminder-modal-text">{appointment?.issue}</p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <p className="reminder-modal-title">Disease Name</p>
            </div>
            <div className="col-6 text-end">
              <p className="reminder-modal-text">{appointment?.disease}</p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <p className="reminder-modal-title">Appointment Time</p>
            </div>
            <div className="col-6 text-end">
              <p className="reminder-modal-text">{appointment?.time}</p>
            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end mt-3">
          <button type="button" onClick={onHide} className="cancle-btn me-2">
            Cancel
          </button>
          <button
            type="button"
            onClick={handleVideoModalNavigate}
            className="join-btn"
          >
            Join
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );

  const handleShowPatientModal = (patient) => {
    setSelectedPatient(patient);
    setShowPatientModal(true);
  };

  const handleClosePatientModal = () => setShowPatientModal(false);

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
                      Teleconsultation Module
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
        <div className="container-fluid doctor-teleconsultation-page py-4">
          <Tabs
            defaultActiveKey="doctorscheduledappointment"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab
              eventKey="doctorscheduledappointment"
              title="Today Appointment"
            >
              <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center my-3">
                <h2 className="doctorteleconsultation-title">
                  Teleconsultation Module
                </h2>
                <CustomDateRangeSelector
                  startDate={startDate}
                  endDate={endDate}
                  setStartDate={setStartDate}
                  setEndDate={setEndDate}
                />
              </div>
              {renderAppointmentList()}
            </Tab>
            <Tab
              eventKey="doctorupcomingappointment"
              title="Upcoming Appointment"
            >
              <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center my-3">
                <h2 className="doctorteleconsultation-title">
                  Patient Details
                </h2>
                <div className="d-flex flex-lg-row flex-column align-items-center">
                  <div className="doctor-appointment-search-container mb-lg-0 mb-3">
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
                  <CustomDateRangeSelector
                    startDate={startDate}
                    endDate={endDate}
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                  />
                </div>
              </div>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Patient Name</th>
                      <th>Dieses Name</th>
                      <th>Patient Issue</th>
                      <th>Appointment Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map((patient, index) => (
                      <tr key={index}>
                        <td>{patient.name}</td>
                        <td>{patient.diesesname}</td>
                        <td>{patient.patientissue}</td>
                        <td>
                          <span className="badge-time">{patient.time}</span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="border-0 bg-transparent"
                          >
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
            </Tab>
            <Tab
              eventKey="doctorpreviousappointment"
              title="Previous Appointment"
            >
              <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center my-3">
                <h2 className="doctorteleconsultation-title">
                  Patient Details
                </h2>
                <div className="d-flex flex-lg-row flex-column align-items-center">
                  <div className="doctor-appointment-search-container mb-lg-0 mb-3">
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
                      <th>Dieses Name</th>
                      <th>Patient Issue</th>
                      <th>Appointment Date</th>
                      <th>Appointment Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map((patient, index) => (
                      <tr key={index}>
                        <td>{patient.name}</td>
                        <td>{patient.diesesname}</td>
                        <td>{patient.patientissue}</td>
                        <td>{patient.date}</td>
                        <td>
                          <span className="badge-time">{patient.time}</span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="border-0 bg-transparent"
                            onClick={() => handleShowPatientModal(patient)}
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
            </Tab>
            <Tab eventKey="doctorcancelappointment" title="Cancel Appointment">
              <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center my-3">
                <h2 className="doctorteleconsultation-title">
                  Patient Details
                </h2>
                <div className="d-flex flex-lg-row flex-column align-items-center">
                  <div className="doctor-appointment-search-container mb-lg-0 mb-3">
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
                      <th>Dieses Name</th>
                      <th>Patient Issue</th>
                      <th>Appointment Date</th>
                      <th>Appointment Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPatients.map((patient, index) => (
                      <tr key={index}>
                        <td>{patient.name}</td>
                        <td>{patient.diesesname}</td>
                        <td>{patient.patientissue}</td>
                        <td>{patient.date}</td>
                        <td>
                          <span className="badge-time">{patient.time}</span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="border-0 bg-transparent"
                            onClick={() => handleShowPatientModal(patient)}
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
            </Tab>
          </Tabs>
        </div>
      </div>
      {selectedPatient && (
        <PatientDetailsModal
          show={showPatientModal}
          handleClosePatientModal={handleClosePatientModal}
          patient={selectedPatient}
        />
      )}
      <ReminderModal
        show={showModal}
        onHide={handleCloseModal}
        appointment={selectedAppointment}
      />
    </div>
  );
};

export default DoctorTeleconsultation;
