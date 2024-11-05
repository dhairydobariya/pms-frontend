import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import './MessageInput.scss';

const MessageInput = ({ onSendMessage, onFileUpload }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="message-input">
      <Form onSubmit={handleSubmit} className="d-flex align-items-center">
        <Button variant="link" className="me-2 attach-button">
          <i className="bi bi-paperclip"></i>
          <input type="file" onChange={handleFileChange} />
        </Button>
        <Form.Control
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button type="submit" className="ms-2 send-button">
          <i className="bi bi-send"></i>
        </Button>
      </Form>
    </div>
  );
};

export default MessageInput;