import React, { useState } from "react";
import { Card, Modal, Button } from "react-bootstrap";
import { FileIcon, defaultStyles } from "react-file-icon";
import { Download } from "lucide-react";
import "./ChatWindow.scss";

const ChatWindow = ({ chat, messages }) => {
  const [previewFile, setPreviewFile] = useState(null);

  const handleFileClick = (file) => {
    setPreviewFile(file);
  };

  const handleClosePreview = () => {
    setPreviewFile(null);
  };

  const handleDownload = (file) => {
    const url = URL.createObjectURL(file);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = file.name;

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const renderFilePreview = (file) => {
    if (file.type.startsWith("image/")) {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt="Preview"
          className="img-fluid"
        />
      );
    } else if (file.type === "application/pdf") {
      return (
        <iframe
          src={URL.createObjectURL(file)}
          title="PDF Preview"
          width="100%"
          height="500px"
        />
      );
    } else {
      return <p>File type not supported for preview</p>;
    }
  };

  const renderFileAttachment = (file) => {
    if (file.type.startsWith("image/")) {
      return (
        <div className="image-attachment">
          <img
            src={URL.createObjectURL(file)}
            alt={file.name}
            className="img-fluid"
            onClick={() => handleFileClick(file)}
          />
        </div>
      );
    } else {
      const extension = file.name.split(".").pop().toLowerCase();
      return (
        <div className="file-attachment" onClick={() => handleFileClick(file)}>
          <div className="file-icon">
            <FileIcon extension={extension} {...defaultStyles[extension]} />
          </div>
          <div className="file-info">
            <p className="file-name">{file.name}</p>
            <p className="file-size">{formatFileSize(file.size)}</p>
          </div>
        </div>
      );
    }
  };

  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach((message) => {
      const date = new Date(message.time).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    return groups;
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <img src={chat.avatar} alt={chat.name} className="chat-avatar" />
        <div className="d-flex align-items-center flex-column">
          <h2>{chat.name}</h2>
          <p className="d-block">{chat.time}</p>
        </div>
      </div>

      <div className="chat-messages">
        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date}>
            <div className="text-center">
              <div className="message-date">{date}</div>
            </div>
            {msgs.map((message, index) => (
              <Card
                key={index}
                className={`message ${
                  message.sender === "You" ? "user-message" : "other-message"
                }`}
              >
                {message.sender !== "You" && (
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="message-avatar"
                  />
                )}
                <Card.Body>
                  {!message.file ? (
                    <p className="message-content">{message.content}</p>
                  ) : (
                    ""
                  )}
                  {message.file && renderFileAttachment(message.file)}
                </Card.Body>
                <Card.Footer>
                  {message.sender} {message.time}
                </Card.Footer>
              </Card>
            ))}
          </div>
        ))}
      </div>

      <Modal
        show={previewFile !== null}
        onHide={handleClosePreview}
        size="lg"
        className="chat-doc-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>{previewFile && previewFile.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{previewFile && renderFilePreview(previewFile)}</Modal.Body>
        <Modal.Footer>
          <Button onClick={() => handleDownload(previewFile)}>
            <img
              src="/assets/images/download-image-icon.svg"
              alt="download-image-icon"
              className="img-fluid"
            />
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ChatWindow;
