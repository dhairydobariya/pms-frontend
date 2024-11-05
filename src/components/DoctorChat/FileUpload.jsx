import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import './FileUpload.scss';

const FileUpload = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file) {
      onFileUpload(file);
      setFile(null);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="file-upload">
      <Form.Group>
        <Form.Control type="file" onChange={handleFileChange} />
      </Form.Group>
      <Button type="submit" disabled={!file}>
        Upload
      </Button>
    </Form>
  );
};

export default FileUpload;