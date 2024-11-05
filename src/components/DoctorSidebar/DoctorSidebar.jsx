import React from "react";
import "./DoctorSidebar.scss";
import { Link } from "react-router-dom";

const DoctorSidebar = ({ isOpen, sidebarRef, activeLink }) => {
  return (
    <>
      <div
        ref={sidebarRef}
        className={`doctor-sidebar d-flex flex-column ${
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
              to={"/doctorAppointmentManagement"}
              className={`nav-link nav-links-1 ${
                activeLink === "/doctorProfile" ||
                activeLink === "/doctorAppointmentManagement" ||
                activeLink === "/doctorAppointmentTimeSlot"
                  ? "active"
                  : ""
              }`}
            >
              Appointment Management
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={"/patientRecordAccess"}
              className={`nav-link nav-links-2 ${
                activeLink === "/patientRecordAccess" ||
                activeLink === "/patientDetails" ||
                activeLink === "/patientRecordFile"
                  ? "active"
                  : ""
              }`}
            >
              Patient Record Access
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link nav-links-3 collapsed ${
                activeLink.includes("/prescription-tools/") ? "active" : ""
              }`}
              to={"/prescription-tools"}
              data-bs-toggle="collapse"
              aria-expanded="false"
            >
              Prescription Tools
            </Link>
            <ul
              id="billing"
              className={`collapse ${
                activeLink.includes("/prescription-tools/") ? "show" : ""
              }`}
            >
              <li>
                <Link
                  to={"/prescription-tools/create"}
                  className={`nav-link ${
                    activeLink === "/prescription-tools/create" ||
                    activeLink === "/prescription-tools/create/details"
                      ? "active"
                      : ""
                  }`}
                >
                  Create
                </Link>
              </li>
              <li>
                <Link
                  to={"/prescription-tools/manage"}
                  className={`nav-link ${
                    activeLink === "/prescription-tools/manage" ? "active" : ""
                  }`}
                >
                  Manage
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link
              to={"/doctorTeleconsultation"}
              className={`nav-link nav-links-4 ${
                activeLink === "/doctorTeleconsultation" || activeLink === "/doctorMeetingConference" ? "active" : ""
              }`}
            >
              Teleconsultation Module
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={"/doctor-chat"}
              className={`nav-link nav-links-5 ${
                activeLink === "/doctor-chat" ? "active" : ""
              }`}
            >
              Chat
            </Link>
          </li>
        </ul>
        <div className="logout-section">
          <a href="#logout" className="nav-link nav-links-6">
            Logout
          </a>
        </div>
      </div>
    </>
  );
};

export default DoctorSidebar;
