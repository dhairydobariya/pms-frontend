import React, { useEffect, useRef, useState } from "react";
import { Dropdown, Tab, Tabs } from "react-bootstrap";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import "./PatientManagement.scss";
import PatientDetailsModal from "../../../components/modals/PatientDetailsModal/PatientDetailsModal";
import axios from 'axios';
import toast from "react-hot-toast";


const allAppointments = {
  today: [],
  upcoming: [],
  previous: [],
  canceled: [],
};

const PatientManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("today");
  const [searchTerms, setSearchTerms] = useState({
    today: "",
    upcoming: "",
    previous: "",
    canceled: "",
  });
  const [appointmentsData, setAppointmentsData] = useState(allAppointments); // Initialize with allAppointments
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAppointments, setFilteredAppointments] = useState({
    today: [],
    upcoming: [],
    previous: [],
    canceled: [],
  });

  // Fetch today's appointments
  const fetchTodayAppointments = async () => {
    try {
      const adminId = localStorage.getItem("adminId");
      if (!adminId) {
        console.error("Admin ID is not found in localStorage");
        return;
      }

      const todayResponse = await axios.get(
        "http://localhost:9500/v1/dashboard-adminFlow/appointement-today",
        { params: { adminId: adminId } }
      );

      console.log(todayResponse.data, "Full response from today's API");
      if (todayResponse.data.appointments && todayResponse.data.appointments.length > 0) {
        const todayAppointments = todayResponse.data.appointments.map(appointment => ({
          id: appointment._id,
          // patientName: `${appointment.patientId.first_name} ${appointment.patientId.last_name}`,
          patientIssue: appointment.patient_issue,
          doctorName: appointment.doctorId.firstName,
          diseaseName: appointment.diseas_name,
          appointmentTime: appointment.startTime,
          appointmentType: appointment.appointmentType,
          appointmentDate: appointment.app_date,
          profilePicture: "/path/to/default/profile/pic.jpg" // Modify accordingly
        }));

        setAppointmentsData(prevData => ({
          ...prevData,
          today: todayAppointments,
        }));
      } else {
        console.error("No today's appointments found in response.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching today's appointments");
      console.error("Error fetching today's appointments:", error);
    }
  };

  // Fetch upcoming appointments
  const fetchUpcomingAppointments = async () => {
    try {
      const adminId = localStorage.getItem("adminId");
      if (!adminId) {
        console.error("Admin ID is not found in localStorage");
        return;
      }

      const upcomingResponse = await axios.get(
        "http://localhost:9500/v1/dashboard-adminFlow/appointement-upcomming",
        { params: { adminId: adminId } }
      );

      console.log(upcomingResponse.data, "Full response from upcoming API");
      if (upcomingResponse.data.appointments && upcomingResponse.data.appointments.length > 0) {
        const upcomingAppointments = upcomingResponse.data.appointments.map(appointment => ({
          id: appointment._id,
          // patientName: `${appointment.patientId.first_name} ${appointment.patientId.last_name}`,
          patientIssue: appointment.patient_issue,
          doctorName: appointment.doctorId.firstName,
          diseaseName: appointment.diseas_name,
          appointmentTime: appointment.startTime,
          appointmentType: appointment.appointmentType,
          appointmentDate: appointment.app_date,
          profilePicture: "/path/to/default/profile/pic.jpg" // Modify accordingly
        }));

        setAppointmentsData(prevData => ({
          ...prevData,
          upcoming: upcomingAppointments,
        }));
      } else {
        console.error("No upcoming appointments found in response.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching upcoming appointments");
      console.error("Error fetching upcoming appointments:", error);
    }
  };

  // Fetch previous appointments
  const fetchPreviousAppointments = async () => {
    try {
      const adminId = localStorage.getItem("adminId");
      if (!adminId) {
        console.error("Admin ID is not found in localStorage");
        return;
      }

      const previousResponse = await axios.get(
        "http://localhost:9500/v1/dashboard-adminFlow/appointement-previous",
        { params: { adminId: adminId } }
      );

      console.log(previousResponse.data, "Full response from previous appointments API");
      if (previousResponse.data.appointments && previousResponse.data.appointments.length > 0) {
        const previousAppointments = previousResponse.data.appointments.map(appointment => ({
          id: appointment._id,
          // patientName: `${appointment.patientId.first_name} ${appointment.patientId.last_name}`,
          patientIssue: appointment.patient_issue,
          doctorName: appointment.doctorId.firstName,
          diseaseName: appointment.diseas_name,
          appointmentTime: appointment.startTime,
          appointmentType: appointment.appointmentType,
          appointmentDate: appointment.app_date,
          profilePicture: "/path/to/default/profile/pic.jpg" // Modify accordingly
        }));

        setAppointmentsData(prevData => ({
          ...prevData,
          previous: previousAppointments,
        }));
      } else {
        console.error("No previous appointments found in response.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching previous appointments");
      console.error("Error fetching previous appointments:", error);
    }
  };

  // Fetch canceled appointments
  const fetchCanceledAppointments = async () => {
    try {
      const adminId = localStorage.getItem("adminId");
      if (!adminId) {
        console.error("Admin ID is not found in localStorage");
        return;
      }

      const canceledResponse = await axios.get(
        "http://localhost:9500/v1/dashboard-adminFlow/appointement-cancel",
        { params: { adminId: adminId } }
      );

      console.log(canceledResponse.data, "Full response from canceled appointments API");
      if (canceledResponse.data.appointments && canceledResponse.data.appointments.length > 0) {
        const canceledAppointments = canceledResponse.data.appointments.map(appointment => ({
          id: appointment._id,
          // patientName: `${appointment.patientId.first_name} ${appointment.patientId.last_name}`,
          patientIssue: appointment.patient_issue,
          doctorName: appointment.doctorId.firstName,
          diseaseName: appointment.diseas_name,
          appointmentTime: appointment.startTime,
          appointmentType: appointment.appointmentType,
          appointmentDate: appointment.app_date,
          profilePicture: "/path/to/default/profile/pic.jpg" // Modify accordingly
        }));

        setAppointmentsData(prevData => ({
          ...prevData,
          canceled: canceledAppointments,
        }));
      } else {
        console.error("No canceled appointments found in response.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Error fetching canceled appointments");
      console.error("Error fetching canceled appointments:", error);
    }
  };

   // Handle tab change
   const handleTabSelect = (tab) => {
    setActiveTab(tab);
    switch (tab) {
      case 'today':
        fetchTodayAppointments();
        break;
      case 'upcoming':
        fetchUpcomingAppointments();
        break;
      case 'previous':
        fetchPreviousAppointments();
        break;
      case 'canceled':
        fetchCanceledAppointments();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    fetchTodayAppointments(); // Fetch today's appointments by default on initial load
  }, []);



  

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
 

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
  const [doctors, setDoctors] = useState([]);
  
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

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  const handleSearchChange = (e, tab) => {
    setSearchTerms((prevTerms) => ({
      ...prevTerms,
      [tab]: e.target.value,
    }));
  };

  const getFilteredAppointments = (appointments, searchTerm) => {
    return appointments.filter(
      (appointment) =>
        appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.patientIssue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.diseaseName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const renderAppointmentTable = (appointments, searchTerm) => {
    const filteredAppointments = appointments.filter(
      appointment =>
        appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.patientIssue.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.diseaseName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filteredAppointments.length === 0) {
      return (
        <div className="text-center py-5">
          <img
            src="/assets/images/no-today-appointment.png"
            alt="No appointments"
            className="mb-3 img-fluid"
          />
        </div>
      );
    }
  
    return (
      <div className="table-responsive">
        <table className="table today-patient_management-table table-hover">
          <thead>
            <tr>
            <th>Image</th>
              <th>Patient Name</th>
              <th>Patient Issue</th>
              <th>Doctor Name</th>
              <th>Diseases Name</th>
              <th>Appointment Time</th>
              <th>Appointment Type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment, index) => (
              <tr key={appointment.id}>
                <td>
                  <img
                    src={appointment.profilePicture}
                    // alt={appointment.patientName}
                    className="me-3 img-fluid profile_img"
                  />
                </td>
                  <td>{appointment.patientName}</td>
                <td>{appointment.patientIssue}</td>
                <td>{appointment.doctorName}</td>
                <td>{appointment.diseaseName}</td>
                <td>{appointment.appointmentTime}</td>
                <td className="text-center patient_management-badge">
                  <span className={`badge badge-${appointment.appointmentType === "Online" ? "warning" : "primary"}`}>
                    {appointment.appointmentType}
                  </span>
                </td>
                <td>
                  <button
                    className="bg-transparent"
                    onClick={() => handleViewPatient(appointment)}
                  >
                    <img
                      src="/assets/images/view-icon-box.svg"
                      alt="view-icon-box"
                      className="img-fluid"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
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
                    <li className="breadcrumb-item active" aria-current="page">
                      Patient Management
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
                      <Dropdown.Item>All</Dropdown.Item>
                      <Dropdown.Item>Doctor</Dropdown.Item>
                      <Dropdown.Item>Patient</Dropdown.Item>
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
        <div className="container-fluid patient_management_page py-4">
        <Tabs activeKey={activeTab} onSelect={handleTabSelect} className="mb-3">
        {['today', 'upcoming', 'previous', 'canceled'].map(tab => (
          <Tab eventKey={tab} title={tab.charAt(0).toUpperCase() + tab.slice(1) + ' Appointment'} key={tab}>
            <div className="d-flex flex-lg-row flex-column justify-content-between align-items-center mb-3">
              <h2 className="patient_management-title">{tab.charAt(0).toUpperCase() + tab.slice(1)} Appointment</h2>
              <div className="patient_management-search-container">
                <input
                  type="text"
                  placeholder="Search Patient"
                  value={searchTerms[tab]}
                  onChange={(e) => handleSearchChange(e, tab)}
                  className="form-control"
                />
                <img
                  src="/assets/images/search.svg"
                  alt="search"
                  className="search-icon"
                />
              </div>
            </div>
            {renderAppointmentTable(appointmentsData[tab], searchTerms[tab])}
          </Tab>
        ))}
      </Tabs>
      <PatientDetailsModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        patient={selectedPatient}
      />
        </div>
      </div>
      <PatientDetailsModal
        open={isModalOpen}
        handleClose={handleCloseModal}
        patient={selectedPatient}
      />
    </div>
  );
};

export default PatientManagement;