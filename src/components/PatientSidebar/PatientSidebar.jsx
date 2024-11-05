import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./PatientSidebar.scss";

const PatientSidebar = ({ isOpen, sidebarRef, activeLink }) => {
  const navigate = useNavigate ();

  const handleBookAppointment = () => {
    navigate("/patientAppointment")
  }
  return (
    <>
      <div
        ref={sidebarRef}
        className={`patient-sidebar d-flex flex-column ${
          isOpen ? "open" : "closed"
        }`}
      >
        <div className="logo-section">
          <img
            src="/assets/images/logo.png"
            alt="Hospital Logo"
            className="logo img-fluid"
          />
        </div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link
              to={"/personalHealthRecord"}
              className={`nav-link nav-links-1 ${
                activeLink === "/personalHealthRecord" || activeLink === "/patientDetailsEdit" || activeLink === "/personalHealthRecordPrescription" || activeLink === "/personalHealthTestReport" || activeLink === "/personalHealthMedicalHistory" || activeLink === "/personalHealthMedicalHistoryDetails" ? "active" : ""
              }`}
            >
              Personal Health Record
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={"/patientAppointment"}
              className={`nav-link nav-links-2 ${
                activeLink === "/patientAppointment" ||
                activeLink === "/invoice" ||
                activeLink === "/appointmentTimeSlot" ||
                activeLink === "/patientBookAppointment"
                  ? "active"
                  : ""
              }`}
            >
              Appointment Booking
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={"/prescriptionAccess"}
              className={`nav-link nav-links-3 ${
                activeLink === "/prescriptionAccess" ? "active" : ""
              }`}
            >
              Prescription Access
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={"/patientTeleconsultationAccess"}
              className={`nav-link nav-links-4 ${
                activeLink === "/patientTeleconsultationAccess" || activeLink === "/patientMeetingConference" || activeLink === "/patientTeleconsulationAppointmentTimeSlot" ? "active" : ""
              }`}
            >
              Teleconsultation Access
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={"/patient-chat"}
              className={`nav-link nav-links-5 ${
                activeLink === "/patient-chat" ? "active" : ""
              }`}
            >
              Chat
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={"/bills"}
              className={`nav-link nav-links-7 ${
                activeLink === "/bills" || activeLink === "/billInvoice" || activeLink === "/paidBillInvoice" ? "active" : ""
              }`}
            >
              Bills
            </Link>
          </li>
        </ul>
        <div className="doctor-kit">
          <img
            src="/assets/images/doctor-kit.png"
            alt="doctorkit"
            className="img-fluid"
          />
          <h6>Hospital appointment</h6>
          <p>You have to fill up the form to be admitted to the hospital.</p>
          <button type="button" className="appontment-btn" onClick={handleBookAppointment}>
            <img
              src="/assets/images/calendar-white.svg"
              alt="calendar-white"
              className="img-fluid"
            />{" "}
            Appointment
          </button>
        </div>
        <div className="logout-section">
          <a href="#logout" className="nav-link nav-links-6">
            Logout
          </a>
        </div>
      </div>
    </>
  );
};

export default PatientSidebar;
