import React, { useState } from "react";
import "./CancelDoctorAppointment.scss";
import { Button, Modal } from "react-bootstrap";

const CancelDoctorAppointment = ({ show, handleClose }) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  
  const handlePayNow = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentClose = () => setShowPaymentModal(false);

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePaymentPayNow = () => {
    setShowPaymentModal(false);
  };
  return (
    <>
      <Modal
        className="cancle-doctor-appointment-modal"
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
          <p>If you cancel appointment you have to return payment.</p>
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
              onClick={handlePayNow}
            >
              Payment Return
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Payment Modal */}
      <Modal
        className="doctor-payment-modal"
        show={showPaymentModal}
        onHide={handlePaymentClose}
        centered
      >
        <Modal.Header>
          <Modal.Title>Payment Method</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="payment-options">
            <div className="form-check">
              <img
                src="/assets/images/master-card.png"
                alt="master-card"
                className="img-fluid"
              />
              <label className="form-check-label" htmlFor="masterCard">
                Master Card
              </label>
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="masterCard"
                value="MasterCard"
                onChange={handlePaymentChange}
              />
              {paymentMethod === "MasterCard" && (
                <div className="mt-3">
                  <form>
                    {/* Card Holder Name */}
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter Card Holder Name"
                      />
                      <label>Card Holder Name</label>
                    </div>

                    {/* Card Number */}
                    <div className="form-floating mb-3 position-relative">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter Card Number"
                      />
                      <label>Card Number</label>
                      <img
                        src="/assets/images/master-card.png"
                        alt="master-card"
                        className="img-fluid"
                      />
                    </div>

                    {/* Expiry Date and CVV */}
                    <div className="d-flex justify-content-between">
                      <div className="form-floating mb-3 me-2 w-50">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="MM/YY"
                        />
                        <label>Expiry Date</label>
                      </div>

                      <div className="form-floating mb-3 w-50">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="CVV"
                        />
                        <label>CVV</label>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
            <div className="form-check mt-4">
              <img
                src="/assets/images/visa.png"
                alt="visa"
                className="img-fluid"
              />
              <label className="form-check-label" htmlFor="visaCard">
                Visa Card
              </label>
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="visaCard"
                value="VisaCard"
                onChange={handlePaymentChange}
              />
              {paymentMethod === "VisaCard" && (
                <div className="mt-3">
                  <form>
                    {/* Card Holder Name */}
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter Card Holder Name"
                      />
                      <label>Card Holder Name</label>
                    </div>

                    {/* Card Number */}
                    <div className="form-floating mb-3 position-relative">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter Card Number"
                      />
                      <label>Card Number</label>
                      <img
                        src="/assets/images/master-card.png"
                        alt="master-card"
                        className="img-fluid"
                      />
                    </div>

                    {/* Expiry Date and CVV */}
                    <div className="d-flex justify-content-between">
                      <div className="form-floating mb-3 me-2 w-50">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="MM/YY"
                        />
                        <label>Expiry Date</label>
                      </div>

                      <div className="form-floating mb-3 w-50">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="CVV"
                        />
                        <label>CVV</label>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="cancle-btn" onClick={handlePaymentClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="submit-btn"
            onClick={handlePaymentPayNow}
          >
            Pay Now
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CancelDoctorAppointment;
