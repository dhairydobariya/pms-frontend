import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Dashboard.scss";
import Sidebar from "../../../components/Sidebar/Sidebar";
import PatientsSummary from "../../../components/PatientsSummary/PatientsSummary";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [timeFrame, setTimeFrame] = useState("year");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedTable, setSelectedTable] = useState("All");
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

  const navigate = useNavigate();

  const clearNotifications = () => {
    setNotifications([]); // Clear the notifications array
  };

  const sidebarRef = useRef(null);

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

  const yearData = [
    { name: "2001", patients: 28000 },
    { name: "2002", patients: 20000 },
    { name: "2003", patients: 30000 },
    { name: "2004", patients: 27000 },
    { name: "2005", patients: 18000 },
    { name: "2006", patients: 23000 },
    { name: "2007", patients: 34000 },
    { name: "2008", patients: 30000 },
    { name: "2009", patients: 25000 },
    { name: "2010", patients: 33000 },
  ];

  const monthData = [
    { name: "Jan", patients: 1000 },
    { name: "Feb", patients: 1200 },
    { name: "Mar", patients: 1100 },
    { name: "Apr", patients: 1300 },
    { name: "May", patients: 1400 },
    { name: "Jun", patients: 1200 },
    { name: "July", patients: 1500 },
    { name: "Aug", patients: 1800 },
    { name: "Sep", patients: 1700 },
    { name: "Oct", patients: 2000 },
    { name: "Nov", patients: 1900 },
    { name: "Dec", patients: 2200 },
  ];

  const weekData = [
    { name: "Mon", patients: 200 },
    { name: "Tue", patients: 250 },
    { name: "Wed", patients: 180 },
    { name: "Thu", patients: 220 },
    { name: "Fri", patients: 270 },
    { name: "Sat", patients: 150 },
    { name: "Sun", patients: 100 },
  ];

  const getChartData = () => {
    switch (timeFrame) {
      case "year":
        return yearData;
      case "month":
        return monthData;
      case "week":
        return weekData;
      default:
        return yearData;
    }
  };

  const handleCreateBill = () => {
    navigate("/billing/monitor-billing/createBill");
  }

  const doctorAppointments = [
    {
      icon: "Avatar.png",
      doctorName: "Dr. Titan Grant",
      gender: "male-gender.png",
      qualification: "MBBS",
      specialty: "Internal Medicine",
      workingTime: "6 Hour",
      patientCheckUpTime: "4 Hour",
      breakTime: "1 Hour",
    },
    {
      icon: "Avatar.png",
      doctorName: "Dr. Keenan Tucker",
      gender: "female-gender.png",
      qualification: "BDS",
      specialty: "Anesthesiology",
      workingTime: "5 Hour",
      patientCheckUpTime: "4 Hour",
      breakTime: "2 Hour",
    },
  ];

  const patientAppointments = [
    {
      icon: "Avatar.png",
      patientName: "Julianna Maddox",
      patientIssue: "Feeling Tired",
      doctorName: "Dr. Titan Grant",
      diseaseName: "Blood Pressure",
      appointmentTime: "5:00 AM",
      appointmentType: "Onsite",
    },
    {
      icon: "Avatar.png",
      patientName: "Julianna Mejia",
      patientIssue: "Fever",
      doctorName: "Dr. Keenan Tucker",
      diseaseName: "Viral Infection",
      appointmentTime: "4:30 PM",
      appointmentType: "Online",
    },
  ];

  const filterAppointments = (appointments) => {
    return appointments.filter((appointment) => {
      const matchesSearchQuery =
        appointment.doctorName
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      const matchesFilter =
        filter === "All" || appointment.appointmentType === filter;
      return matchesSearchQuery && matchesFilter;
    });
  };

  const filteredDoctorAppointments = filterAppointments(doctorAppointments);
  const filteredPatientAppointments = filterAppointments(patientAppointments);

  return (
    <>
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
                <div className="col-md-6 col-12 mb-lg-0 mb-3 mobile-screen">
                  <h3 className="user-name mb-0">Good Morning ! Martin</h3>
                  <p className="content">Hope you have a good day</p>
                </div>
                <div className="col-md-6 col-12 d-lg-flex d-block justify-content-lg-end">
                  <div className="d-lg-flex d-none search-container me-3 mt-lg-0 mt-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Quick Search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <img
                      src="/assets/images/search.svg"
                      alt="search"
                      className="search-icon"
                    />
                    <Dropdown className="me-3">
                      <Dropdown.Toggle variant="link" id="dropdown-all">
                      {selectedTable}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => setSelectedTable("All")}>
                          All
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => setSelectedTable("Doctor")}
                        >
                          Doctor
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => setSelectedTable("Patient")}
                        >
                          Patient
                        </Dropdown.Item>
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
                      <Dropdown.Item href="#/settings">Settings</Dropdown.Item>
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
                        <Dropdown.Item href="#/settings">
                          Settings
                        </Dropdown.Item>
                        <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="dashboard-main">
            <div className="container-fluid py-4">
              {searchQuery === "" ? (
                <>
                  <div className="row">
                    <div className="col-xl-7">
                      <div className="row">
                        <div className="col-md-4 col-sm-6 mb-4">
                          <div className="stat-card stat-card-1">
                            <img
                              src="./assets/images/total-patients.png"
                              alt="total-patients"
                              className="img-fluid"
                            />
                            <div className="d-flex flex-column">
                              <h3 className="mb-0">Total Patients</h3>
                              <p className="stat-number">1500</p>
                            </div>
                            <span className="line-1"></span>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-6 mb-4">
                          <div className="stat-card stat-card-2">
                            <img
                              src="./assets/images/total-doctors.png"
                              alt="total-doctors"
                              className="img-fluid"
                            />
                            <div className="d-flex flex-column">
                              <h3 className="mb-0">Total Doctors</h3>
                              <p className="stat-number">500</p>
                            </div>
                            <span className="line-2"></span>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-6 mb-4">
                          <div className="stat-card stat-card-3">
                            <img
                              src="./assets/images/todays-appo.png"
                              alt="todays-appo"
                              className="img-fluid"
                            />
                            <div className="d-flex flex-column">
                              <h3 className="mb-0">Today's Appointments</h3>
                              <p className="stat-number">1080</p>
                            </div>
                            <span className="line-3"></span>
                          </div>
                        </div>
                      </div>
                      <div className="card patients-card border-0">
                        <div className="card-body border-0">
                          <div className="d-flex align-items-center justify-content-between mb-4">
                            <h5 className="billing-title">
                              Patients Statistics
                            </h5>
                            <div
                              className="btn-group"
                              role="group"
                              aria-label="Basic example"
                            >
                              <button
                                type="button"
                                onClick={() => setTimeFrame("year")}
                                className={
                                  timeFrame === "year"
                                    ? "btn btn-primary"
                                    : "btn btn-outline-primary"
                                }
                              >
                                Year
                              </button>
                              <button
                                type="button"
                                onClick={() => setTimeFrame("month")}
                                className={
                                  timeFrame === "month"
                                    ? "btn btn-primary"
                                    : "btn btn-outline-primary"
                                }
                              >
                                Month
                              </button>
                              <button
                                type="button"
                                onClick={() => setTimeFrame("week")}
                                className={
                                  timeFrame === "week"
                                    ? "btn btn-primary"
                                    : "btn btn-outline-primary"
                                }
                              >
                                Week
                              </button>
                            </div>
                          </div>

                          <div
                            className="chart-container"
                            style={{ height: "300px" }}
                          >
                            <ResponsiveContainer width="100%" height="100%">
                              <LineChart data={getChartData()}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line
                                  type="monotone"
                                  dataKey="patients"
                                  stroke="#8884d8"
                                />
                              </LineChart>
                            </ResponsiveContainer>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-5 mt-lg-0 mt-4">
                      <div className="d-flex align-items-center justify-content-between mb-4">
                        <h3 className="billing-title">Billing & Payments</h3>
                        <button className="create-btn" onClick={handleCreateBill}>
                          <img
                            src="./assets/images/add.svg"
                            alt="add"
                            className="img-fluid me-2"
                          />
                          Create Bills
                        </button>
                      </div>
                      <div className="d-flex align-items-center mb-3">
                        <span className="circle"></span>
                        <p className="pending-text">Pending Bills: 50</p>
                      </div>
                      <div className="table-responsive">
                        <table className="table">
                          <thead className="text-center">
                            <tr>
                              <th>Bill No</th>
                              <th>Patient Name</th>
                              <th>Disease Name</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody className="text-center">
                            {[
                              {
                                billNo: 5654,
                                patientName: "Charlie Vaccaro",
                                disease: "Colds and Flu",
                                status: "Paid",
                              },
                              {
                                billNo: 5655,
                                patientName: "James George",
                                disease: "Conjunctivitis",
                                status: "Unpaid",
                              },
                              {
                                billNo: 5656,
                                patientName: "Craig Torff",
                                disease: "Allergies",
                                status: "Paid",
                              },
                              {
                                billNo: 5657,
                                patientName: "Chance Lipshutz",
                                disease: "Diarrhea",
                                status: "Unpaid",
                              },
                              {
                                billNo: 5658,
                                patientName: "Gustavo Saris",
                                disease: "Headaches",
                                status: "Paid",
                              },
                              {
                                billNo: 5659,
                                patientName: "Carter Bator",
                                disease: "Mononucleosis",
                                status: "Unpaid",
                              },
                              {
                                billNo: 5660,
                                patientName: "Kadin Schleifer",
                                disease: "Stomach Aches",
                                status: "Paid",
                              },
                            ].map((row, index) => (
                              <tr key={index} className="border-b">
                                <td className="bill-no py-3">{row.billNo}</td>
                                <td className="patient-name py-3">
                                  {row.patientName}
                                </td>
                                <td className="patient-name py-3">
                                  {row.disease}
                                </td>
                                <td
                                  className={`status-btn py-3 ${
                                    row.status === "Paid"
                                      ? "paid-btn"
                                      : "unpaid-btn"
                                  }`}
                                >
                                  <span>{row.status}</span>
                                </td>
                                <td className="action-btn py-3">
                                  <img
                                    src="./assets/images/eye-blue.svg"
                                    alt="eye-blue"
                                    className="img-fluid"
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-lg-0 mt-4">
                    <div className="col-xl-7 mb-4">
                      <div className="d-flex align-items-center justify-content-between">
                        <h5 className="billing-title">
                          Today's Appointments List
                        </h5>
                        <button className="view-btn" type="button">
                          View All
                        </button>
                      </div>
                      <div className="row">
                        <div className="col-lg-4 col-md-6 col-12">
                          <div className="appo-card">
                            <div className="d-flex align-items-center justify-content-between">
                              <h6 className="appo-title">Roger Lubin</h6>
                              <span className="onsite">Onsite</span>
                            </div>
                            <div className="appo-details">
                              <h5 className="appo-details-title">
                                Doctor Name
                              </h5>
                              <h6 className="appo-details-subtitle">
                                Leo Geidt
                              </h6>
                              <h5 className="appo-details-title mt-3">
                                Disease Name
                              </h5>
                              <h6 className="appo-details-subtitle">
                                Meningococcal Disease
                              </h6>
                              <h5 className="appo-details-title mt-3">
                                Appointment Time
                              </h5>
                              <h6 className="appo-details-subtitle">
                                10:00 AM
                              </h6>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                          <div className="appo-card">
                            <div className="d-flex align-items-center justify-content-between">
                              <h6 className="appo-title">Jakob Korsgaard</h6>
                              <span className="online">Online</span>
                            </div>
                            <div className="appo-details">
                              <h5 className="appo-details-title">
                                Doctor Name
                              </h5>
                              <h6 className="appo-details-subtitle">
                                Leo Geidt
                              </h6>
                              <h5 className="appo-details-title mt-3">
                                Disease Name
                              </h5>
                              <h6 className="appo-details-subtitle">
                                Meningococcal Disease
                              </h6>
                              <h5 className="appo-details-title mt-3">
                                Appointment Time
                              </h5>
                              <h6 className="appo-details-subtitle">
                                10:00 AM
                              </h6>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-12">
                          <div className="appo-card">
                            <div className="d-flex align-items-center justify-content-between">
                              <h6 className="appo-title">Roger Lubin</h6>
                              <span className="onsite">Onsite</span>
                            </div>
                            <div className="appo-details">
                              <h5 className="appo-details-title">
                                Doctor Name
                              </h5>
                              <h6 className="appo-details-subtitle">
                                Leo Geidt
                              </h6>
                              <h5 className="appo-details-title mt-3">
                                Disease Name
                              </h5>
                              <h6 className="appo-details-subtitle">
                                Meningococcal Disease
                              </h6>
                              <h5 className="appo-details-title mt-3">
                                Appointment Time
                              </h5>
                              <h6 className="appo-details-subtitle">
                                10:00 AM
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-5 mb-4">
                      <PatientsSummary />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {selectedTable === "All" && (
                    <>
                      <div className="search-table">
                        <h4 className="mb-3">Doctor</h4>
                        <div className="table-responsive">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th>Doctor Name</th>
                                <th>Gender</th>
                                <th>Qualification</th>
                                <th>Specialty</th>
                                <th className="text-center">
                                Working Time
                                </th>
                                <th className="text-center">
                                Patient Check Up Time
                                </th>
                                <th className="text-center">
                                Break Time
                                </th>
                                <th className="text-center">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredDoctorAppointments.length > 0 ? (
                                filteredDoctorAppointments.map(
                                  (appointment, index) => (
                                    <tr key={index}>
                                      <td>
                                        <img
                                          src={`./assets/images/${appointment.icon}`}
                                          alt={appointment.doctorName}
                                          style={{
                                            width: "30px",
                                            height: "30px",
                                            marginRight: "10px",
                                          }}
                                          className="img-fluid"
                                        />
                                        {appointment.doctorName}
                                      </td>
                                      <td><img
                                          src={`./assets/images/${appointment.gender}`}
                                          alt={appointment.doctorName}
                                          style={{
                                            width: "30px",
                                            height: "30px",
                                            marginRight: "10px",
                                          }}
                                          className="img-fluid"
                                        /></td>
                                      <td>{appointment.qualification}</td>
                                      <td>{appointment.specialty}</td>
                                      <td className="text-center appo-time">
                                        {appointment.workingTime}
                                      </td>
                                      <td className="text-center appo-time">
                                        {appointment.patientCheckUpTime}
                                      </td>
                                      <td className="text-center appo-time">
                                        {appointment.breakTime}
                                      </td>
                                      <td className="text-center">
                                        <img
                                          src="./assets/images/eye-blue.svg"
                                          alt="eye-blue"
                                          className="img-fluid"
                                        />
                                      </td>
                                    </tr>
                                  )
                                )
                              ) : (
                                <tr>
                                  <td colSpan="6">No appointments found</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>

                        <h4 className="mb-3 mt-3">Patient</h4>
                        <div className="table-responsive">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th>Patient Name</th>
                                <th>Patient Issue</th>
                                <th>Doctor Name</th>
                                <th>Dieses Name</th>
                                <th className="text-center">
                                  Appointment Time
                                </th>
                                <th className="text-center">
                                  Appointment Type
                                </th>
                                <th className="text-center">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredPatientAppointments.length > 0 ? (
                                filteredPatientAppointments.map(
                                  (appointment, index) => (
                                    <tr key={index}>
                                      <td>
                                        <img
                                          src={`./assets/images/${appointment.icon}`}
                                          alt={appointment.patientName}
                                          style={{
                                            width: "30px",
                                            height: "30px",
                                            marginRight: "10px",
                                          }}
                                          className="img-fluid"
                                        />
                                        {appointment.patientName}
                                      </td>
                                      <td>{appointment.patientIssue}</td>
                                      <td>{appointment.doctorName}</td>
                                      <td>{appointment.diseaseName}</td>
                                      <td className="text-center appo-time">
                                        {appointment.appointmentTime}
                                      </td>
                                      <td className="text-center appo-badge">
                                        <span
                                          className={`badge badge-${
                                            appointment.appointmentType ===
                                            "Onsite"
                                              ? "primary"
                                              : "warning"
                                          }`}
                                        >
                                          {appointment.appointmentType}
                                        </span>
                                      </td>
                                      <td className="text-center">
                                        <img
                                          src="./assets/images/eye-blue.svg"
                                          alt="eye-blue"
                                          className="img-fluid"
                                        />
                                      </td>
                                    </tr>
                                  )
                                )
                              ) : (
                                <tr>
                                  <td colSpan="6">No appointments found</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedTable === "Doctor" && (
                    <>
                      <div className="search-table">
                        <h4 className="mb-3">Search Results</h4>
                        <div className="table-responsive">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th>Doctor Name</th>
                                <th>Gender</th>
                                <th>Qualification</th>
                                <th>Specialty</th>
                                <th className="text-center">
                                Working Time
                                </th>
                                <th className="text-center">
                                Patient Check Up Time
                                </th>
                                <th className="text-center">
                                Break Time
                                </th>
                                <th className="text-center">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredDoctorAppointments.length > 0 ? (
                                filteredDoctorAppointments.map(
                                  (appointment, index) => (
                                    <tr key={index}>
                                      <td>
                                        <img
                                          src={`./assets/images/${appointment.icon}`}
                                          alt={appointment.doctorName}
                                          style={{
                                            width: "30px",
                                            height: "30px",
                                            marginRight: "10px",
                                          }}
                                          className="img-fluid"
                                        />
                                        {appointment.doctorName}
                                      </td>
                                      <td><img
                                          src={`./assets/images/${appointment.gender}`}
                                          alt={appointment.doctorName}
                                          style={{
                                            width: "30px",
                                            height: "30px",
                                            marginRight: "10px",
                                          }}
                                          className="img-fluid"
                                        /></td>
                                      <td>{appointment.qualification}</td>
                                      <td>{appointment.specialty}</td>
                                      <td className="text-center appo-time">
                                        {appointment.workingTime}
                                      </td>
                                      <td className="text-center appo-time">
                                        {appointment.patientCheckUpTime}
                                      </td>
                                      <td className="text-center appo-time">
                                        {appointment.breakTime}
                                      </td>
                                      <td className="text-center">
                                        <img
                                          src="./assets/images/eye-blue.svg"
                                          alt="eye-blue"
                                          className="img-fluid"
                                        />
                                      </td>
                                    </tr>
                                  )
                                )
                              ) : (
                                <tr>
                                  <td colSpan="6">No appointments found</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedTable === "Patient" && (
                    <>
                      <div className="search-table">
                        <h4 className="mb-3">Search Results</h4>
                        <div className="table-responsive">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th>Patient Name</th>
                                <th>Patient Issue</th>
                                <th>Doctor Name</th>
                                <th>Dieses Name</th>
                                <th className="text-center">
                                  Appointment Time
                                </th>
                                <th className="text-center">
                                  Appointment Type
                                </th>
                                <th className="text-center">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredPatientAppointments.length > 0 ? (
                                filteredPatientAppointments.map(
                                  (appointment, index) => (
                                    <tr key={index}>
                                      <td>
                                        <img
                                          src={`./assets/images/${appointment.icon}`}
                                          alt={appointment.patientName}
                                          style={{
                                            width: "30px",
                                            height: "30px",
                                            marginRight: "10px",
                                          }}
                                          className="img-fluid"
                                        />
                                        {appointment.patientName}
                                      </td>
                                      <td>{appointment.patientIssue}</td>
                                      <td>{appointment.doctorName}</td>
                                      <td>{appointment.diseaseName}</td>
                                      <td className="text-center appo-time">
                                        {appointment.appointmentTime}
                                      </td>
                                      <td className="text-center appo-badge">
                                        <span
                                          className={`badge badge-${
                                            appointment.appointmentType ===
                                            "Onsite"
                                              ? "primary"
                                              : "warning"
                                          }`}
                                        >
                                          {appointment.appointmentType}
                                        </span>
                                      </td>
                                      <td className="text-center">
                                        <img
                                          src="./assets/images/eye-blue.svg"
                                          alt="eye-blue"
                                          className="img-fluid"
                                        />
                                      </td>
                                    </tr>
                                  )
                                )
                              ) : (
                                <tr>
                                  <td colSpan="6">No appointments found</td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
