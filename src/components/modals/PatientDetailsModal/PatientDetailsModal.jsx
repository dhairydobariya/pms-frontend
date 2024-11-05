import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";

const PatientDetailsModal = ({ open, handleClose, patient }) => {
  if (!patient) return null;
  return (
    <Dialog open={open} onClose={handleClose} className="patient-dialog">
      <DialogTitle className="patient-title">
        Patient Details
        <IconButton
          aria-label="close"
          onClick={handleClose}
          className="close-icon"
          style={{
            position: "absolute",
            right: 8,
            top: 26,
          }}
        >
          <img
            src="/assets/images/cross-icon.svg"
            alt="cross-icon"
            className="img-fluid"
          />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers className="patient-dialog-content">
        <Typography variant="body2" color="textSecondary" component="p">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <strong>Appointment Type</strong>
            <span className="badge bg-warning text-dark px-2 py-1 rounded">
              {patient?.appointmentType}
            </span>
          </div>
        </Typography>
        <Typography>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <strong>Appointment Date</strong> {patient?.appointmentDate}
          </div>
        </Typography>
        <Typography>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <strong>Appointment Time</strong> {patient?.appointmentTime}
          </div>
        </Typography>
        <Typography>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <strong>Patient Name</strong> {patient?.patientName}
          </div>
        </Typography>
        <Typography>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <strong>Patient Phone Number</strong> {patient?.phoneNumber}
          </div>
        </Typography>
        <Typography>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <strong>Patient Age</strong> {patient?.age}
          </div>
        </Typography>
        <Typography>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <strong>Patient Gender</strong> {patient?.gender}
          </div>
        </Typography>
        <Typography>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <strong>Patient Issue</strong> {patient?.patientIssue}
          </div>
        </Typography>
        <Typography>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <strong>Disease Name</strong> {patient?.diseaseName}
          </div>
        </Typography>
        <Typography>
          <div className="d-flex align-items-center justify-content-between mb-3">
            <strong>Doctor Name</strong> {patient?.doctorName}
          </div>
        </Typography>
        <Typography>
          <strong className="d-block">Patient Address</strong> {patient?.address}
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default PatientDetailsModal;
