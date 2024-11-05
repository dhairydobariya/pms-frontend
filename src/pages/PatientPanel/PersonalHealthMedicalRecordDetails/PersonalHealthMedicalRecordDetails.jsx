import React, { useEffect, useRef, useState } from "react";
import { Dropdown, Tab, Tabs } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "./PersonalHealthMedicalRecordDetails.scss";
import PatientSidebar from "../../../components/PatientSidebar/PatientSidebar";
import MedicalForm from "../../../components/MedicalForm/MedicalForm";
import PrescriptionForm from "../../../components/PrescriptionForm/PrescriptionForm";

const PersonalHealthMedicalRecordDetails = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("AllAppointment");
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

  const appointments = [
    {
      type: "Online",
      hospitalname: "Shamuba Hospital",
      doctorspeciality: "MBBS",
      name: "Dr. Ryan Vetrovs",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      type: "Online",
      hospitalname: "Shamuba Hospital",
      doctorspeciality: "MBBS",
      name: "Dr. Marcus Septimus",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      type: "Online",
      hospitalname: "Shamuba Hospital",
      doctorspeciality: "MBBS",
      name: "Dr. Alfonso Dokidis",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      type: "Online",
      hospitalname: "Shamuba Hospital",
      doctorspeciality: "MBBS",
      name: "Dr. Davis Korsgaard",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      type: "Online",
      hospitalname: "Shamuba Hospital",
      doctorspeciality: "MBBS",
      name: "Dr. Ryan Botosh",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      type: "Online",
      hospitalname: "Shamuba Hospital",
      doctorspeciality: "MBBS",
      name: "Dr. Nolan Dias",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      type: "Online",
      hospitalname: "Shamuba Hospital",
      doctorspeciality: "MBBS",
      name: "Dr. Ahmad Arcand",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      type: "Online",
      hospitalname: "Shamuba Hospital",
      doctorspeciality: "MBBS",
      name: "Dr. Wilson Arcand",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      type: "Online",
      hospitalname: "Shamuba Hospital",
      doctorspeciality: "MBBS",
      name: "Dr. Jaylon Korsgaard",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      type: "Online",
      hospitalname: "Shamuba Hospital",
      doctorspeciality: "MBBS",
      name: "Dr. Abram Stanton",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      type: "Online",
      hospitalname: "Shamuba Hospital",
      doctorspeciality: "MBBS",
      name: "Dr. James Saris",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
    {
      type: "Online",
      hospitalname: "Shamuba Hospital",
      doctorspeciality: "MBBS",
      name: "Dr. Leo Lipshutz",
      issue: "Feeling Tired",
      disease: "Viral Infection",
      date: "2 Jan, 2022",
      time: "10:10 AM",
    },
  ];

  const renderAppointmentCard = (appointment) => (
    <div className="appointment-card">
      <div className="d-flex align-items-center justify-content-between">
        <h3>{appointment.name}</h3>
      </div>
      <div className="appointment-card-details">
        <div className="row">
          <div className="col-6">
            <p className="appo-card-details-title">Hospital Name</p>
            <p className="appo-card-details-title">Appointment Type</p>
            <p className="appo-card-details-title">Appointment Date</p>
            <p className="appo-card-details-title">Appointment Time</p>
            <p className="appo-card-details-title">Patient Issue</p>
            <p className="appo-card-details-title">Disease Name</p>
          </div>
          <div className="col-6 text-end">
            <p>{appointment.hospitalname}</p>
            <p className="appo-card-details-type">{appointment.type}</p>
            <p>{appointment.date}</p>
            <p>{appointment.time}</p>
            <p>{appointment.issue}</p>
            <p>{appointment.disease}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAppointmentList = () => (
    <div className="appointment-list">
      <div className="row">
        {appointments.map((appointment, index) => (
          <div className="col-lg-3 col-md-6 col-12 mb-4" key={index}>
            {renderAppointmentCard(appointment)}
          </div>
        ))}
      </div>
    </div>
  );

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

  const handleTabSelect = (key) => {
    setActiveTab(key);
  };

  const getBreadcrumbTitle = () => {
    switch (activeTab) {
      case "AllAppointment":
        return "All Appointment";
      case "AllDocument":
        return "All Document";
      case "AllPrescription":
        return "All Prescription";
      case "AllDescription":
        return "All Description";
      default:
        return "All Appointment";
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
                    <li className="breadcrumb-item" aria-current="page">
                      Medical History
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                    {getBreadcrumbTitle()}
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
        <div className="container-fluid personal_medical_details-page py-4">
          <Tabs
            defaultActiveKey="AllAppointment"
            id="uncontrolled-tab-example"
            className="mb-3"
            onSelect={handleTabSelect}
          >
            <Tab eventKey="AllAppointment" title="All Appointment">
              {renderAppointmentList()}
            </Tab>
            <Tab eventKey="allDocument" title="All Document">
              {renderDocuments()}
            </Tab>
            <Tab eventKey="allPrescription" title="All Prescription">
              {renderPrescriptions()}
            </Tab>
            <Tab eventKey="description" title="All Description">
              {renderDescriptions()}
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PersonalHealthMedicalRecordDetails;
