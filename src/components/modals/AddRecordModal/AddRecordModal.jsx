import React, { useState } from "react";
import { Modal, Button, Form, ProgressBar } from "react-bootstrap";
import { Upload, File, X } from "lucide-react";
import "./AddRecordModal.scss";
import { useNavigate } from "react-router-dom";

const AddRecordModal = ({ show, onHide }) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    handleFile(selectedFile);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleFile = (selectedFile) => {
    if (selectedFile && selectedFile.size <= 10 * 1024 * 1024) {
      // 10MB limit
      setFile(selectedFile);
      simulateUpload(selectedFile);
    } else {
      alert("Please select a file up to 10MB in size.");
    }
  };

  const simulateUpload = (file) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setPreviewUrl(URL.createObjectURL(file));
      }
    }, 200);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleRemoveFile = () => {
    setFile(null);
    setUploadProgress(0);
    setPreviewUrl(null);
  };

  const handleSave = () => {
    // Implement save functionality here
    console.log("File:", file);
    console.log("Description:", description);
    navigate("/patientRecordFile");
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered className="add-record-modal">
      <Modal.Header>
        <Modal.Title>Add Record</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Upload File</Form.Label>
            {!file ? (
              <div
                className="file-upload-area"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".png,.jpg,.gif,.pdf"
                  hidden
                  id="fileInput"
                />
                <label htmlFor="fileInput" className="file-upload-label">
                  <Upload size={24} />
                  <p className="file-type-title"><span>Upload a file</span> or drag and drop</p>
                  <p className="file-type-info">
                    PNG, JPG, GIF, PDF up to 10MB
                  </p>
                </label>
              </div>
            ) : (
              <div className="file-preview">
                {uploadProgress < 100 ? (
                  <ProgressBar
                    now={uploadProgress}
                    label={`${uploadProgress}%`}
                  />
                ) : (
                  <>
                    {previewUrl && (
                      <div className="preview-container">
                        {file.type.startsWith("image/") ? (
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="file-preview-image"
                          />
                        ) : (
                          <div className="file-icon">
                            <File size={48} />
                          </div>
                        )}
                      </div>
                    )}
                    <div className="file-info">
                      <span>{file.name}</span>
                      <Button
                        variant="link"
                        onClick={handleRemoveFile}
                        className="remove-file"
                      >
                        <X size={18} />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button className="record-cancle-btn" onClick={onHide}>
          Cancel
        </button>
        <button className="record-submit-btn" onClick={handleSave}>
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddRecordModal;
