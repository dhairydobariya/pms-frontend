import React, { useEffect, useRef, useState } from "react";
import "./PrescriptionAccess.scss";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import html2canvas from "html2canvas";
import PatientSidebar from "../../../components/PatientSidebar/PatientSidebar";
import { Dropdown, Modal } from "react-bootstrap";

const PrescriptionCard = ({
  doctor,
  hospital,
  disease,
  date,
  time,
  imageName,
  imageSize,
  handlePrescriptionPreview,
}) => (
  <div className="card mb-3">
    <div className="card-body">
      <div className="d-flex justify-content-between align-items-center prescrption-head mb-2">
        <h5 className="mb-0">{doctor}</h5>
        <div className="d-flex align-items-center">
          <button className="btn p-0 me-2">
            <img src="./assets/images/download-icon.svg" alt="Download" />
          </button>
          <button className="btn p-0" onClick={handlePrescriptionPreview}>
            <img src="./assets/images/eye-gray.svg" alt="Print" />
          </button>
        </div>
      </div>
      <div className="prescrption-body">
        <div className="d-flex align-items-center justify-content-between">
          <strong>Hospital Name:</strong>
          <span>{hospital}</span>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <strong>Disease Name:</strong>
          <span>{disease}</span>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <strong>Date:</strong>
          <span>{date}</span>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <strong>Time:</strong>
          <span>{time}</span>
        </div>
        <div className="prescription-images-box mt-3">
          <img
            src="./assets/images/prescription-placeholder.png"
            alt="Prescription"
            className="img-fluid"
          />
          <div>
            <span>{imageName}</span>
            <small className="d-block">{imageSize}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const CustomDateRangeSelector = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const resetDates = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div className="custom-date-selector">
      <DatePicker
        selectsRange={true}
        startDate={startDate}
        endDate={endDate}
        onChange={(update) => {
          const [start, end] = update;
          setStartDate(start);
          setEndDate(end);
        }}
        isClearable={false}
        customInput={
          <button className="form-control date-range-button">
            {startDate && endDate
              ? `${formatDate(startDate)} - ${formatDate(endDate)}`
              : "Select Date Range"}
          </button>
        }
      />
      {startDate && endDate && (
        <button className="btn reset-dates-btn" onClick={resetDates}>
          <img src="./assets/images/cross-icon.svg" alt="Reset" />
        </button>
      )}
    </div>
  );
};

const PrescriptionAccess = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date("2022-01-02"));
  const [endDate, setEndDate] = useState(new Date("2022-01-13"));
  const [prescriptionPreview, setPrescriptionPreview] = useState(false);

  const modalRef = useRef(null);
  const sidebarRef = useRef(null);
  const location = useLocation();
  //   const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const toggleSearch = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
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

  const prescriptions = [
    {
      doctor: "Dr. Ryan Vetrovs",
      hospital: "Artemis Hospital",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
      imageName: "Prescription.JPG",
      imageSize: "370 x 218",
    },
    {
      doctor: "Marcus Septimus",
      hospital: "Artemis Hospital",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
      imageName: "Prescription.JPG",
      imageSize: "370 x 218",
    },
    {
      doctor: "Ahmad Arcand",
      hospital: "Artemis Hospital",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
      imageName: "Prescription.JPG",
      imageSize: "370 x 218",
    },
    {
      doctor: "Dr. Ryan Vetrovs",
      hospital: "Artemis Hospital",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
      imageName: "Prescription.JPG",
      imageSize: "370 x 218",
    },
  ];

  const handlePrescriptionPreview = () => {
    setPrescriptionPreview(true);
  };

  const handlePrescriptionPreviewClose = () => setPrescriptionPreview(false);

  const handleDownload = () => {
    if (modalRef.current) {
      html2canvas(modalRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "prescription.png";
        link.click();
      });
    }
  };

  return (
    <div className="d-flex">
      <div className="w-15 w-md-0">
        <PatientSidebar
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
                    <li className="breadcrumb-item active" aria-current="page">
                      Prescription Access
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
        <div className="container-fluid prescription-access-page py-4">
          <div className="row mb-4 align-items-center">
            <div className="col">
              <h1 className="prescription-access-title">Prescription Access</h1>
            </div>
            <div className="col-auto">
              <CustomDateRangeSelector
                startDate={startDate}
                endDate={endDate}
                setStartDate={setStartDate}
                setEndDate={setEndDate}
              />
            </div>
          </div>
          <div className="row">
            {prescriptions.map((prescription, index) => (
              <div key={index} className="col-md-6 col-lg-3">
                <PrescriptionCard
                  {...prescription}
                  handlePrescriptionPreview={handlePrescriptionPreview}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prescription Preview Modal */}
      <Modal
        className="prescription-access-preview-modal"
        show={prescriptionPreview}
        onHide={handlePrescriptionPreviewClose}
        centered
      >
        <Modal.Header closeButton>
          <h2 className="prescription-access-preview-title">Prescription</h2>
        </Modal.Header>
        <div className="prescription-access-preview-box" ref={modalRef}>
          <div className="prescription-preview-header">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div className="d-flex align-items-center">
                <img
                  src="/assets/images/logo.png"
                  alt="Hospital Logo"
                  className="hospital-logo img-fluid"
                />
              </div>
              <div className="text-end">
                <h3 className="m-0 doctor-name">Dr. Bharat Patel</h3>
                <p className="doctor-specialty">Obstetrics and gynecology</p>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col-md-6">
                <p>
                  <strong>Hospital Name:</strong> Medical Center
                </p>
                <p>
                  <strong>Patient Name:</strong> Alabtrao Bhajirao
                </p>
                <p>
                  <strong>Gender:</strong> Male
                </p>
                <p className="d-ruby">
                  <strong>Address:</strong> B-105 Virat Bungalows Punagam
                  Motavaracha Jamnagar.
                </p>
              </div>
              <div className="col-md-6">
                <p>
                  <strong>Prescription Date:</strong>{" "}
                  {new Date().toLocaleDateString()}
                </p>
                <p>
                  <strong>Age:</strong> 36 Year
                </p>
              </div>
            </div>
          </div>
          <div className="table-responsive">
            <table className="table mb-4">
              <thead>
                <tr>
                  <th>Medicine Name</th>
                  <th>Strength</th>
                  <th>Dose</th>
                  <th>Duration</th>
                  <th>When to take</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Calcium carbonate</td>
                  <td>100 Mg</td>
                  <td>1-0-1</td>
                  <td className="duration">2 Day</td>
                  <td className="whentotake">Before Food</td>
                </tr>
                <tr>
                  <td>Cyclobenzaprine</td>
                  <td>200 Mg</td>
                  <td>1-1-1</td>
                  <td className="duration">4 Day</td>
                  <td className="whentotake">With Food</td>
                </tr>
                <tr>
                  <td>Fluticasone Almeterol</td>
                  <td>150 Mg</td>
                  <td>0-1-0</td>
                  <td className="duration">5 Day</td>
                  <td className="whentotake">Before Food</td>
                </tr>
                <tr>
                  <td>Hydrochlorothiazide</td>
                  <td>250 Mg</td>
                  <td>0-0-1</td>
                  <td className="duration">2 Day</td>
                  <td className="whentotake">After Food</td>
                </tr>
                <tr>
                  <td>Flonase Allergy Relief</td>
                  <td>100 Mg</td>
                  <td>1-0-0</td>
                  <td className="duration">1 Day</td>
                  <td className="whentotake">Before Food</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="form-group additional-note mb-4">
            <label>
              <strong>Additional Note</strong>
            </label>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the{" "}
            </p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="doctor-signature">
              <img
                src="/assets/images/doctor-sign.png"
                alt="Doctor Signature"
              />
              <p>Doctor Signature</p>
            </div>
            <button
              type="button"
              className="download-btn"
              onClick={handleDownload}
            >
              <img
                src="/assets/images/arrow-down.svg"
                alt="arrow-down"
                className="img-fluid me-2"
              />
              Download
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PrescriptionAccess;
