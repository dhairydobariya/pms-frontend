import React, { useEffect, useRef, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import DoctorSidebar from "../../../components/DoctorSidebar/DoctorSidebar";
import "./DoctorAppointmentTimeSlot.scss";

const DoctorAppointmentTimeSlot = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date("2022-06-18"));
  const [weekDays, setWeekDays] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editNote, setEditNote] = useState("");
  const [editTime, setEditTime] = useState("");
  const sidebarRef = useRef(null);

  const timeSlots = [
    "08 AM",
    "09 AM",
    "10 AM",
    "11 AM",
    "12 PM",
    "01 PM",
    "02 PM",
    "03 PM",
    "04 PM",
    "05 PM",
  ];

  const times = [
    "08:00 AM - 09:00 AM",
    "09:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM",
    "12:00 PM - 01:00 PM",
    "01:00 PM - 02:00 PM",
    "02:00 PM - 03:00 PM",
    "03:00 PM - 04:00 PM",
    "04:00 PM - 05:00 PM",
  ];

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

  useEffect(() => {
    updateWeekDays();
  }, [currentDate]);

  const updateWeekDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(currentDate);
      day.setDate(currentDate.getDate() + i);
      days.push(formatDate(day));
    }
    setWeekDays(days);
  };

  const formatDate = (date) => {
    const options = { weekday: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const handlePrevWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  const handleNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  const handleTimeSlotClick = (day, time) => {
    setSelectedDate(day);
    setSelectedTime(time);
    setShowModal(true);
  };

  const getDateRange = () => {
    const endDate = new Date(currentDate);
    endDate.setDate(currentDate.getDate() + 6);
    return `${formatDate(currentDate)} - ${formatDate(endDate)}`;
  };

  const isTimeSlotAvailable = (day, time) => {
    return day === weekDays[2] && time === "11 AM";
  };

  const handleCloseModal = () => setShowModal(false);

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

  const handleEditClick = () => {
    setShowEditModal(true);
    setShowModal(false);
    setEditTime(selectedTime);
    setEditNote(
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever"
    );
  };

  const handleEditClose = () => {
    setShowEditModal(false);
  };

  const handleEditSave = () => {
    // Handle saving the edited appointment
    console.log("Saving edited appointment:", {
      time: editTime,
      note: editNote,
    });
    setShowEditModal(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
    setShowModal(false);
  };

  const handleDeleteClose = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteConfirm = () => {
    // Handle deleting the time slot
    console.log("Deleting time slot:", selectedDate, selectedTime);
    setShowDeleteModal(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

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
                      Appointment Booking
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Appointment Time Slot
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
        <div className="container-fluid doctor-appointmenttime-page py-4">
          <h4 className="doctor-appointmenttime-title">
            Appointment Time Slot
          </h4>
          <div className="doctor-schedule-table">
            <div className="d-flex justify-content-center align-items-center mb-3 date-selection">
              <Button variant="link" onClick={handlePrevWeek}>
                <img
                  src="/assets/images/left-arrow.svg"
                  alt="left-arrow"
                  className="left-arrow img-fluid"
                />
              </Button>
              <span>{getDateRange()}</span>
              <Button variant="link" onClick={handleNextWeek}>
                <img
                  src="/assets/images/right-arrow.svg"
                  alt="right-arrow"
                  className="right-arrow img-fluid"
                />
              </Button>
            </div>

            {/* Calendar Table */}
            <div className="table-responsive calendar-container">
              <table className="table calendar-table">
                <thead>
                  <tr>
                    <th className="text-blue">Time</th>
                    {weekDays.map((day) => (
                      <th
                        key={day}
                        className={`${
                          day === selectedDate ? "text-blue-head" : ""
                        }`}
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((time) => (
                    <tr key={time}>
                      <td className="text-blue">{time}</td>
                      {weekDays.map((day) => (
                        <td key={`${day}-${time}`} className="time-slot">
                          {isTimeSlotAvailable(day, time) ? (
                            <Button
                              variant="primary"
                              style={{
                                backgroundColor: "#0EABEB",
                                borderColor: "#0EABEB",
                              }}
                              onClick={() => handleTimeSlotClick(day, time)}
                            >
                              Available
                            </Button>
                          ) : (
                            <span className="unavailable">Not Available</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Appointment Modal */}
          <Modal
            centered
            show={showModal}
            onHide={handleCloseModal}
            className="doctor-custom-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title>Not Available</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <div className="d-flex align-items-center appo-date">
                  <img
                    src="/assets/images/clock-gray.svg"
                    alt="clock-gray"
                    className="img-fluid me-3"
                  />
                  <span>Monday,18 June,2022 09:00 AM - 10:00 AM</span>
                </div>
                {/* Appointment Time */}
                <div className="d-flex align-items-center appo-date mb-0">
                  <img
                    src="/assets/images/available-note.svg"
                    alt="available-note"
                    className="img-fluid me-3"
                  />
                  <span>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever
                  </span>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                type="submit"
                onClick={handleEditClick}
                className="edit-btn"
              >
                Edit
              </Button>
              <Button onClick={handleDeleteClick} className="cancel-btn">
                Delete
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Edit Modal */}
          <Modal
            centered
            show={showEditModal}
            onHide={handleEditClose}
            className="doctor-edit-modal"
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Slot</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3 form-floating">
                  <Form.Select
                    value={editTime}
                    onChange={(e) => setEditTime(e.target.value)}
                  >
                    {times.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </Form.Select>
                  <label className="form-label">Select Time</label>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Add Note</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={editNote}
                    onChange={(e) => setEditNote(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button className="cancel-btn" onClick={handleEditClose}>
                Cancel
              </button>
              <button
                type="submit"
                className="save-btn"
                onClick={handleEditSave}
              >
                Save
              </button>
            </Modal.Footer>
          </Modal>

          {/* Delete Confirmation Modal */}
      <Modal
        centered
        show={showDeleteModal}
        onHide={handleDeleteClose}
        className="doctor-delete-modal"
      >
        <div className="red-bg"></div>
        <Modal.Body className="text-center">
          <div className="delete-icon mb-3">
            <img src="/assets/images/trash.svg" alt="trash" className="tmg-fluid" />
          </div>
          <h4>Delete Time Slot ?</h4>
          <p>This slot is to be deleted ?</p>
          <div className="d-flex justify-content-center mt-4">
            <Button variant="secondary" onClick={handleDeleteClose} className="cancel-btn me-2">
              No
            </Button>
            <Button variant="primary" onClick={handleDeleteConfirm} className="save-btn">
              Yes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointmentTimeSlot;
