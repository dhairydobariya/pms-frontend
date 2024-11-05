import React from "react";
import { Modal } from "react-bootstrap";
import "./CancelAppointment.scss";

const CancelAppointment = ({ show, handleClose }) => {
  return (
    <Modal
      className="cancle-appointment-modal"
      show={show}
      onHide={handleClose}
      centered
    >
      <div className="red-bg"></div>
      <Modal.Body className="text-center">
        <div className="payment-success-icon mb-3">
          <img
            src="/assets/images/cancel-appointment.png"
            alt="cancel-appointment"
            className="img-fluid"
          />
        </div>
        <h4>Cancel Online Appointment ?</h4>
        <p>Are you sure to want to cancel this Appointment? </p>
        <div className="d-flex align-items-center justify-content-between">
          <button
            type="submit"
            className="appointment-cancle-btn"
            onClick={handleClose}
          >
            No
          </button>
          <button
            type="submit"
            className="appointment-submit-btn"
            onClick={handleClose}
          >
            Yes
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CancelAppointment;
