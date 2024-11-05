import React, { useEffect, useRef, useState } from "react";
import { Dropdown, Modal, Button } from "react-bootstrap";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentProcess.scss";

const PaymentProcess = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [billingData, setBillingData] = useState([
    {
      billNumber: "5654",
      patientName: "Alfredo Vaccaro",
      diseaseName: "Colds and Flu",
      phoneNumber: "89564 25462",
      status: "Paid",
      date: "2 Jan, 2022",
      time: "4:30 PM",
    },
    {
      billNumber: "5654",
      patientName: "Talan Press",
      diseaseName: "Conjunctivitis",
      phoneNumber: "89564 25462",
      status: "Unpaid",
      date: "25 Jan, 2022",
      time: "4:30 PM",
    },
    {
      billNumber: "5654",
      patientName: "Alfredo Vaccaro",
      diseaseName: "Allergies",
      phoneNumber: "89564 25462",
      status: "Paid",
      date: "5 Jan, 2022",
      time: "4:30 PM",
    },
    {
      billNumber: "5654",
      patientName: "Giana Press",
      diseaseName: "Colds and Flu",
      phoneNumber: "89564 25462",
      status: "Unpaid",
      date: "2 Jan, 2022",
      time: "4:30 PM",
    },
    {
      billNumber: "5654",
      patientName: "Nolan Botosh",
      diseaseName: "Diarrhea",
      phoneNumber: "89564 25462",
      status: "Paid",
      date: "6 Jan, 2022",
      time: "4:30 PM",
    },
    {
      billNumber: "5654",
      patientName: "Alfredo Vaccaro",
      diseaseName: "Colds and Flu",
      phoneNumber: "89564 25462",
      status: "Unpaid",
      date: "20 Jan, 2022",
      time: "4:30 PM",
    },
    {
      billNumber: "5654",
      patientName: "Rayna Rosser",
      diseaseName: "Mononucleosis",
      phoneNumber: "89564 25462",
      status: "Paid",
      date: "2 Jun, 2022",
      time: "4:30 PM",
    },
    {
      billNumber: "5654",
      patientName: "Alfredo Vaccaro",
      diseaseName: "Colds and Flu",
      phoneNumber: "89564 25462",
      status: "Paid",
      date: "11 Jan, 2022",
      time: "4:30 PM",
    },
    {
      billNumber: "5654",
      patientName: "Alfredo Vaccaro",
      diseaseName: "Stomach Aches",
      phoneNumber: "89564 25462",
      status: "Unpaid",
      date: "2 Jan, 2022",
      time: "4:30 PM",
    },
    {
      billNumber: "5654",
      patientName: "Alfredo Vaccaro",
      diseaseName: "Stomach Aches",
      phoneNumber: "89564 25462",
      status: "Paid",
      date: "2 Jan, 2022",
      time: "4:30 PM",
    },
    {
      billNumber: "5654",
      patientName: "Rayna Rosser",
      diseaseName: "Mononucleosis",
      phoneNumber: "89564 25462",
      status: "Paid",
      date: "2 Jun, 2022",
      time: "4:30 PM",
    },
    {
      billNumber: "5654",
      patientName: "Alfredo Vaccaro",
      diseaseName: "Colds and Flu",
      phoneNumber: "89564 25462",
      status: "Paid",
      date: "20 Jan, 2022",
      time: "4:30 PM",
    },
    // Add more data as needed
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
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(billingData);

  const sidebarRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const noNotificationImage = "/assets/images/no-notification.png";

  const clearNotifications = () => {
    setNotifications([]); // Clear the notifications array
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

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

  useEffect(() => {
    const results = billingData.filter(
      (bill) =>
        bill.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.diseaseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.phoneNumber.toLowerCase().includes(searchTerm) ||
        bill.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(results);
  }, [searchTerm, billingData]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  const handleInvoice = () => {
    navigate("/billing/payment-process/invoice");
  };

  const handleEditBill = () => {
    navigate("/billing/payment-process/edit");
  };

  const renderTable = () => (
    <div className="table-responsive">
      <table className="table payment_process-table table-hover">
        <thead>
          <tr>
            <th className="rounded-end-0">Bill Number</th>
            <th className="rounded-end-0 rounded-start-0">Patient Name</th>
            <th className="rounded-end-0 rounded-start-0">Disease Name</th>
            <th className="rounded-end-0 rounded-start-0">Phone Number</th>
            <th className="rounded-end-0 rounded-start-0">Status</th>
            <th className="rounded-end-0 rounded-start-0">Date</th>
            <th className="rounded-end-0 rounded-start-0">Time</th>
            <th className="rounded-start-0">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((bill, index) => (
            <tr key={index}>
              <td>
                <div className="payment_process-time">{bill.billNumber}</div>
              </td>
              <td>{bill.patientName}</td>
              <td>{bill.diseaseName}</td>
              <td>{bill.phoneNumber}</td>
              <td>
                <span
                  className={`badge ${
                    bill.status === "Paid" ? "bg-success" : "bg-danger"
                  }`}
                >
                  {bill.status}
                </span>
              </td>
              <td>{bill.date}</td>
              <td>
                <div className="payment_process-time">{bill.time}</div>
              </td>
              <td className="d-flex align-items-center flex-md-row flex-column">
                <button className="bg-transparent" onClick={handleEditBill}>
                  <img
                    src="/assets/images/edit-icon-box.svg"
                    alt="edit-icon-box"
                    className="img-fluid"
                  />
                </button>
                <button className="bg-transparent mx-md-3 mx-0 my-md-0 my-3" onClick={handleInvoice}>
                  <img
                    src="/assets/images/view-icon-box.svg"
                    alt="view-icon-box"
                    className="img-fluid"
                  />
                </button>
                <button className="bg-transparent" onClick={handleShow}>
                  <img
                    src="/assets/images/money-pay-icon.svg"
                    alt="money-pay-icon"
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

  const renderNoDataFound = () => (
    <div className="text-center py-5">
      <img
        src="/assets/images/no_data_found.png"
        alt="No data found"
        className="mb-3 img-fluid"
      />
    </div>
  );

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
                    <li className="breadcrumb-item" aria-current="page">
                      Billing And Payments
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Payment Process
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
        <div className="container-fluid payment_process_page py-4">
          <div className="d-flex align-items-center justify-content-between flex-md-row flex-column mb-3">
            <h1 className="payment_process-title mb-md-0 mb-3">
              Billing Details
            </h1>
            <div className="payment_process-search-container">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Quick Search"
                className="form-control"
              />
              {searchTerm && (
                <button
                  className="clear-search-btn"
                  onClick={handleClearSearch}
                  title="Clear search"
                >
                  ×
                </button>
              )}
              <img
                src="/assets/images/search.svg"
                alt="search"
                className="search-icon"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              {filteredData.length > 0 ? renderTable() : renderNoDataFound()}
            </div>
          </div>
        </div>
      </div>
      <Modal
        show={showModal}
        onHide={handleClose}
        centered
        className="cash-payment-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Cash Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="payment-summary">
            <div className="form-floating position-relative">
              <input
                type="text"
                id="cashpay"
                className="form-control"
                placeholder="₹ 00000"
              />
              <label htmlFor="cashpay">Enter Amount</label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="cancel-btn" onClick={handleClose}>
            Cancel
          </button>
          <button className="pay-btn" onClick={handleClose}>
            Pay
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PaymentProcess;
