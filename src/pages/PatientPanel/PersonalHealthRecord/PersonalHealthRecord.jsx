import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import PatientSidebar from "../../../components/PatientSidebar/PatientSidebar";
import "./PersonalHealthRecord.scss";
import axios from "axios";

const PersonalHealthRecord = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [hospitals, setHospitals] = useState([]);
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
    fetchHospitals();
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);


  const fetchHospitals = async () => {
    
    const jwt = localStorage.getItem("token"); // Retrieve JWT from localStorage
    if (!jwt) {
      console.error("No JWT token found in localStorage");
      return;
    }
  
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URLs}/patient/profile`,
        {
          headers: {
            Authorization: `Bearer ${jwt}`, // Add the JWT as a Bearer token
          },
        }
      );
      
      console.log("Hospital data:", response.data); // Log the response data
      setHospitals(response.data); // Adjust if data structure differs
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };
  
  


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

  const handleDetailsNavigation = () => {
    navigate("/patientDetailsEdit");
  }

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
                      Personal Health Record
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
        <div className="container-fluid personal-helth-record-container py-4">
          <div className="row">
            <div className="col-12">
              <div className="card patient-details-card mb-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title">Patient Details</h5>
                    <button className="edit-btn" onClick={handleDetailsNavigation}>
                      <img
                        src="/assets/images/edit.svg"
                        alt="edit"
                        className="img-fluid me-md-2 me-0"
                      />{" "}
                      <span>Edit Profile</span>
                    </button>
                  </div>
                  <div className="row">
                    <div className="col-md-2 col-sm-4 text-md-start text-center">
                      <img
                        src="/assets/images/patient_image.png"
                        alt="Marcus Philips"
                        className="img-fluid rounded-circle profile-img"
                      />
                    </div>
                    <div className="col-md-10 col-sm-8 mt-md-0 mt-3">
                      <div className="row patient-details-box">
                        <div className="col-md-3 col-6 mb-2">
                          <p>
                            <strong>Name</strong>  {hospitals.firstName + " " + hospitals.lastName}
                          </p>
                        </div>
                        <div className="col-md-3 col-6 mb-2">
                          <p>
                            <strong>Number</strong> {hospitals.phoneNumber}
                          </p>
                        </div>
                        <div className="col-md-3 col-6 mb-2">
                          <p>
                            <strong>Email</strong> {hospitals.email}
                          </p>
                        </div>
                        <div className="col-md-3 col-6 mb-2">
                          <p>
                            <strong>Gender</strong> {hospitals.gender}
                          </p>
                        </div>
                        <div className="col-md-3 col-6 mb-2">
                          <p>
                            <strong>DOB</strong>{hospitals.dateOfBirth}
                          </p>
                        </div>
                        <div className="col-md-3 col-6 mb-2">
                          <p>
                            <strong>Age</strong> {hospitals.age}
                          </p>
                        </div>
                        <div className="col-md-3 col-6 mb-2">
                          <p>
                            <strong>Blood Group</strong> {hospitals.bloodGroup}
                          </p>
                        </div>
                        <div className="col-md-3 col-6 mb-2">
                          <p>
                            <strong>Height (cm)</strong> {hospitals.height}
                          </p>
                        </div>
                        <div className="col-md-3 col-6 mb-2">
                          <p>
                            <strong>Weight (kg)</strong> { hospitals.weight}
                          </p>
                        </div>
                        <div className="col-md-3 col-6 mb-2">
                          <p>
                            <strong>Country</strong> {hospitals.address.country}
                          </p>
                        </div>
                        <div className="col-md-3 col-6 mb-2">
                          <p>
                            <strong>State</strong> {hospitals.address.state}
                          </p>
                        </div>
                        <div className="col-md-3 col-6 mb-2">
                          <p>
                            <strong>City</strong> {hospitals.address.city}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card medical-history-card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3 border-bottom">
                    <h5 className="card-title">Medical History</h5>
                    <Link to={"/personalHealthMedicalHistory"} className="record-link">
                      View All History
                    </Link>
                  </div>
                  <div className="row">
                    {[
                      "Dulce Schleifer",
                      "Dulce Workman",
                      "Miracle Septimus",
                    ].map((doctor, index) => (
                      <div key={index} className="col-md-4 mb-3">
                        <div className="card">
                          <div className="card-body">
                            <div className="medical-history-header">
                              <h6 className="card-subtitle">{doctor}</h6>
                              <p className="card-text">2 Jan, 2022</p>
                            </div>
                            <div className="meidcal-history-content-box">
                              <p className="card-content-text">Patient Issue</p>
                              <small className="card-content-disc">
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit.
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card prescriptions-card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3 border-bottom">
                    <h5 className="card-title">Prescriptions</h5>
                    <Link to={"/personalHealthRecordPrescription"} className="record-link">
                      View All Prescriptions
                    </Link>
                  </div>
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="rounded-end-0">Hospital Name</th>
                        <th className="rounded-0">Date</th>
                        <th className="rounded-0">Disease Name</th>
                        <th className="rounded-start-0 text-end">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          hospital: "Apollo Hospital",
                          date: "2 Jan 2022",
                          disease: "Cold and Flu",
                        },
                        {
                          hospital: "Medicore Hospital",
                          date: "2 Jan 2022",
                          disease: "Allergies",
                        },
                        {
                          hospital: "Maypal Hospital",
                          date: "2 Jan 2022",
                          disease: "Diarrhea",
                        },
                      ].map((prescription, index) => (
                        <tr key={index}>
                          <td>{prescription.hospital}</td>
                          <td>{prescription.date}</td>
                          <td>{prescription.disease}</td>
                          <td className="text-end">
                            <button type="button">
                              <img
                                src="/assets/images/eye-3.svg"
                                alt="eye-3"
                                className="img-fluid"
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 mb-4">
              <div className="card test-reports-card">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3 border-bottom">
                    <h5 className="card-title">Test Reports</h5>
                    <Link to={"/personalHealthTestReport"} className="record-link">
                      View All Reports
                    </Link>
                  </div>
                  <div className="row">
                    {[
                      {
                        name: "Dr. Marcus Philips",
                        disease: "Viral Infection",
                        date: "2 Jan, 2022",
                      },
                      {
                        name: "Dr. Ryan Carter",
                        disease: "Allergies",
                        date: "2 Jan, 2022",
                      },
                      {
                        name: "Dr. Zaire Saris",
                        disease: "Allergies",
                        date: "2 Jan, 2022",
                      },
                      {
                        name: "Dr. Jaxson Herwitz",
                        disease: "Allergies",
                        date: "2 Jan, 2022",
                      },
                    ].map((doctor, index) => (
                      <div key={index} className="col-md-6 mb-3">
                        <div className="card">
                          <div className="card-body">
                            <div className="d-flex align-items-start mb-2">
                              <img
                                src="/assets/images/Avatar-2.png"
                                alt={doctor.name}
                                className="rounded-circle me-2"
                                style={{ width: "40px", height: "40px" }}
                              />
                              <div>
                                <h6 className="card-subtitle mb-1">
                                  {doctor.name}
                                </h6>
                                <span className="card-date">{doctor.date}</span>
                              </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="card-text">
                                <small>Disease : </small>
                                {doctor.disease}
                              </p>
                              <span className="card-badge">Pathology Test</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-6 mb-4">
              <div className="card patient-status-card">
                <div className="card-body">
                  <h5 className="card-title mb-4 border-bottom">
                    Patient Status
                  </h5>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <div className="d-flex align-items-center mb-3">
                        <img
                          src="/assets/images/hospital.png"
                          alt="hospital"
                          className="img-fluid me-2"
                        />
                        <span>Shamuba Hospital</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center mb-3">
                        <img
                          src="/assets/images/doctor-icon.png"
                          alt="doctor-icon"
                          className="img-fluid me-2"
                        />
                        <span>Dr. Mathew Best</span>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <div className="d-flex align-items-center mb-3">
                        <img
                          src="/assets/images/checkup-icon.png"
                          alt="checkup-icon"
                          className="img-fluid me-2"
                        />
                        <span>2 Jan, 2022</span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="d-flex align-items-center">
                        <img
                          src="/assets/images/disece-icon.png"
                          alt="disece-icon"
                          className="img-fluid me-2"
                        />
                        <span>Chance Carter</span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="d-flex align-items-center">
                        <img
                          src="/assets/images/patient-des-icon.png"
                          alt="patient-des-icon"
                          className="img-fluid me-2"
                        />
                        <span>
                          It is a long established fact that a reader will be
                          distracted by the readable content of a page when
                          looking at its layout.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalHealthRecord;
