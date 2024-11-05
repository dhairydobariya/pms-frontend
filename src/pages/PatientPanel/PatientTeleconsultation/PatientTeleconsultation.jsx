import React, { useEffect, useRef, useState } from "react";
import { Button, Dropdown, Form, Modal, Tab, Tabs } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./PatientTeleconsultation.scss";
import PatientSidebar from "../../../components/PatientSidebar/PatientSidebar";

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

const PatientTeleconsultation = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showPreviousModal, setShowPreviousModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showPendingModal, setShowPendingModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [startDate, setStartDate] = useState(new Date("2022-01-02"));
  const [endDate, setEndDate] = useState(new Date("2022-01-13"));
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleJoinClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowReminderModal(true);
  };

  const handleCloseReminderModal = () => {
    setShowReminderModal(false);
    setSelectedAppointment(null);
  };

  const handleSchShow = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
  };

  const handlePreviousShow = (appointment) => {
    setSelectedAppointment(appointment);
    setShowPreviousModal(true);
  };

  const handleClosePreviousModal = () => {
    setShowPreviousModal(false);
    setSelectedAppointment(null);
  };

  const handleCancelShow = (appointment) => {
    setSelectedAppointment(appointment);
    setShowCancelModal(true);
  };

  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
    setSelectedAppointment(null);
  };

  const handlePendingShow = (appointment) => {
    setSelectedAppointment(appointment);
    setShowPendingModal(true);
  };

  const handleClosePendingModal = () => {
    setShowPendingModal(false);
    setSelectedAppointment(null);
  };

  const handleVideoModalNavigate = () => {
    navigate("/patientMeetingConference");
  };

  const handleBookAppointment = () => {
    navigate("/patientAppointment");
  };

  const handleTelconsulationAppoinmentNav = () => {
    navigate("/patientTeleconsulationAppointmentTimeSlot");
  };

  const appointments = [
    {
      type: "Online",
      hospitalname: "Shamuba Hospital",
      doctorspeciality: "MBBS",
      name: "Dr. Ryan Vetrovs",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      type: "Online",
      hospitalname: "Shamuba Hospital",
      doctorspeciality: "MBBS",
      name: "Dr. Marcus Septimus",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      type: "Online",
      hospitalname: "Shamuba Hospital",
      doctorspeciality: "MBBS",
      name: "Dr. Alfonso Dokidis",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      type: "Online",
      hospitalname: "Shamuba Hospital",
      doctorspeciality: "MBBS",
      name: "Dr. Davis Korsgaard",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      type: "Online",
      hospitalname: "Shamuba Hospital",
      doctorspeciality: "MBBS",
      name: "Dr. Ryan Botosh",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      type: "Online",
      hospitalname: "Shamuba Hospital",
      doctorspeciality: "MBBS",
      name: "Dr. Nolan Dias",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      type: "Online",
      hospitalname: "Shamuba Hospital",
      doctorspeciality: "MBBS",
      name: "Dr. Ahmad Arcand",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      type: "Online",
      hospitalname: "Shamuba Hospital",
      doctorspeciality: "MBBS",
      name: "Dr. Wilson Arcand",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      type: "Online",
      hospitalname: "Shamuba Hospital",
      doctorspeciality: "MBBS",
      name: "Dr. Jaylon Korsgaard",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      type: "Online",
      hospitalname: "Shamuba Hospital",
      doctorspeciality: "MBBS",
      name: "Dr. Abram Stanton",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      type: "Online",
      hospitalname: "Shamuba Hospital",
      doctorspeciality: "MBBS",
      name: "Dr. James Saris",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      type: "Online",
      hospitalname: "Shamuba Hospital",
      doctorspeciality: "MBBS",
      name: "Dr. Leo Lipshutz",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
  ];

  const renderAppointmentCard = (appointment) => (
    <div className="appointment-card">
      <div className="d-flex align-items-center justify-content-between">
        <h3>{appointment.name}</h3>
        <div className="d-flex align-items-center">
          <button
            type="button"
            className="appo-btn me-2"
            onClick={handleTelconsulationAppoinmentNav}
          >
            <img
              src="/assets/images/calendar-white-2.svg"
              alt="calendar-white-2"
              className="img-fluid"
            />
          </button>
          <button
            type="button"
            className="view-btn me-2"
            onClick={() => handleSchShow(appointment)}
          >
            <img
              src="/assets/images/eye-blue-2.svg"
              alt="eye-blue-2"
              className="img-fluid"
            />
          </button>
        </div>
      </div>
      <div className="appointment-card-details">
        <div className="row">
          <div className="col-6">
            <p className="appo-card-details-title">Appointment Type</p>
            <p className="appo-card-details-title">Hospital Name</p>
            <p className="appo-card-details-title">Appointment Date</p>
            <p className="appo-card-details-title">Appointment Time</p>
            <p className="appo-card-details-title">Patient Issue</p>
          </div>
          <div className="col-6 text-end">
            <p className="appo-card-details-type">{appointment.type}</p>
            <p>{appointment.hospitalname}</p>
            <p>{appointment.date}</p>
            <p>{appointment.time}</p>
            <p>{appointment.issue}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-3">
          <button type="button" className="cancle-btn">
            <img
              src="/assets/images/calendar-remove.svg"
              alt="calendar-remove"
              className="img-fluid me-2"
            />{" "}
            Cancel
          </button>

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

  const renderPreviousAppointmentCard = (appointment) => (
    <div className="appointment-card">
      <div className="d-flex align-items-center justify-content-between">
        <h3>{appointment.name}</h3>
        <div className="d-flex align-items-center">
          <button
            type="button"
            className="view-btn me-2"
            onClick={() => handlePreviousShow(appointment)}
          >
            <img
              src="/assets/images/eye-blue-2.svg"
              alt="eye-blue-2"
              className="img-fluid"
            />
          </button>
        </div>
      </div>
      <div className="appointment-card-details">
        <div className="row">
          <div className="col-6">
            <p className="appo-card-details-title">Appointment Type</p>
            <p className="appo-card-details-title">Hospital Name</p>
            <p className="appo-card-details-title">Appointment Date</p>
            <p className="appo-card-details-title">Appointment Time</p>
            <p className="appo-card-details-title">Patient Issue</p>
          </div>
          <div className="col-6 text-end">
            <p className="appo-card-details-type">{appointment.type}</p>
            <p>{appointment.hospitalname}</p>
            <p>{appointment.date}</p>
            <p>{appointment.time}</p>
            <p>{appointment.issue}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreviousAppointmentList = () => (
    <div className="appointment-list">
      <div className="row">
        {appointments.map((appointment, index) => (
          <div className="col-lg-3 col-md-6 col-12 mb-4" key={index}>
            {renderPreviousAppointmentCard(appointment)}
          </div>
        ))}
      </div>
    </div>
  );

  const renderCancelAppointmentCard = (appointment) => (
    <div className="appointment-card">
      <div className="d-flex align-items-center justify-content-between">
        <h3>{appointment.name}</h3>
        <div className="d-flex align-items-center">
          <button
            type="button"
            className="view-btn me-2"
            onClick={() => handleCancelShow(appointment)}
          >
            <img
              src="/assets/images/eye-blue-2.svg"
              alt="eye-blue-2"
              className="img-fluid"
            />
          </button>
        </div>
      </div>
      <div className="appointment-card-details">
        <div className="row">
          <div className="col-6">
            <p className="appo-card-details-title">Appointment Type</p>
            <p className="appo-card-details-title">Hospital Name</p>
            <p className="appo-card-details-title">Appointment Date</p>
            <p className="appo-card-details-title">Appointment Time</p>
            <p className="appo-card-details-title">Patient Issue</p>
          </div>
          <div className="col-6 text-end">
            <p className="appo-card-details-type">{appointment.type}</p>
            <p>{appointment.hospitalname}</p>
            <p>{appointment.date}</p>
            <p>{appointment.time}</p>
            <p>{appointment.issue}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCancelAppointmentList = () => (
    <div className="appointment-list">
      <div className="row">
        {appointments.map((appointment, index) => (
          <div className="col-lg-3 col-md-6 col-12 mb-4" key={index}>
            {renderCancelAppointmentCard(appointment)}
          </div>
        ))}
      </div>
    </div>
  );

  const renderPendingAppointmentCard = (appointment) => (
    <div className="appointment-card">
      <div className="d-flex align-items-center justify-content-between">
        <h3>{appointment.name}</h3>
        <div className="d-flex align-items-center">
          <button
            type="button"
            className="view-btn me-2"
            onClick={() => handlePendingShow(appointment)}
          >
            <img
              src="/assets/images/eye-blue-2.svg"
              alt="eye-blue-2"
              className="img-fluid"
            />
          </button>
        </div>
      </div>
      <div className="appointment-card-details">
        <div className="row">
          <div className="col-6">
            <p className="appo-card-details-title">Appointment Type</p>
            <p className="appo-card-details-title">Hospital Name</p>
            <p className="appo-card-details-title">Appointment Date</p>
            <p className="appo-card-details-title">Appointment Time</p>
            <p className="appo-card-details-title">Patient Issue</p>
          </div>
          <div className="col-6 text-end">
            <p className="appo-card-details-type">{appointment.type}</p>
            <p>{appointment.hospitalname}</p>
            <p>{appointment.date}</p>
            <p>{appointment.time}</p>
            <p>{appointment.issue}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between mt-3">
          <button type="button" className="cancle-btn">
            <img
              src="/assets/images/calendar-remove.svg"
              alt="calendar-remove"
              className="img-fluid me-2"
            />{" "}
            Cancel
          </button>

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
        </div>
      </div>
    </div>
  );

  const renderPendingAppointmentList = () => (
    <div className="appointment-list">
      <div className="row">
        {appointments.map((appointment, index) => (
          <div className="col-lg-3 col-md-6 col-12 mb-4" key={index}>
            {renderPendingAppointmentCard(appointment)}
          </div>
        ))}
      </div>
    </div>
  );

  const ScheduledAppointmentModal = ({ show, onHide, appointment }) => (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className="scheduledAppointment-modal"
    >
      <Modal.Body>
        <h5 className="scheduledAppointment-title">Scheduled Appointment</h5>
        <div className="scheduledAppointment-content">
          <div className="row mb-2">
            <div className="col-6">
              <p className="scheduledAppointment-modal-title">
                Appointment Type
              </p>
            </div>
            <div className="col-6 text-end">
              <p className="scheduledAppointment-modal-text scheduledAppointment-modal-type">
                {appointment?.type}
              </p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <p className="scheduledAppointment-modal-title">
                Appointment Date
              </p>
            </div>
            <div className="col-6 text-end">
              <p className="scheduledAppointment-modal-text">
                {appointment?.date}
              </p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <p className="scheduledAppointment-modal-title">
                Appointment Time
              </p>
            </div>
            <div className="col-6 text-end">
              <p className="scheduledAppointment-modal-text">
                {appointment?.time}
              </p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <p className="scheduledAppointment-modal-title">Hospital Name</p>
            </div>
            <div className="col-6 text-end">
              <p className="scheduledAppointment-modal-text">
                {appointment?.hospitalname}
              </p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <p className="scheduledAppointment-modal-title">Patient Issue</p>
            </div>
            <div className="col-6 text-end">
              <p className="scheduledAppointment-modal-text">
                {appointment?.issue}
              </p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <p className="scheduledAppointment-modal-title">Doctor Name</p>
            </div>
            <div className="col-6 text-end">
              <p className="scheduledAppointment-modal-text">
                {appointment?.name}
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );

  const PreviousAppointmentModal = ({ show, onHide, appointment }) => (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className="scheduledAppointment-modal"
    >
      <Modal.Body>
        <h5 className="scheduledAppointment-title">Previous Appointment</h5>
        <div className="scheduledAppointment-content">
          <div className="row mb-2">
            <div className="col-6">
              <p className="scheduledAppointment-modal-title">
                Appointment Type
              </p>
            </div>
            <div className="col-6 text-end">
              <p className="scheduledAppointment-modal-text scheduledAppointment-modal-type">
                {appointment?.type}
              </p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <p className="scheduledAppointment-modal-title">
                Appointment Date
              </p>
            </div>
            <div className="col-6 text-end">
              <p className="scheduledAppointment-modal-text">
                {appointment?.date}
              </p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <p className="scheduledAppointment-modal-title">
                Appointment Time
              </p>
            </div>
            <div className="col-6 text-end">
              <p className="scheduledAppointment-modal-text">
                {appointment?.time}
              </p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <p className="scheduledAppointment-modal-title">Hospital Name</p>
            </div>
            <div className="col-6 text-end">
              <p className="scheduledAppointment-modal-text">
                {appointment?.hospitalname}
              </p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <p className="scheduledAppointment-modal-title">Patient Issue</p>
            </div>
            <div className="col-6 text-end">
              <p className="scheduledAppointment-modal-text">
                {appointment?.issue}
              </p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <p className="scheduledAppointment-modal-title">Doctor Name</p>
            </div>
            <div className="col-6 text-end">
              <p className="scheduledAppointment-modal-text">
                {appointment?.name}
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );

  const CancelAppointmentModal = ({ show, onHide, appointment }) => (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className="scheduledAppointment-modal"
    >
      <Modal.Body>
        <h5 className="scheduledAppointment-title">Cancel Appointment</h5>
        <div className="scheduledAppointment-content">
          <div className="row mb-2">
            <div className="col-6">
              <p className="scheduledAppointment-modal-title">
                Appointment Type
              </p>
            </div>
            <div className="col-6 text-end">
              <p className="scheduledAppointment-modal-text scheduledAppointment-modal-type">
                {appointment?.type}
              </p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <p className="scheduledAppointment-modal-title">
                Appointment Date
              </p>
            </div>
            <div className="col-6 text-end">
              <p className="scheduledAppointment-modal-text">
                {appointment?.date}
              </p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <p className="scheduledAppointment-modal-title">
                Appointment Time
              </p>
            </div>
            <div className="col-6 text-end">
              <p className="scheduledAppointment-modal-text">
                {appointment?.time}
              </p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <p className="scheduledAppointment-modal-title">Hospital Name</p>
            </div>
            <div className="col-6 text-end">
              <p className="scheduledAppointment-modal-text">
                {appointment?.hospitalname}
              </p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <p className="scheduledAppointment-modal-title">Patient Issue</p>
            </div>
            <div className="col-6 text-end">
              <p className="scheduledAppointment-modal-text">
                {appointment?.issue}
              </p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <p className="scheduledAppointment-modal-title">Doctor Name</p>
            </div>
            <div className="col-6 text-end">
              <p className="scheduledAppointment-modal-text">
                {appointment?.name}
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );

  const PendingAppointmentModal = ({ show, onHide, appointment }) => (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className="scheduledAppointment-modal"
    >
      <Modal.Body>
        <h5 className="scheduledAppointment-title">Pending Appointment</h5>
        <div className="scheduledAppointment-content">
          <div className="row mb-2">
            <div className="col-6">
              <p className="scheduledAppointment-modal-title">
                Appointment Type
              </p>
            </div>
            <div className="col-6 text-end">
              <p className="scheduledAppointment-modal-text scheduledAppointment-modal-type">
                {appointment?.type}
              </p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <p className="scheduledAppointment-modal-title">
                Appointment Date
              </p>
            </div>
            <div className="col-6 text-end">
              <p className="scheduledAppointment-modal-text">
                {appointment?.date}
              </p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <p className="scheduledAppointment-modal-title">
                Appointment Time
              </p>
            </div>
            <div className="col-6 text-end">
              <p className="scheduledAppointment-modal-text">
                {appointment?.time}
              </p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <p className="scheduledAppointment-modal-title">Hospital Name</p>
            </div>
            <div className="col-6 text-end">
              <p className="scheduledAppointment-modal-text">
                {appointment?.hospitalname}
              </p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <p className="scheduledAppointment-modal-title">Patient Issue</p>
            </div>
            <div className="col-6 text-end">
              <p className="scheduledAppointment-modal-text">
                {appointment?.issue}
              </p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <p className="scheduledAppointment-modal-title">Doctor Name</p>
            </div>
            <div className="col-6 text-end">
              <p className="scheduledAppointment-modal-text">
                {appointment?.name}
              </p>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
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
              <p className="reminder-modal-title">Doctor Name</p>
            </div>
            <div className="col-6 text-end">
              <p className="reminder-modal-text">{appointment?.name}</p>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col-6">
              <p className="reminder-modal-title">Doctor Specialty</p>
            </div>
            <div className="col-6 text-end">
              <p className="reminder-modal-text">
                {appointment?.doctorspeciality}
              </p>
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
        <div className="container-fluid patient-teleconsultation-page py-4">
          <Tabs
            defaultActiveKey="patientscheduledappointment"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab
              eventKey="patientscheduledappointment"
              title="Scheduled Appointment"
            >
              <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center my-3">
                <h2 className="patientTeleconsultation-title">
                  My Appointment
                </h2>
                <div className="d-flex flex-lg-row flex-column align-items-center">
                  <div className="patient-appointment-search-container mb-lg-0 mb-3 me-lg-3 me-0">
                    <input
                      type="text"
                      className="form-control me-2"
                      placeholder="Search Doctor"
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
                  <button
                    type="button"
                    className="book-appointment-btn ms-lg-3 ms-0 mt-lg-0 mt-3"
                    onClick={handleBookAppointment}
                  >
                    <img
                      src="/assets/images/calendar-white.svg"
                      alt="calendar-white"
                      className="img-flid me-2"
                    />
                    Book Appointment
                  </button>
                </div>
              </div>
              {renderAppointmentList()}
            </Tab>
            <Tab
              eventKey="doctorpreviousappointment"
              title="Previous Appointment"
            >
              <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center my-3">
                <h2 className="patientTeleconsultation-title">
                  My Appointment
                </h2>
                <div className="d-flex flex-lg-row flex-column align-items-center">
                  <div className="patient-appointment-search-container mb-lg-0 mb-3">
                    <input
                      type="text"
                      className="form-control me-2"
                      placeholder="Search Doctor"
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
                    className="book-appointment-btn ms-lg-3 ms-0 mt-lg-0 mt-3"
                    onClick={handleBookAppointment}
                  >
                    <img
                      src="/assets/images/calendar-white.svg"
                      alt="calendar-white"
                      className="img-flid me-2"
                    />
                    Book Appointment
                  </button>
                </div>
              </div>
              {renderPreviousAppointmentList()}
            </Tab>
            <Tab eventKey="doctorcancelappointment" title="Cancel Appointment">
              <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center my-3">
                <h2 className="patientTeleconsultation-title">
                  My Appointment
                </h2>
                <div className="d-flex flex-lg-row flex-column align-items-center">
                  <div className="patient-appointment-search-container mb-lg-0 mb-3">
                    <input
                      type="text"
                      className="form-control me-2"
                      placeholder="Search Doctor"
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
                    className="book-appointment-btn ms-lg-3 ms-0 mt-lg-0 mt-3"
                    onClick={handleBookAppointment}
                  >
                    <img
                      src="/assets/images/calendar-white.svg"
                      alt="calendar-white"
                      className="img-flid me-2"
                    />
                    Book Appointment
                  </button>
                </div>
              </div>
              {renderCancelAppointmentList()}
            </Tab>
            <Tab
              eventKey="doctorpendingappointment"
              title="Pending Appointment"
            >
              <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center my-3">
                <h2 className="patientTeleconsultation-title">
                  My Appointment
                </h2>
                <div className="d-flex flex-lg-row flex-column align-items-center">
                  <div className="patient-appointment-search-container mb-lg-0 mb-3">
                    <input
                      type="text"
                      className="form-control me-2"
                      placeholder="Search Doctor"
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
                    className="book-appointment-btn ms-lg-3 ms-0 mt-lg-0 mt-3"
                    onClick={handleBookAppointment}
                  >
                    <img
                      src="/assets/images/calendar-white.svg"
                      alt="calendar-white"
                      className="img-flid me-2"
                    />
                    Book Appointment
                  </button>
                </div>
              </div>
              {renderPendingAppointmentList()}
            </Tab>
          </Tabs>
        </div>
      </div>
      <ScheduledAppointmentModal
        show={showModal}
        onHide={handleCloseModal}
        appointment={selectedAppointment}
      />
      <PreviousAppointmentModal
        show={showPreviousModal}
        onHide={handleClosePreviousModal}
        appointment={selectedAppointment}
      />
      <CancelAppointmentModal
        show={showCancelModal}
        onHide={handleCloseCancelModal}
        appointment={selectedAppointment}
      />
      <PendingAppointmentModal
        show={showPendingModal}
        onHide={handleClosePendingModal}
        appointment={selectedAppointment}
      />
      <ReminderModal
        show={showReminderModal}
        onHide={handleCloseReminderModal}
        appointment={selectedAppointment}
      />
    </div>
  );
};

export default PatientTeleconsultation;
