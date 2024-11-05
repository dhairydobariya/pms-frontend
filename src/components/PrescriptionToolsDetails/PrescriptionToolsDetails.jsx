import React, { useEffect, useRef, useState } from "react";
import "./PrescriptionToolsDetails.scss";
import { useLocation, useNavigate } from "react-router-dom";
import DoctorSidebar from "../DoctorSidebar/DoctorSidebar";
import { Button, Dropdown, Tab, Tabs, Form } from "react-bootstrap";
import MedicalForm from "../MedicalForm/MedicalForm";
import PrescriptionForm from "../PrescriptionForm/PrescriptionForm";

const PrescriptionToolsDetails = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("allDocument");
  const [documents, setDocuments] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
  ]);
  const [prescriptions, setPrescriptions] = useState([
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
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


  const patientInfo = {
    name: "Marcus Philips",
    number: "99130 44537",
    issue: "Feeling tired",
    gender: "Male",
    lastAppointmentDate: "2 Jan, 2022",
    doctorName: "Dr. Marcus Philips",
    age: "20 Years",
    appointmentType: "Online",
    address: "B-408 Swastik society, mota varachha rajkot.",
    lastAppointmentTime: "4:30 PM",
  };

  const renderDocuments = () => {
    return (
      <div className="documents-container">
        {documents.length === 0 ? (
          <div className="no-data-found">
            <img src="/assets/images/no_data_found.png" alt="No Data Found" />
          </div>
        ) : (
          <>
            <div className="row">
              {documents.map((doc, index) => (
                <div className="col-xl-3 col-lg-4 col-md-6 col-12" key={index}>
                  <MedicalForm key={doc.id} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  const renderPrescriptions = () => {
    return (
      <div className="prescriptions-container">
        {prescriptions.length === 0 ? (
          <div className="no-data-found">
            <img src="/assets/images/no_data_found.png" alt="No Data Found" />
          </div>
        ) : (
          <>
            <div className="text-end">
              {activeTab === "allPrescription" && (
                <button type="button" className="create-prescription-btn">
                  Create Prescription
                </button>
              )}
            </div>
            <div className="row">
              {prescriptions.map((prescription, index) => (
                <div className="col-xl-3 col-lg-4 col-md-6 col-12" key={index}>
                  <PrescriptionForm key={prescription.id} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    );
  };

  const renderDescriptions = () => {
    const descriptions = [
      { 
        date: '2 Jan, 2022', 
        content: [
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages",
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors",
        ]
      },
      { 
        date: '12 Jan, 2022', 
        content: [
         "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages",
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors",
        ]
      },
      { 
        date: '10 Jan, 2022', 
        content: [
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages",
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors",
        ]
      },
      { 
        date: '20 Jan, 2022', 
        content: [
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting,remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages",
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors",
        ]
      },
    ];

    return (
      <div className="descriptions-container">
        <div className="row">
          {descriptions.map((description, index) => (
            <div className="col-xl-3 col-lg-4 col-md-6 col-12" key={index}>
              <div className="description-item">
                <h4 className="description-date">
                  Description Date <div className="text-end">{description.date}</div>
                </h4>
                {description.content.map((paragraph, pIndex) => (
                <p className="description-content" key={pIndex}>{paragraph}</p>
              ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="d-flex">
      <div className="w-15 w-md-0">
        <DoctorSidebar
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
                      Prescription Tools
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Create
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
        <div className="container-fluid doctor-prescription-create-detials-page py-4">
          <div className="mb-4">
            <h1 className="patient-details-title">Patient Details</h1>
          </div>
          <div className="patient-info-card mb-4">
            <div className="row">
              <div className="col-md-2">
                <img
                  src="/assets/images/patient_image.png"
                  alt={patientInfo.name}
                  className="patient-image img-fluid rounded-circle"
                />
              </div>
              <div className="col-md-10">
                <div className="row">
                  <div className="col-md-2 col-6 mt-md-0 mt-2">
                    <p className="info-label">Patient Name</p>
                    <p className="info-value">{patientInfo.name}</p>
                  </div>
                  <div className="col-md-2 col-6 mt-md-0 mt-2">
                    <p className="info-label">Patient Number</p>
                    <p className="info-value">{patientInfo.number}</p>
                  </div>
                  <div className="col-md-2 col-6 mt-md-0 mt-2">
                    <p className="info-label">Patient Issue</p>
                    <p className="info-value">{patientInfo.issue}</p>
                  </div>
                  <div className="col-md-4 col-6 mt-md-0 mt-2">
                    <p className="info-label">Patient Gender</p>
                    <p className="info-value">{patientInfo.gender}</p>
                  </div>
                  <div className="col-md-2 col-6 mt-md-0 mt-2">
                    <p className="info-label">Last Appointment Date</p>
                    <p className="info-value">
                      {patientInfo.lastAppointmentDate}
                    </p>
                  </div>
                  <div className="col-md-2 col-6 mt-md-3 mt-2">
                    <p className="info-label">Doctor Name</p>
                    <p className="info-value">{patientInfo.doctorName}</p>
                  </div>
                  <div className="col-md-2 col-6 mt-md-3 mt-2">
                    <p className="info-label">Patient Age</p>
                    <p className="info-value">{patientInfo.age}</p>
                  </div>
                  <div className="col-md-2 col-6 mt-md-3 mt-2">
                    <p className="info-label">Appointment Type</p>
                    <p className="info-value">{patientInfo.appointmentType}</p>
                  </div>
                  <div className="col-md-4 col-6 mt-md-3 mt-2">
                    <p className="info-label">Patient Address</p>
                    <p className="info-value">{patientInfo.address}</p>
                  </div>
                  <div className="col-md-2 col-6 mt-md-3 mt-2">
                    <p className="info-label">Last Appointment Time</p>
                    <p className="info-value">
                      {patientInfo.lastAppointmentTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="custom-tabs"
          >
            <Tab eventKey="allDocument" title="All Document">
              {renderDocuments()}
            </Tab>
            <Tab eventKey="allPrescription" title="All Prescription">
              {renderPrescriptions()}
            </Tab>
            <Tab eventKey="description" title="Description">
              {renderDescriptions()}
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionToolsDetails;
