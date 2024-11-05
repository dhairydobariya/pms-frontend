import React from "react";
import { Modal } from "react-bootstrap";
import "./PaymentSuccessModal.scss";

const PaymentSuccessModal = ({ show, handleClose }) => {
  return (
    <Modal
      className="payment-sucess-modal"
      show={show}
      onHide={handleClose}
      centered
    >
      <div className="green-bg"></div>
      <Modal.Body className="text-center">
        <div className="payment-success-icon mb-3">
          <img
            src="/assets/images/ruppess-sign.png"
            alt="Rupee Icon"
            className="img-fluid"
          />
        </div>
        <h4>Payment</h4>
        <p>Pay your bill at cash counter to confirm your bill.</p>
        <button
          type="submit"
          className="payment-sucess-btn"
          onClick={handleClose}
        >
          Okay
        </button>
      </Modal.Body>
    </Modal>
  );
};

export default PaymentSuccessModal;
