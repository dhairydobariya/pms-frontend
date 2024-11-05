import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import PatientSidebar from "../../../components/PatientSidebar/PatientSidebar";
import { Dropdown, Modal } from "react-bootstrap";
import "./PersonalHealthTestReports.scss";

const PrescriptionCard = ({
  doctor,
  testReportName,
  disease,
  date,
  handlePrescriptionPreview,
}) => (
  <div className="card mb-3">
    <div className="card-body">
      <div className="d-flex justify-content-between align-items-center prescrption-head mb-2">
        <h5 className="mb-0">{doctor}</h5>
        <div className="d-flex align-items-center">
          <button className="btn p-0" onClick={handlePrescriptionPreview}>
            <img src="./assets/images/eye-gray.svg" alt="Print" />
          </button>
        </div>
      </div>
      <div className="prescrption-body">
        <div className="d-flex align-items-center justify-content-between">
          <strong>Disease Name</strong>
          <span>{disease}</span>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <strong>Test Report Name</strong>
          <span>{testReportName}</span>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <strong>Report Date</strong>
          <span>{date}</span>
        </div>
      </div>
    </div>
  </div>
);

const PersonalHealthTestReports = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [prescriptionPreview, setPrescriptionPreview] = useState(false);

  const modalRef = useRef(null);
  const sidebarRef = useRef(null);
  const location = useLocation();

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
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      testReportName: "Blood Test",
    },
    {
      doctor: "Marcus Septimus",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      testReportName: "Blood Test",
    },
    {
      doctor: "Ahmad Arcand",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      testReportName: "Blood Test",
    },
    {
      doctor: "Dr. Ryan Vetrovs",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      testReportName: "Blood Test",
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
                    <li className="breadcrumb-item" aria-current="page">
                      Personal Health Record
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Test Reports
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
        <div className="container-fluid personal_health_test_record-page py-4">
          <div className="row mb-4 align-items-center">
            <div className="col">
              <h1 className="prescription-access-title">Test Reports</h1>
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
        className="personal_health_test-preview-modal"
        show={prescriptionPreview}
        onHide={handlePrescriptionPreviewClose}
        centered
      >
        <Modal.Header closeButton>
          <h2 className="prescription-access-preview-title">Test Reports</h2>
        </Modal.Header>
        <div className="test-report card" ref={modalRef}>
          <div className="card-header bg-white border-bottom-0 d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <img
                src="/assets/images/test-logo.png"
                alt="DRLOGY PATHOLOGY LAB"
                className="logo me-3"
              />
              <div>
                <h1 className="mb-0">
                  <span>DRLOGY</span> PATHOLOGY LAB
                </h1>
                <p className="mb-0">
                  <img
                    src="/assets/images/telecop.png"
                    alt="telecop"
                    className="me-2 img-fluid"
                  />{" "}
                  <small>Accurate | Caring | Instant</small>
                </p>
              </div>
            </div>
            <div className="contact-info text-end">
              <p className="mb-0">
                <img
                  src="/assets/images/phone-icon.png"
                  alt="phone-icon"
                  className="img-fluid test-icon"
                />{" "}
                <small>01234567890 | 09123456789</small>
              </p>
              <p className="mb-0">
                <img
                  src="/assets/images/email-icon.png"
                  alt="email-icon"
                  className="img-fluid test-icon"
                />{" "}
                <small>drlogypathlab@drlogy.com</small>
              </p>
            </div>
          </div>
          <p className="mb-0 address">
            105-108, SMART VISION COMPLEX, HEALTHCARE ROAD, OPPOSITE HEALTHCARE
            COMPLEX. MUMBAI - 689578
          </p>
          <img
            src="/assets/images/test-report-border.png"
            alt="test-report-border"
            className="img-fluid my-2"
          />
          <div className="card-body">
            <div className="row mb-3">
              <div className="col-lg-4">
                <div className="row">
                  <div className="col-6">
                    <h2>Yash M. Patel</h2>
                    <p className="mb-0">Age: 21 Years</p>
                    <p className="mb-0">Sex: Male</p>
                    <p className="mb-0">PID: 555</p>
                  </div>
                  <div className="col-6">
                    <img
                      src="/assets/images/qr-code.png"
                      alt="QR Code"
                      className="qr-code"
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <p className="mb-0">
                  <strong>Sample Collected At:</strong> 125, Shivam Bungalow, S
                  G Road, Mumbai
                </p>
                <p className="mb-0">
                  <strong>Ref. By Dr. Hiren Shah</strong>
                </p>
              </div>
              <div className="col-lg-4">
                <img
                  src="/assets/images/barcode_img.png"
                  alt="barcode_img"
                  className="img-fluid"
                />
                <p className="mb-0">
                  <small>Registered on: 02:31 PM 02 Dec, 2X</small>
                </p>
                <p className="mb-0">
                  <small>Collected on: 03:11 PM 02 Dec, 2X</small>
                </p>
                <p className="mb-0">
                  <small>Reported on: 04:35 PM 02 Dec, 2X</small>
                </p>
              </div>
            </div>
            <h3 className="mb-3 test-table-header">
              Complete Blood Count (CBC) with Absolute Count
            </h3>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Investigation</th>
                    <th>Result</th>
                    <th>Reference Value</th>
                    <th>Unit</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Primary Sample Type</td>
                    <td>Blood</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>
                      HEMOGLOBIN
                      <br />
                      Hemoglobin (Hb)
                    </td>
                    <td className="text-primary">12.5</td>
                    <td>
                      <span className="text-muted">Low</span> 13.0 - 17.0
                    </td>
                    <td>g/dL</td>
                  </tr>
                  <tr>
                    <td>
                      RBC COUNT
                      <br />
                      Total RBC count
                    </td>
                    <td>5.2</td>
                    <td>4.5 - 5.5</td>
                    <td>mill/cumm</td>
                  </tr>
                  <tr>
                    <td>
                      BLOOD INDICES
                      <br />
                      Packed Cell Volume (PCV)
                    </td>
                    <td className="text-danger">57.5</td>
                    <td>
                      <span className="text-muted">High</span> 40 - 50
                    </td>
                    <td>%</td>
                  </tr>
                  <tr>
                    <td>Mean Corpuscular Volume (MCV)</td>
                    <td>87.75</td>
                    <td>83 - 101</td>
                    <td>fL</td>
                  </tr>
                  <tr>
                    <td>MCH</td>
                    <td>27.2</td>
                    <td>27 - 32</td>
                    <td>pg</td>
                  </tr>
                  <tr>
                    <td>MCHC</td>
                    <td>32.8</td>
                    <td>32.5 - 34.5</td>
                    <td>g/dL</td>
                  </tr>
                  <tr>
                    <td>RDW</td>
                    <td>13.6</td>
                    <td>11.6 - 14.0</td>
                    <td>%</td>
                  </tr>
                  <tr>
                    <td>
                      WBC COUNT
                      <br />
                      Total WBC count
                    </td>
                    <td>9000</td>
                    <td>4000-11000</td>
                    <td>cumm</td>
                  </tr>
                  <tr>
                    <td colSpan="4">DIFFERENTIAL COUNT</td>
                  </tr>
                  <tr>
                    <td>Neutrophils</td>
                    <td>60</td>
                    <td>50 - 62</td>
                    <td>%</td>
                  </tr>
                  <tr>
                    <td>Lymphocytes</td>
                    <td>31</td>
                    <td>20 - 40</td>
                    <td>%</td>
                  </tr>
                  <tr>
                    <td>Eosinophils</td>
                    <td>1</td>
                    <td>00 - 06</td>
                    <td>%</td>
                  </tr>
                  <tr>
                    <td>Monocytes</td>
                    <td>7</td>
                    <td>00 - 10</td>
                    <td>%</td>
                  </tr>
                  <tr>
                    <td>Basophils</td>
                    <td>1</td>
                    <td>00 - 02</td>
                    <td>%</td>
                  </tr>
                  <tr>
                    <td colSpan="4">ABSOLUTE COUNT</td>
                  </tr>
                  <tr>
                    <td>Absolute Neutrophils</td>
                    <td>6000</td>
                    <td>1500 - 7500</td>
                    <td>cells/mcL</td>
                  </tr>
                  <tr>
                    <td>Absolute Lymphocytes</td>
                    <td>3100</td>
                    <td>1300 - 3500</td>
                    <td>cells/mcL</td>
                  </tr>
                  <tr>
                    <td>Absolute Eosinophils</td>
                    <td>100</td>
                    <td>00 - 500</td>
                    <td>cells/mcL</td>
                  </tr>
                  <tr>
                    <td>Absolute Monocytes</td>
                    <td>700</td>
                    <td>200 - 950</td>
                    <td>cells/mcL</td>
                  </tr>
                  <tr>
                    <td>Absolute Basophils</td>
                    <td>100</td>
                    <td>00 - 300</td>
                    <td>cells/mcL</td>
                  </tr>
                  <tr>
                    <td>
                      PLATELET COUNT
                      <br />
                      Platelet Count
                    </td>
                    <td>320000</td>
                    <td>150000 - 410000</td>
                    <td>cumm</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <small>
                Instruments: Fully automated cell counter - Mindray 300
              </small>
            </p>
          </div>
          <div className="card-footer bg-white border-top-0 text-center">
            <p className="mb-0">
              <small>***End of Report***</small>
            </p>
            <div className="row mt-3">
              <div className="col">
                <p className="mb-0">Medical Lab Technician</p>
                <p>
                  <small>(DMLT, BMLT)</small>
                </p>
              </div>
              <div className="col">
                <p className="mb-0">Dr. Payal Shah</p>
                <p>
                  <small>(MD, Pathologist)</small>
                </p>
              </div>
              <div className="col">
                <p className="mb-0">Dr. Vimal Shah</p>
                <p>
                  <small>(MD, Pathologist)</small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PersonalHealthTestReports;
