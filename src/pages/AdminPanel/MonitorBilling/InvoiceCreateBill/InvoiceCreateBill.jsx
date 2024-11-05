import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Minus, X, Upload } from "lucide-react";
import "./InvoiceCreateBill.scss";

const InvoiceCreateBill = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [preview, setPreview] = useState(null);

  const [hospitalDetails, setHospitalDetails] = useState([
    { id: uuidv4(), name: "name", value: "" },
    { id: uuidv4(), name: "otherText", value: "" },
    { id: uuidv4(), name: "email", value: "" },
    { id: uuidv4(), name: "billDate", value: "" },
    { id: uuidv4(), name: "billTime", value: "" },
    { id: uuidv4(), name: "billNumber", value: "" },
    { id: uuidv4(), name: "phoneNumber", value: "" },
    { id: uuidv4(), name: "address", value: "" },
  ]);
  const [patientDetails, setPatientDetails] = useState([
    { id: uuidv4(), name: "patientName", value: "" },
    { id: uuidv4(), name: "diseaseName", value: "" },
    { id: uuidv4(), name: "doctorName", value: "" },
    { id: uuidv4(), name: "description", value: "" },
    { id: uuidv4(), name: "discount", value: "" },
    { id: uuidv4(), name: "tax", value: "" },
    { id: uuidv4(), name: "amount", value: "" },
    { id: uuidv4(), name: "totalAmount", value: "" },
    { id: uuidv4(), name: "paymentType", value: "" },
    { id: uuidv4(), name: "age", value: "" },
    { id: uuidv4(), name: "gender", value: "" },
    { id: uuidv4(), name: "address", value: "" },
  ]);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Change Invoice Theme",
      description: "Lincoln Philips changed the Invoice Theme.",
      time: "5 min ago",
      icon: "theme-icon.svg",
    },
    {
      id: 2,
      title: "Dr.Bharat",
      description: "Created a bill by Dr. Bharat.",
      time: "5 min ago",
      icon: "theme-icon.svg",
    },
    {
      id: 3,
      title: "Payment Received",
      description: "24,668 is the payment done of Miracle Canter.",
      time: "1:52PM",
      icon: "payment-received-icon.svg",
    },
    {
      id: 4,
      title: "Payment Cancelled",
      description: "24,668 is the payment cancelled of Miracle Canter.",
      time: "1:52PM",
      icon: "payment-cancelled-icon.svg",
    },
  ]);

  const noNotificationImage = "/assets/images/no-notification.png";

  const clearNotifications = () => {
    setNotifications([]); // Clear the notifications array
  };

  const fileInputRef = useRef(null);
  const sidebarRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const handleClickOutside = (event) => {
    if (
      isSidebarOpen &&
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target)
    ) {
      closeSidebar();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const simulateUploadProgress = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(Math.min(progress, 100));

      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 200);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Clean up previous preview
      if (preview) {
        URL.revokeObjectURL(preview);
      }

      const newPreview = URL.createObjectURL(file);
      setPreview(newPreview);

      setCurrentFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2),
      });

      setUploadProgress(0);
      simulateUploadProgress();
    }
  };

  const removeFile = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setCurrentFile(null);
    setPreview(null);
    setUploadProgress(0);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.currentTarget.classList.add("border-primary");
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove("border-primary");
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.currentTarget.classList.remove("border-primary");

    const file = event.dataTransfer.files[0];
    if (file) {
      // Clean up previous preview
      if (preview) {
        URL.revokeObjectURL(preview);
      }

      const newPreview = URL.createObjectURL(file);
      setPreview(newPreview);

      setCurrentFile({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2),
      });

      setUploadProgress(0);
      simulateUploadProgress();
    }
  };

  // Handle dynamic hospital details change
  const handleHospitalDetailChange = (id, e) => {
    const { value } = e.target;
    setHospitalDetails(
      hospitalDetails.map((detail) =>
        detail.id === id ? { ...detail, value: value } : detail
      )
    );
  };

  // Handle patient field changes dynamically
  const handlePatientDetailChange = (id, e) => {
    const { value } = e.target;
    setPatientDetails(
      patientDetails.map((detail) =>
        detail.id === id ? { ...detail, value: value } : detail
      )
    );
  };

  // Add new field to Hospital Details
  const addHospitalDetail = () => {
    const newHospitalDetailSet = hospitalDetails.map((detail) => ({
      id: uuidv4(),
      name: detail.name,
      value: "",
    }));
    setHospitalDetails([...hospitalDetails, ...newHospitalDetailSet]);
  };

  const addPatientDetail = () => {
    const newPatientDetailSet = patientDetails.map((detail) => ({
      id: uuidv4(),
      name: detail.name,
      diseaseName: detail.diseaseName,
      doctorName: detail.doctorName,
      description: detail.description,
      discount: detail.discount,
      tax: detail.tax,
      amount: detail.amount,
      totalAmount: detail.totalAmount,
      paymentType: detail.paymentType,
      age: detail.age,
      gender: detail.gender,
      address: detail.address,
    }));
    setPatientDetails([...patientDetails, ...newPatientDetailSet]);
  };

  // Remove a specific field from Hospital Details using ID
  const removeHospitalDetail = (id) => {
    setHospitalDetails(hospitalDetails.filter((detail) => detail.id !== id));
  };

  // Remove patient detail row using ID
  const removePatientDetail = (id) => {
    setPatientDetails(patientDetails.filter((detail) => detail.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Hospital Details:", hospitalDetails);
    console.log("Patient Details:", patientDetails);
  };

  return (
    <div className="d-flex">
      <div className="w-15 w-md-0">
        <Sidebar
          isOpen={isSidebarOpen}
          sidebarRef={sidebarRef}
          activeLink={location.pathname}
        />
      </div>
      <div className="w-85 w-md-100">
        <div className="profile-header">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-md-6 col-12 mobile-screen">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">
                        <img
                          src="/assets/images/home-2.svg"
                          alt="Home"
                          className="breadcrumb-icon"
                        />
                      </a>
                    </li>
                    <li className="breadcrumb-item" aria-current="page">
                      Billing And Payments
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Monitor Billing
                    </li>
                  </ol>
                </nav>
              </div>
              <div className="col-md-6 col-12 d-lg-flex d-block justify-content-lg-end">
                <div className="d-lg-flex d-none search-container me-3 mt-lg-0 mt-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Quick Search"
                  />
                  <img
                    src="/assets/images/search.svg"
                    alt="search"
                    className="search-icon"
                  />
                  <Dropdown className="me-3">
                    <Dropdown.Toggle variant="link" id="dropdown-all">
                      All
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">All</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Doctor</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Patient</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="d-lg-none d-flex align-items-center justify-content-between">
                  <nav className="breadcrumb-container d-block d-lg-none p-0">
                    <button className="btn btn-primary" onClick={toggleSidebar}>
                      <i className="bi bi-text-left"></i>
                    </button>
                  </nav>
                  <div className="d-flex align-items-center justify-content-center">
                    <button className="btn" onClick={toggleSearch}>
                      <img
                        src="/assets/images/search.svg"
                        alt="search"
                        className="search-icon"
                      />
                    </button>
                    {isSearchVisible && (
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Quick Search"
                        style={{ display: isSearchVisible ? "block" : "none" }}
                      />
                    )}
                    <Dropdown className="notification-dropdown mx-3">
                      <Dropdown.Toggle
                        variant="link"
                        className="notification-toggle"
                      >
                        <img
                          src="/assets/images/notification-bing.svg"
                          alt="Notification Icon"
                          className="img-fluid"
                        />
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="notification-menu">
                        <div className="notification-header d-flex justify-content-between align-items-center">
                          <span>Notification</span>
                          <button className="close-btn" onClick={clearNotifications}>&times;</button>
                        </div>
                        {notifications.length > 0 ? (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              className="notification-item d-flex align-items-start"
                            >
                              <img
                                src={`/assets/images/${notification.icon}`}
                                alt={notification.title}
                                className="notification-icon"
                              />
                              <div className="notification-content">
                                <h5>{notification.title}</h5>
                                <p>{notification.description}</p>
                              </div>
                              <span className="notification-time">
                                {notification.time}
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="no-notifications text-center">
                            <img
                              src={noNotificationImage}
                              alt="No Notifications"
                              className="no-notifications-img"
                            />
                          </div>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                      <Dropdown.Toggle variant="link" id="dropdown-user">
                        <div className="d-flex align-items-center">
                          <img
                            src="/assets/images/profile.png"
                            alt="Lincoln Philips"
                            className="profile-pic img-fluid"
                          />
                          <div className="d-none text-start">
                            <h3 className="user-name mb-0">Lincoln Philips</h3>
                            <span className="user-role">Admin</span>
                          </div>
                        </div>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
                        <Dropdown.Item href="#/settings">
                          Settings
                        </Dropdown.Item>
                        <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <div className="d-lg-flex d-none align-items-center">
                  <Dropdown className="notification-dropdown">
                    <Dropdown.Toggle
                      variant="link"
                      className="notification-toggle"
                    >
                      <img
                        src="/assets/images/notification-bing.svg"
                        alt="Notification Icon"
                        className="img-fluid"
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="notification-menu">
                      <div className="notification-header d-flex justify-content-between align-items-center">
                        <span>Notification</span>
                        <button className="close-btn" onClick={clearNotifications}>&times;</button>
                      </div>
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className="notification-item d-flex align-items-start"
                          >
                            <img
                              src={`/assets/images/${notification.icon}`}
                              alt={notification.title}
                              className="notification-icon"
                            />
                            <div className="notification-content">
                              <h5>{notification.title}</h5>
                              <p>{notification.description}</p>
                            </div>
                            <span className="notification-time">
                              {notification.time}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="no-notifications text-center">
                          <img
                            src={noNotificationImage}
                            alt="No Notifications"
                            className="no-notifications-img"
                          />
                        </div>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Dropdown>
                    <Dropdown.Toggle variant="link" id="dropdown-user">
                      <div className="d-flex align-items-center">
                        <img
                          src="/assets/images/profile.png"
                          alt="Lincoln Philips"
                          className="profile-pic img-fluid"
                        />
                        <div className="d-block text-start">
                          <h3 className="user-name mb-0">Lincoln Philips</h3>
                          <span className="user-role">Admin</span>
                        </div>
                      </div>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
                      <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
                      <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid invoice-create-bill-page py-4">
          <h1 className="invoice-create-bill-title mb-0">Create Bill</h1>
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title d-flex justify-content-between align-items-center mb-4">
                Hospital Details
                <button
                  type="button"
                  className="change_design-btn"
                  onClick={addHospitalDetail}
                >
                  <img
                    src="/assets/images/add.svg"
                    alt="add"
                    className="img-fluid me-md-3 me-0"
                  />
                  <span className="d-md-inline-flex d-none">Add New Field</span>
                </button>
              </h5>
              <div className="row">
                <div className="col-md-3">
                  <h6 className="upload-text">Upload Logo</h6>
                  <div
                    className={`upload-area rounded p-4 mb-3 ${
                      uploadProgress !== 100
                        ? "border border-2 border-dashed"
                        : ""
                    }`}
                    style={{ cursor: "pointer" }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      className="d-none"
                      onChange={handleFileUpload}
                      accept="image/*"
                    />

                    {uploadProgress === 100 && preview ? (
                      <div className="text-center position-relative">
                        <img
                          src={preview}
                          alt="Uploaded"
                          className="img-fluid rounded"
                          style={{ maxHeight: "200px" }}
                        />
                      </div>
                    ) : (
                      <div className="text-center text-muted">
                        <Upload className="mb-2 text-primary" size={32} />
                        <p className="text-primary mb-1">Upload a file</p>
                        <p className="small">or drag and drop</p>
                        <p className="small text-muted mt-2">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    )}
                  </div>

                  {currentFile && uploadProgress < 100 && (
                    <div className="bg-light rounded p-3 mb-2">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <div className="d-flex align-items-center">
                          <div className="bg-primary bg-opacity-10 rounded p-2 me-2">
                            <img
                              src={preview}
                              alt={currentFile.name}
                              width="16"
                              height="16"
                              className="rounded"
                            />
                          </div>
                          <div>
                            <p className="mb-0 small fw-medium">
                              {currentFile.name}
                            </p>
                            <small className="text-muted">
                              {currentFile.size} MB
                            </small>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeFile();
                          }}
                          className="btn btn-link text-muted p-0 border-0"
                          style={{ lineHeight: 0 }}
                        >
                          <X size={16} />
                        </button>
                      </div>
                      <div className="progress" style={{ height: "4px" }}>
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: `${uploadProgress}%` }}
                          aria-valuenow={uploadProgress}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        />
                      </div>
                      <small className="text-muted mt-1 d-block">
                        {uploadProgress}% Upload
                      </small>
                    </div>
                  )}
                </div>
                <div className="col-md-9">
                  <div className="row">
                    {hospitalDetails.map((detail) => (
                      <div
                        key={detail.id}
                        className="col-lg-4 col-md-6 col-12 mb-3"
                      >
                        <div className="form-floating position-relative">
                          <input
                            type={
                              detail.name === "billDate"
                                ? "date"
                                : detail.name === "billTime"
                                ? "time"
                                : "text"
                            }
                            className="form-control"
                            placeholder={`Enter ${detail.name}`}
                            value={detail.value}
                            onChange={(e) =>
                              handleHospitalDetailChange(detail.id, e)
                            }
                          />
                          <label>
                            {detail.name
                              .replace(/([A-Z])/g, " $1")
                              .replace(/^./, (str) => str.toUpperCase())}
                          </label>
                          {hospitalDetails.length > 1 && (
                            <button
                              type="button"
                              className="minus-btn"
                              onClick={() => removeHospitalDetail(detail.id)}
                            >
                              <Minus size={16} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title d-flex justify-content-between align-items-center mb-4">
                Patient Details
                <button
                  type="button"
                  className="change_design-btn"
                  onClick={addPatientDetail}
                >
                  <img
                    src="/assets/images/add.svg"
                    alt="add"
                    className="img-fluid me-md-3 me-0"
                  />
                  <span className="d-md-inline-flex d-none">Add New Field</span>
                </button>
              </h5>

              <div className="row">
                {patientDetails.map((detail) => (
                  <div
                    key={detail.id}
                    className="col-lg-3 col-md-6 col-12 mb-3"
                  >
                    <div className="form-floating position-relative">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={`Enter ${detail.name}`}
                        value={detail.value}
                        onChange={(e) =>
                          handlePatientDetailChange(detail.id, e)
                        }
                      />
                      <label>
                        {detail.name
                          .replace(/([A-Z])/g, " $1")
                          .replace(/^./, (str) => str.toUpperCase())}
                      </label>

                      <button
                        type="button"
                        className="minus-btn"
                        onClick={() => removePatientDetail(detail.id)}
                      >
                        <Minus size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-end">
            <button type="submit" className="save-btn" onClick={handleSubmit}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceCreateBill;
