import React from "react";
import { Drawer } from "@mui/material";

const DoctorDetailsDrawer = ({ open, onClose, doctor }) => {
  
  // Check if the doctor is online
  const isOnline = doctor?.status === "Online";

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <div
        className="doctor-drawer"
        style={{ width: "563px", backgroundColor: "white" }}
      >
        {/* Header with doctor name and close button */}
        <div className="d-flex align-items-center mb-3">
          <img
            src="/assets/images/back-arrow.svg"
            alt="back-arrow"
            className="img-fluid me-3"
            onClick={onClose}
          />
          <h2 className="doctor-drawer-title mb-0">Doctor Management</h2>
        </div>

        {/* Conditional Content based on doctor's online status */}
        {isOnline ? (
          <div>
            {/* Doctor Banner */}
            <div className="d-flex align-items-center justify-content-between mb-3 p-3 doctor-drawer-box">
              <div className="d-flex align-items-center">
                <img
                  src={
                    doctor?.image || "https://via.placeholder.com/100"
                  }
                  alt={doctor?.firstName}
                  className="rounded-circle me-3"
                  style={{ width: "64px", height: "64px" }}
                />

                <div className="d-flex flex-column">
                  <h3 className="doctor-name">{doctor?.firstName}</h3>
                  <p className="text-white">
                    {doctor?.gender === "Male" ? (
                      <>
                        <img
                          src={`./assets/images/${doctor?.gender}`}
                          alt={doctor?.firstName}
                          style={{
                            width: "30px",
                            height: "30px",
                          }}
                          className="img-fluid me-2"
                        />
                        Male
                      </>
                    ) : (
                      <>
                        <img
                          src={`./assets/images/${doctor?.gender}`}
                          alt={doctor?.firstName}
                          style={{
                            width: "30px",
                            height: "30px",
                          }}
                          className="img-fluid me-2"
                        />
                        Female
                      </>
                    )}
                  </p>
                </div>
              </div>
              <span className="doctor-badge">Online</span>
            </div>

            {/* Online Hospital Info */}
            <div className="online-hos-box mb-3">
              <div className="d-flex align-items-center justify-content-between">
                <h4 className="online-hos-title">Working On Online</h4>
                <h3 className="online-hos-subtitle">Hospital</h3>
              </div>
              <div className="mt-2 online-hos-content">
                <div className="d-flex align-items-center mt-4">
                  <img
                    src="/assets/images/hospital-name-icon.png"
                    alt="hospital-name-icon"
                    className="img-fluid me-3"
                  />
                  <div className="d-flex flex-column">
                    <strong>Hospital Name</strong>
                    <p>{doctor?.hospitalName}</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mt-4">
                  <img
                    src="/assets/images/hospital-link-icon.png"
                    alt="hospital-link-icon"
                    className="img-fluid me-3"
                  />
                  <div className="d-flex flex-column">
                    <strong> Hospital Website Link</strong>
                    <a
                      href={doctor?.website}
                      className="online-hos-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {doctor?.website}
                    </a>
                  </div>
                </div>
                <div className="d-flex align-items-center mt-4">
                  <img
                    src="/assets/images/hospital-phone-icon.png"
                    alt="hospital-phone-icon"
                    className="img-fluid me-3"
                  />
                  <div className="d-flex flex-column">
                    <strong> Emergency Contact Number</strong>
                    <p>{doctor?.emergencyContact}</p>
                  </div>
                </div>
                <div className="d-flex align-items-center mt-4">
                  <img
                    src="/assets/images/hospital-loc-icon.png"
                    alt="hospital-loc-icon"
                    className="img-fluid me-3"
                  />
                  <div className="d-flex flex-column">
                    <strong> Hospital Address</strong>
                    <p>{doctor?.doctorAddress}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* Doctor Banner */}
            <div className="d-flex align-items-center justify-content-between mb-3 doctor-drawer-box">
              <div className="d-flex align-items-center">
                <img
                  src={
                    doctor?.image || "https://via.placeholder.com/100"
                  }
                  alt={doctor?.firstName}
                  className="rounded-circle me-3"
                  style={{ width: "64px", height: "64px" }}
                />

                <div className="d-flex flex-column">
                  <h3 className="doctor-name">{doctor?.firstName}</h3>
                  <p className="text-white">
                    {doctor?.gender === "Male" ? (
                      <>
                        <img
                          src={`./assets/images/${doctor?.gender}`}
                          alt={doctor?.firstName}
                          style={{
                            width: "30px",
                            height: "30px",
                          }}
                          className="img-fluid me-2"
                        />
                        Male
                      </>
                    ) : (
                      <>
                        <img
                          src={`./assets/images/${doctor?.gender}`}
                          alt={doctor?.firstName}
                          style={{
                            width: "30px",
                            height: "30px",
                          }}
                          className="img-fluid me-2"
                        />
                        Female
                      </>
                    )}
                  </p>
                </div>
              </div>
              <span className="doctor-badge">OnSite</span>
            </div>

            {/* Doctor Details */}
            <div className="doctor-details-box">
              <div className="row mb-3">
                <div className="col-6 mb-3">
                  <p>
                    <strong className="d-block">Doctor Qualification</strong>
                    {doctor?.qualification}
                  </p>
                </div>

                <div className="col-6 mb-3">
                  <p>
                    <strong className="d-block">Years Of Experience</strong>
                    {doctor?.experience}
                  </p>
                </div>

                <div className="col-6 mb-3">
                  <p>
                    <strong className="d-block">Specialty Type</strong>
                    {doctor?.specialistType}
                  </p>
                </div>

                <div className="col-6 mb-3">
                  <p>
                    <strong className="d-block">Working Time</strong>
                    {doctor?.workingTime}
                  </p>
                </div>

                <div className="col-6 mb-3">
                  <p>
                    <strong className="d-block">Patient Check Up Time</strong>
                    {doctor?.patientCheckUpTime}
                  </p>
                </div>

                <div className="col-6 mb-3">
                  <p>
                    <strong className="d-block">Break Time</strong>
                    {doctor?.breakTime}
                  </p>
                </div>
              </div>
              <div>
                <p>
                  <strong>Description</strong>
                </p>
                <p>{doctor?.description}</p>
              </div>

              {/* Doctor Signature */}
              <div className="mt-3">
                <p className="sign">Signature</p>
                <img
                  src={
                    doctor?.signatureImage || "https://via.placeholder.com/100x50"
                  }
                  alt="Doctor Signature"
                  className="img-fluid mt-2"
                />
              </div>

              {/* Additional Contact Details */}
              <div className="border-top pt-3">
                <div className="row">
                  <div className="col-6 mb-3">
                    <p>
                      <strong className="d-block">Age</strong> {doctor?.age}
                    </p>
                  </div>

                  <div className="col-6 mb-3">
                    <p>
                      <strong className="d-block">Email</strong> {doctor?.email}
                    </p>
                  </div>

                  <div className="col-6 mb-3">
                    <p>
                      <strong className="d-block">Phone</strong> {doctor?.phoneNumber}
                    </p>
                  </div>

                  <div className="col-6 mb-3">
                    <p>
                      <strong className="d-block">Consultation Rate</strong>
                      {doctor?.consultationRate}
                    </p>
                  </div>

                  <div className="col-6 mb-3">
                    <p>
                      <strong className="d-block">Country</strong>
                      {doctor?.country}
                    </p>
                  </div>

                  <div className="col-6 mb-3">
                    <p>
                      <strong className="d-block">State</strong> {doctor?.state}
                    </p>
                  </div>

                  <div className="col-6 mb-3">
                    <p>
                      <strong className="d-block">City</strong> {doctor?.city}
                    </p>
                  </div>

                  <div className="col-6 mb-3">
                    <p>
                      <strong className="d-block">Zip Code</strong>
                      {doctor?.zipCode}
                    </p>
                  </div>

                  <div className="col-12">
                    <p>
                      <strong>Address</strong>
                    </p>
                  </div>
                  <div className="col-12 small font-weight-bold">
                    <p>{doctor?.doctorAddress}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default DoctorDetailsDrawer;
