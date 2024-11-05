import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { Minus } from "lucide-react";
import "./EditInvoiceDesign.scss";

const EditInvoiceDesign = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [logo, setLogo] = useState("/assets/images/health-logo.png");
  const [fields, setFields] = useState([
    { id: 1, label: "Name", value: "Jenny Wilson", type: "text" },
    {
      id: 2,
      label: "Other Text",
      value: "Lorem ipsum dolor sit amet, consectetur",
      type: "text",
    },
    { id: 3, label: "Email", value: "Slivermedical@gamil.com", type: "email" },
    { id: 4, label: "Bill Date", value: "2 Jan, 2022", type: "date" },
    { id: 5, label: "Bill Time", value: "12:19 PM", type: "time" },
    { id: 6, label: "Bill Number", value: "102", type: "number" },
    {
      id: 7,
      label: "Phone Number",
      value: "9913023830",
      type: "text",
      pattern: "\\d{5} \\d{5}",
      title: "Format: 99130 23830",
    },
    { id: 8, label: "Address", value: "501,Shamruddh Avenyu", type: "text" },
  ]);
  const [patientfields, setPatientFields] = useState([
    { id: 1, label: "Name", value: "Jenny Wilson", type: "text" },
    {
      id: 2,
      label: "Disease Name",
      value: "Meningococcal Disease",
      type: "text",
    },
    { id: 3, label: "Doctor Name", value: "Dr. Marcus Philips", type: "text" },
    {
      id: 4,
      label: "Description",
      value: "Lorem ipsum dolor sit amet, consectetur",
      type: "text",
    },
    { id: 5, label: "Discount (%)", value: "10", type: "number" },
    { id: 6, label: "Tax", value: "256", type: "number" },
    { id: 7, label: "Amount", value: "2520", type: "number" },
    { id: 8, label: "Total Amount", value: "2520", type: "number" },
    {
      id: 9,
      label: "Payment Type",
      value: "Online",
      type: "select",
      options: ["Cash", "Online", "Card"],
    },
    { id: 10, label: "Age", value: "22", type: "number" },
    {
      id: 11,
      label: "Gender",
      value: "Male",
      type: "select",
      options: ["Male", "Female", "Other"],
    },
    { id: 12, label: "Address", value: "501,Shamruddh Avenyu", type: "text" },
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

  const handleLogoUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveField = (id) => {
    setFields(fields.filter((field) => field.id !== id));
  };

  const handlePatientRemoveField = (id) => {
    setPatientFields(patientfields.filter((field) => field.id !== id));
  };

  // Function to clone all hospital fields
  const handleCloneHospitalFields = () => {
    const clonedFields = fields.map((field) => ({
      ...field,
      id: fields.length + Math.random(),
      value: "",
    }));
    setFields([...fields, ...clonedFields]);
  };

  // Function to clone all patient fields
  const handleClonePatientFields = () => {
    const clonedPatientFields = patientfields.map((field) => ({
      ...field,
      id: patientfields.length + Math.random(),
      value: "",
    }));
    setPatientFields([...patientfields, ...clonedPatientFields]);
  };

  const handleInputChange = (id, value) => {
    setFields((prevFields) =>
      prevFields.map((field) => (field.id === id ? { ...field, value } : field))
    );
  };

  const handlePatientInputChange = (id, value) => {
    setPatientFields((prevFields) =>
      prevFields.map((field) => (field.id === id ? { ...field, value } : field))
    );
  };

  const handleDropdownChange = (id, value) => {
    setPatientFields((prevFields) =>
      prevFields.map((field) => (field.id === id ? { ...field, value } : field))
    );
  };

  const handleChangeInvoiceTheme = () => {
    navigate("/billing/monitor-billing/selectInvoiceTheme");
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
        <div className="container-fluid edit-invoice-page py-4">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="edit-invoice-title mb-0">Edit Invoice Design</h1>
            <button
              type="button"
              className="change_design-btn"
              onClick={handleChangeInvoiceTheme}
            >
              <img
                src="/assets/images/add.svg"
                alt="add"
                className="img-fluid me-md-3 me-0"
              />
              <span className="d-md-inline-flex d-none">
                Change Invoice Theme
              </span>
            </button>
          </div>
          {/* Hospital Details Section */}
          <div className="section">
            <div className="section-header">
              <h2 className="section-heading-title">Hospital Details</h2>
              <button
                type="button"
                className="change_design-btn"
                onClick={handleCloneHospitalFields}
              >
                <img
                  src="/assets/images/add.svg"
                  alt="add"
                  className="img-fluid me-md-3 me-0"
                />
                <span className="d-md-inline-flex d-none">Add New Field</span>
              </button>
            </div>

            <div className="row">
              <div className="col-lg-3 col-12 mb-lg-0 mb-4">
                <div className="logo-upload">
                  <img src={logo} alt="Health Logo" className="logo" />
                  <input
                    type="file"
                    onChange={handleLogoUpload}
                    className="d-none"
                    accept="image/*"
                  />
                  <div
                    className="overlay"
                    onClick={() =>
                      document.querySelector('input[type="file"]').click()
                    }
                  >
                    <img
                      src="/assets/images/upload-img-icon.svg"
                      alt="upload-img-icon"
                      className="img-fluid me-2"
                    />
                    <span className="change-logo-text">Change Logo</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-9 col-12">
                <div className="row">
                  {fields.map((field) => (
                    <div
                      key={field.id}
                      className="col-lg-4 col-md-6 col-12 mb-5"
                    >
                      <div className="form-floating position-relative">
                        {field.type === "select" ? (
                          <select
                            className="form-control"
                            id={`field-${field.id}`}
                            value={field.value}
                            onChange={(e) =>
                              handleInputChange(field.id, e.target.value)
                            }
                          >
                            <option value="">Select</option>
                            {field.options.map((option, index) => (
                              <option key={index} value={option}>
                                {option}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type}
                            className="form-control"
                            id={`field-${field.id}`}
                            value={field.value}
                            onChange={(e) =>
                              handleInputChange(field.id, e.target.value)
                            }
                            pattern={field.pattern}
                            title={field.title}
                          />
                        )}
                        <label htmlFor={`field-${field.id}`}>
                          {field.label}
                        </label>

                        {/* Minus icon for removing the field */}
                        <button
                          type="button"
                          className="minus-btn"
                          onClick={() => handleRemoveField(field.id)}
                        >
                          <Minus size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Patient Details Section */}
          <div className="section">
            <div className="section-header">
              <h2 className="section-heading-title">Patient Details</h2>
              <button
                type="button"
                className="change_design-btn"
                onClick={handleClonePatientFields}
              >
                <img
                  src="/assets/images/add.svg"
                  alt="add"
                  className="img-fluid me-md-3 me-0"
                />
                <span className="d-md-inline-flex d-none">Add New Field</span>
              </button>
            </div>
            <div className="row">
              {patientfields.map((field) => (
                <div key={field.id} className="col-lg-4 col-md-6 col-12 mb-5">
                  <div className="form-floating position-relative">
                    {field.type === "select" ? (
                      <select
                        className="form-control"
                        id={`patient-field-${field.id}`}
                        value={field.value}
                        onChange={(e) =>
                          handleDropdownChange(field.id, e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        {field.options.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        className="form-control"
                        id={`patient-field-${field.id}`}
                        value={field.value}
                        onChange={(e) =>
                          handlePatientInputChange(field.id, e.target.value)
                        }
                      />
                    )}
                    <label htmlFor={`patient-field-${field.id}`}>
                      {field.label}
                    </label>

                    <button
                      type="button"
                      className="minus-btn"
                      onClick={() => handlePatientRemoveField(field.id)}
                    >
                      <Minus size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Save Button */}
          <div className="save-section">
            <button className="save-btn">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditInvoiceDesign;
