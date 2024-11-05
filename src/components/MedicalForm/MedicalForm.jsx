// MedicalForm.js
import React from "react";
import "./MedicalForm.scss";

const MedicalForm = () => {
  return (
    <div className="container medical-form">
      {/* Created Date */}
      <div className="row justify-content-between created-date-section">
        <div className="col">
          <h6>Created Date</h6>
        </div>
        <div className="col text-end">
          <h6>2 Jan, 2022</h6>
        </div>
      </div>

      <div className="medical-innerbox">
        <div className="header">
          <img
            src="/assets/images/cycle_logo.png"
            alt="Cyclosport"
            className="logo img-fluid"
          />
          <div className="d-flex flex-column ms-4">
            <h2>Medical Certificate</h2>
            <p>
              Of suitability and fitness for the purposes of practicing
              competitive cycling abroad.
            </p>
          </div>
        </div>

        <form className="mt-4">
          <h4>To be filled by you, the participant:</h4>

          <div className="form-group row">
            <div className="col-md-6">
              <label>First name:</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-6">
              <label>Surname:</label>
              <input type="text" className="form-control" />
            </div>
          </div>

          <div className="form-group">
            <label>Address:</label>
            <input type="text" className="form-control" />
          </div>

          <div className="form-group row">
            <div className="col-md-4">
              <label>Town:</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-4">
              <label>County:</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-4">
              <label>Country:</label>
              <input type="text" className="form-control" />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-4">
              <label>Tel:</label>
              <input type="tel" className="form-control" />
            </div>
            <div className="col-md-4">
              <label>Mobile:</label>
              <input type="tel" className="form-control" />
            </div>
            <div className="col-md-4">
              <label>+44 for UK:</label>
              <input type="text" className="form-control" />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-6">
              <label>Emergency Contact Name:</label>
              <input type="text" className="form-control" />
            </div>
            <div className="col-md-6">
              <label>Emergency Contact No:</label>
              <input type="tel" className="form-control" />
            </div>
          </div>

          <h4>To be filled by your GP/Doctor/Medical Practitioner:</h4>

          <div className="form-group">
            <label>
              I the undersigned,{" "}
              <span className="placeholders">_____________________________</span> Doctor of
              Medicine, see no reason that the above participant, on
              examination, cannot take part in competitive or non-competitive
              cycling.
            </label>
          </div>

          <div className="form-group row">
            <div className="col-md-6">
              <label>Doctor’s Stamp:</label>
              <textarea className="form-control"></textarea>
            </div>
            <div className="col-md-6">
              <label>Doctor’s Signature:</label>
              <input type="text" className="form-control" />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-6">
              <label>Date:</label>
              <input type="date" className="form-control" />
            </div>
            <div className="col-md-6">
              <small className="document-text">
                This document is only valid for one year from the above date.
              </small>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicalForm;
