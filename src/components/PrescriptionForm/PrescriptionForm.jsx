import React from "react";
import "./PrescriptionForm.scss";

const PrescriptionForm = () => {
  return (
    <div className="container prescription-form-container mt-4">
      {/* Created Date */}
      <div className="row justify-content-between created-date-section">
        <div className="col">
          <h6>Created Date</h6>
        </div>
        <div className="col text-end">
          <h6>2 Jan, 2022</h6>
        </div>
      </div>

      <div className="perscription-innerbox">
        {/* Doctor and Hospital Information */}
        <div className="row doctor-hospital-info">
          <div className="col-md-8 col-sm-12 doctor-info">
            <h3 className="doctor-name">Professor Dr. Doctor Name Here</h3>
            <p className="doctor-subtitle">
              LAPAROSCOPIC SURGEON OBSTETRICS AND GYNAECOLOGIST
            </p>
            <p className="doctor-subtitle">
              S.C. EXECUTIVE DIRECTOR & HEAD OF THE DEPT., OBS. & GYNAE
            </p>
          </div>
          <div className="col-md-4 col-sm-12 text-right hospital-logo">
            <div className="logo-box">
              <p>Hospital Logo Here</p>
            </div>
          </div>
        </div>

        {/* Certification */}
        <div className="row mt-3">
          <div className="col-12">
            <p className="certification-number">Certification 00 00 00</p>
          </div>
        </div>

        {/* Patient Information */}
        <div className="row mt-4 patient-info">
          <div className="col-12">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Patient Name:</label>
                <p className="patient-detail">Patient Name Here</p>
              </div>
              <div className="form-group col-md-6">
                <label>Date:</label>
                <p className="patient-detail">4 Jan 2024</p>
              </div>
            </div>
            <div className="form-group">
              <label>Address:</label>
              <p className="patient-detail">Patient Name Address Here</p>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Age:</label>
                <p className="patient-detail">Patient Age Here</p>
              </div>
              <div className="form-group col-md-6">
                <label>Diagnosis:</label>
                <p className="patient-detail">Lorem ipsum dolor sit amet</p>
              </div>
            </div>
          </div>
        </div>

        {/* Prescription (RX) Symbol */}
        <div className="row mt-4 prescription-symbol">
          <div className="col-12 text-left">
            <h1 className="rx-symbol">℞</h1>
          </div>
        </div>

        {/* Signature */}
        <div className="row mt-4 signature-section">
          <div className="col-12 text-end">
            <p>_____________________________</p>
            <p>SIGNATURE</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionForm;
