import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import DeleteDoctorModal from "../../../components/modals/DeleteDoctorModal";
import DoctorDetailsDrawer from "../../../components/Drawer/DoctorDetailsDrawer";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import axios from "axios";
import "./DoctorManagement.scss";

const DoctorManagement = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
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

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const handleDeleteClick = (doctor) => {
    setSelectedDoctor(doctor);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDeleteDoctor = async () => {
    const token = localStorage.getItem("token");
    const adminId = localStorage.getItem("adminId");
    if (selectedDoctor) {
      try {
        await axios.delete(
          `http://localhost:9500/v1/admin/delete-doc-by-admin`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
            data: { doctorId: selectedDoctor._id, adminid: adminId },
          }
        );
        setDoctors(
          doctors.filter((doctor) => doctor._id !== selectedDoctor._id)
        );
        setFilteredDoctors(
          filteredDoctors.filter((doctor) => doctor._id !== selectedDoctor._id)
        );
        setOpenDeleteModal(false);
      } catch (error) {
        console.error("Error deleting doctor:", error);
      }
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9500/v1/doctor/getAlldoctors"
      );
      setDoctors(response.data.data);
      setFilteredDoctors(response.data.searchResults);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  // Search doctors based on the search term
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchTerm) {
        // Perform search only when there's a search term
        const token = localStorage.getItem("token");
        axios
          .get(
            `http://localhost:9500/v1/dashboard-admin/search-doctor-and-patient-list?query=${searchTerm}`,
            {
              headers: {
                Authorization: `Bearer ${token}`, // Include the token in the headers
              },
            }
          )
          .then((response) => setFilteredDoctors(response.data.searchResults))
          .catch((error) => console.error("Error searching doctors:", error));
      } else {
        // Reset to all doctors if search term is cleared
        setFilteredDoctors(doctors);
      }
    }, 300); // 300 ms delay

    return () => clearTimeout(delaySearch); // Cleanup delay on each change
  }, [searchTerm, doctors]);

  const fetchDoctorDetails = async (doctorId) => {
    try {
      const token = localStorage.getItem("token");
      const adminId = localStorage.getItem("adminId");
  
      const response = await axios.post(
        `http://localhost:9500/v1/dashboard-adminFlow/doctor-list-id`,
        {
          adminId: adminId,
          doctorId: doctorId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the headers
          },
        }
      );
  
      setSelectedDoctor(response.data.doctor); // Set the fetched data as the selected doctor
      setDrawerOpen(true); // Open the drawer
    } catch (error) {
      console.error("Error fetching doctor details:", error);
    }
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
                      Doctor Management
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
                          <button
                            className="close-btn"
                            onClick={clearNotifications}
                          >
                            &times;
                          </button>
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
                        <button
                          className="close-btn"
                          onClick={clearNotifications}
                        >
                          &times;
                        </button>
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
        <div className="container-fluid doctor_management_page py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="doctor_management-title">Doctor Management</h2>
            <div className="d-flex align-items-center">
              <div className="doctor_management_search-container me-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Doctor"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <img
                  src="/assets/images/search.svg"
                  alt="search"
                  className="search-icon"
                />
              </div>
              <button
                type="button"
                className="add-btn"
                onClick={() => navigate("/add-new-doctor")}
              >
                + Add New Doctor
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="table-responsive">
            {filteredDoctors?.length === 0 ? (
              <div className="text-center">
                <img
                  src="/assets/images/no-doctor-found-2.png"
                  alt="No Data Found"
                  className="img-fluid"
                />
              </div>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th className="rounded-end-0">Doctor Name</th>
                    <th className="rounded-end-0 rounded-start-0">Gender</th>
                    <th className="rounded-end-0 rounded-start-0">
                      Qualification
                    </th>
                    <th className="rounded-end-0 rounded-start-0">Specialty</th>
                    <th className="rounded-end-0 rounded-start-0">
                      Working Time
                    </th>
                    <th className="rounded-end-0 rounded-start-0">
                      Patient Check Up Time
                    </th>
                    <th className="rounded-end-0 rounded-start-0">
                      Break Time
                    </th>
                    <th className="rounded-start-0">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDoctors?.map((doctor, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={doctor.image}
                          alt={doctor.firstName}
                          className="me-3 img-fluid profile_img"
                        />
                        {doctor.firstName}
                      </td>
                      <td>
                        <img
                          src={`./assets/images/${doctor.gender}`}
                          alt={doctor.firstName}
                          style={{
                            width: "30px",
                            height: "30px",
                            marginRight: "10px",
                          }}
                          className="img-fluid"
                        />
                      </td>
                      <td>{doctor.qualification}</td>
                      <td>{doctor.specialistType}</td>
                      <td>
                        <div className="date-box">{doctor.workingTime}</div>
                      </td>
                      <td>
                        <div className="date-box">
                          {doctor.patientCheckUpTime}
                        </div>
                      </td>
                      <td>
                        <div className="date-box">{doctor.breakTime}</div>
                      </td>
                      <td className="d-flex">
                        <button
                          type="button"
                          className="edit-button me-3 bg-transparent"
                          onClick={() => navigate(`/edit-doctor/${doctor._id}`)}
                        >
                          <img
                            src="/assets/images/edit-icon-box.svg"
                            alt="edit-icon-box"
                            className="img-fluid"
                          />
                        </button>
                        <button
                          type="button"
                          className="view-button me-3 bg-transparent"
                          onClick={() => fetchDoctorDetails(doctor._id)}
                        >
                          <img
                            src="/assets/images/view-icon-box.svg"
                            alt="view-icon-box"
                            className="img-fluid"
                          />
                        </button>
                        <button
                          type="button"
                          className="delete-button bg-transparent"
                          onClick={() => handleDeleteClick(doctor)}
                        >
                          <img
                            src="/assets/images/delete-icon-box.svg"
                            alt="delete-icon-box"
                            className="img-fluid"
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      <DoctorDetailsDrawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        doctor={selectedDoctor}
      />
      <DeleteDoctorModal
        open={openDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleDeleteDoctor}
      />
    </div>
  );
};

export default DoctorManagement;
