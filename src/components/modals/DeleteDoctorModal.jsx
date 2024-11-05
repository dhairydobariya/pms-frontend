import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

const DeleteDoctorModal = ({ open, handleClose, handleDelete }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="delete-doctor-title"
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle
        id="delete-doctor-title"
        className="delete-doctor-modal text-center"
      >
        <div className="red-bg"></div>
        <div className="d-flex flex-column align-items-center mt-4">
          <img
            src="/assets/images/trash.svg"
            alt="trash"
            className="img-fluid"
          />
          <h3 className="mt-2 delete-doctor-modal-title">
            Delete Doctor Details?
          </h3>
          <p className="delete-doctor-modal-content">
            Are you sure you want to delete this doctor details?
          </p>
        </div>
      </DialogTitle>
      <DialogActions className="d-flex align-items-center justify-content-between">
        <button
          type="submit"
          className="delete-doctor-modal-cancle-btn"
          onClick={handleClose}
        >
          No
        </button>
        <button
          type="submit"
          className="delete-doctor-modal-submit-btn"
          onClick={handleDelete}
        >
          Yes
        </button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDoctorModal;
