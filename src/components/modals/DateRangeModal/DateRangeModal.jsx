import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DateRangeModal.scss";

const DateRangeModal = ({ show, handleClose, handleApply }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleReset = () => {
    setStartDate(new Date());
    setEndDate(new Date());
  };

  const handleApplyClick = () => {
    handleApply(startDate, endDate);
    handleClose();
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      className="date-range-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Custom Date</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>From Date</Form.Label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  className="form-control"
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>To Date</Form.Label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  className="form-control"
                />
              </Form.Group>
            </div>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleReset} className="reset-btn">
          Reset
        </Button>
        <Button
          variant="primary"
          onClick={handleApplyClick}
          className="apply-btn"
        >
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DateRangeModal;
