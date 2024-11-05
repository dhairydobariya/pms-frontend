import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, Dropdown, Tab, Tabs } from "react-bootstrap";
import PatientSidebar from "../../../components/PatientSidebar/PatientSidebar";
import "./PatientBills.scss";

const PatientBills = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

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

  const handleNavigation = () => {
    navigate("/billInvoice");
  };

  const handlePaidNavigation = () => {
    navigate("/paidBillInvoice");
  };

  const doctors = [
    {
      name: "Dr. Nolan George",
      hospitalname: "Shamuba Hospital",
      appointmentType: "Onsite",
      billCreatedTime: "10:20 AM",
      totalBillAmount: "₹ 24,668",
      billCreatedDate: "2 Jan, 2022",
    },
    {
      name: "Dr. Nolan George",
      hospitalname: "Shamuba Hospital",
      appointmentType: "Onsite",
      billCreatedTime: "10:20 AM",
      totalBillAmount: "₹ 24,668",
      billCreatedDate: "2 Jan, 2022",
    },
    {
      name: "Dr. Nolan George",
      hospitalname: "Shamuba Hospital",
      appointmentType: "Onsite",
      billCreatedTime: "10:20 AM",
      totalBillAmount: "₹ 24,668",
      billCreatedDate: "2 Jan, 2022",
    },
    {
      name: "Dr. Nolan George",
      hospitalname: "Shamuba Hospital",
      appointmentType: "Onsite",
      billCreatedTime: "10:20 AM",
      totalBillAmount: "₹ 24,668",
      billCreatedDate: "2 Jan, 2022",
    },
    {
      name: "Dr. Nolan George",
      hospitalname: "Shamuba Hospital",
      appointmentType: "Onsite",
      billCreatedTime: "10:20 AM",
      totalBillAmount: "₹ 24,668",
      billCreatedDate: "2 Jan, 2022",
    },
    {
      name: "Dr. Nolan George",
      hospitalname: "Shamuba Hospital",
      appointmentType: "Onsite",
      billCreatedTime: "10:20 AM",
      totalBillAmount: "₹ 24,668",
      billCreatedDate: "2 Jan, 2022",
    },
    {
      name: "Dr. Nolan George",
      hospitalname: "Shamuba Hospital",
      appointmentType: "Onsite",
      billCreatedTime: "10:20 AM",
      totalBillAmount: "₹ 24,668",
      billCreatedDate: "2 Jan, 2022",
    },
    {
      name: "Dr. Nolan George",
      hospitalname: "Shamuba Hospital",
      appointmentType: "Onsite",
      billCreatedTime: "10:20 AM",
      totalBillAmount: "₹ 24,668",
      billCreatedDate: "2 Jan, 2022",
    },
  ];

  const UnpaidCard = ({ doctors, handleNavigation }) => {
    return (
      <>
        {doctors?.map((doctor, index) => (
          <div className="col-xl-3 col-lg-4 col-md-6" key={index}>
            <Card className="mb-3">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title">{doctor?.name}</h5>
                  <button type="button" className="eyebtn">
                    <img
                      src="/assets/images/eye-blue-2.svg"
                      alt="eye-blue"
                      className="img-fluid eye-icon"
                    />
                  </button>
                </div>
                <div className="card-details">
                  <div className="row mb-2">
                    <div className="col-sm-6">
                      <small>Hospital Name</small>
                    </div>
                    <div className="col-sm-6">
                      <p className="mb-0 text-end">{doctor?.hospitalname}</p>
                    </div>
                    <div className="col-sm-6">
                      <small>Bill Created Date</small>
                    </div>
                    <div className="col-sm-6">
                      <p className="mb-0 text-end">
                        {doctor?.billCreatedDate} Years
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <small>Bill Created Time</small>
                    </div>
                    <div className="col-sm-6">
                      <p className="mb-0 text-end">{doctor?.billCreatedTime}</p>
                    </div>
                    <div className="col-sm-6">
                      <small>Total Bill Amount</small>
                    </div>
                    <div className="col-sm-6">
                      <p className="mb-0 text-end total-amount">
                        {doctor?.totalBillAmount}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="create-btn w-100"
                    onClick={handleNavigation}
                  >
                    Pay Now
                  </button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </>
    );
  };

  const PaidBillCard = ({ doctors, handlePaidNavigation }) => {
    return (
      <>
        {doctors?.map((doctor, index) => (
          <div className="col-xl-3 col-lg-4 col-md-6" key={index}>
            <Card className="mb-3">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title">{doctor?.name}</h5>
                  <button
                    type="button"
                    className="eyebtn"
                    onClick={handlePaidNavigation}
                  >
                    <img
                      src="/assets/images/eye-blue-2.svg"
                      alt="eye-blue"
                      className="img-fluid eye-icon"
                    />
                  </button>
                </div>
                <div className="card-details">
                  <div className="row mb-2">
                    <div className="col-sm-6">
                      <small>Hospital Name</small>
                    </div>
                    <div className="col-sm-6">
                      <p className="mb-0 text-end">{doctor?.hospitalname}</p>
                    </div>
                    <div className="col-sm-6">
                      <small>Bill Created Date</small>
                    </div>
                    <div className="col-sm-6">
                      <p className="mb-0 text-end">
                        {doctor?.billCreatedDate} Years
                      </p>
                    </div>
                    <div className="col-sm-6">
                      <small>Bill Created Time</small>
                    </div>
                    <div className="col-sm-6">
                      <p className="mb-0 text-end">{doctor?.billCreatedTime}</p>
                    </div>
                    <div className="col-sm-6">
                      <small>Total Bill Amount</small>
                    </div>
                    <div className="col-sm-6">
                      <p className="mb-0 text-end total-amount-paid">
                        {doctor?.totalBillAmount}
                      </p>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </>
    );
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
                      Bills
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
        <div className="container-fluid patients-bills py-4">
          <Tabs
            defaultActiveKey="unpaidbills"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
            <Tab eventKey="unpaidbills" title="Unpaid Bills">
              <div className="my-3">
                <h2 className="patients-bills-title">Unpaid Bills</h2>
              </div>
              <div className="row">
                <UnpaidCard
                  doctors={doctors}
                  handleNavigation={handleNavigation}
                />
              </div>
            </Tab>
            <Tab eventKey="paidbills" title="Paid Bills">
              <div className="my-3">
                <h2 className="patients-bills-title">Paid Bills</h2>
              </div>
              <div className="row">
                <PaidBillCard
                  doctors={doctors}
                  handlePaidNavigation={handlePaidNavigation}
                />
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default PatientBills;
