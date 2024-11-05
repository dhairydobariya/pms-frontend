import React, { useEffect, useRef, useState } from "react";
import { Dropdown, Modal, Button, Form } from "react-bootstrap";
import PatientSidebar from "../PatientSidebar/PatientSidebar";
import PaymentSuccessModal from "../modals/PaymentSuccessModal/PaymentSuccessModal";
import "./BillInvoicePage.scss";

const BillInvoicePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPaymentTypeModal, setShowPaymentTypeModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const [showModal, setShowModal] = useState(false);
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

  const handlePayNow = () => {
    setShowPaymentTypeModal(true);
  };

  const handlePaymentTypeSelect = (type) => {
    setPaymentType(type);
  };

  const handlePaymentTypeSubmit = () => {
    setShowPaymentTypeModal(false);
    if (paymentType === "Online") {
      setShowPaymentModal(true);
    } else if (paymentType === "Cash") {
      setShowSuccessModal(true);
    }
  };

  const handlePaymentSubmit = () => {
    setShowPaymentModal(false);
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
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
        <div className="container-fluid bills-invoice-page py-4">
          <div className="invoice-container">
            <div className="invoice-header">
              <div className="logo">
                <img
                  src="/assets/images/logo.png"
                  alt="logo"
                  className="img-fluid"
                />
              </div>
              <h2 className="invoice-title">Invoice</h2>
            </div>

            <div className="doctor-info">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6">
                  <h3>Dr. Bharat Patel</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Proin mattis turpis nisl, viverra scelerisque porta eu.
                  </p>
                </div>
                <div className="col-md-6 text-lg-end mt-lg-0 mt-4">
                  <p className="doctor-info-contentbox">
                    <strong className="doctor-info-title">Bill No</strong>
                    <span className="doctor-info-dot">:</span> 1234
                  </p>
                  <p className="doctor-info-contentbox">
                    <strong className="doctor-info-title">Bill Date</strong>
                    <span className="doctor-info-dot">:</span> 20 June, 2020
                  </p>
                  <p className="doctor-info-contentbox">
                    <strong className="doctor-info-title">Bill Time</strong>
                    <span className="doctor-info-dot">:</span> 10:45 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="invoice-details invoice-details-spacing">
              <div className="row">
                <div className="col-md-6">
                  <p className="invoice-details-contentbox">
                    <strong className="invoice-details-title">Name</strong>
                    <span className="invoice-details-dot">:</span> Miracle
                    Kenter
                  </p>
                  <p className="invoice-details-contentbox">
                    <strong className="invoice-details-title">Gender</strong>
                    <span className="invoice-details-dot">:</span> Male
                  </p>
                  <p className="invoice-details-contentbox">
                    <strong className="invoice-details-title">Age</strong>
                    <span className="invoice-details-dot">:</span> 36 Years
                  </p>
                  <p className="invoice-details-contentbox text-lg-nowrap">
                    <strong className="invoice-details-title">Address</strong>
                    <span className="invoice-details-dot">:</span> B-105 Vimal
                    Bungalows Purnaam Mogavira, Jamalpur
                  </p>
                </div>
                <div className="col-md-6">
                  <p className="invoice-details-contentbox">
                    <strong className="invoice-details-title">
                      Disease Name
                    </strong>
                    <span className="invoice-details-dot">:</span> Jasuam Saris
                  </p>
                  <p className="invoice-details-contentbox">
                    <strong className="invoice-details-title">
                      Phone Number
                    </strong>
                    <span className="invoice-details-dot">:</span> 9757766557
                  </p>
                  <p className="invoice-details-contentbox">
                    <strong className="invoice-details-title">
                      Payment Type
                    </strong>
                    <span className="invoice-details-dot">:</span>{" "}
                    <span className="text-blue">Insurance</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="table-responsive">
              <table className="table align-middle invoice-table">
                <thead>
                  <tr>
                    <th className="rounded-end-0">Description</th>
                    <th className="rounded-0">Amount</th>
                    <th className="rounded-0">Qty.</th>
                    <th className="rounded-start-0 text-end">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Neuromuscular blockers</td>
                    <td>₹ 13,000.00</td>
                    <td className="qty">2</td>
                    <td className="total">₹ 26,000.00</td>
                  </tr>
                  <tr>
                    <td>Neuromuscular blockers</td>
                    <td>₹ 800.00</td>
                    <td className="qty">2</td>
                    <td className="total">₹ 1,600.00</td>
                  </tr>
                  <tr>
                    <td>Levocarvin with high dose methoxarate (HDMTX)</td>
                    <td>₹ 1000.00</td>
                    <td className="qty">2</td>
                    <td className="total">₹ 2000.00</td>
                  </tr>
                  <tr>
                    <td>Hydroxyurea for sickle cell disease</td>
                    <td>₹ 20.00</td>
                    <td className="qty">2</td>
                    <td className="total">₹ 40.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="insurance-details">
              <div className="row">
                <div className="col-md-6">
                  <p className="insurance-details-contentbox">
                    <strong className="insurance-details-title">
                      Insurance Company
                    </strong>
                    <span className="insurance-details-dot">:</span> HDFC life
                    Insurance
                  </p>
                  <p className="insurance-details-contentbox">
                    <strong className="insurance-details-title">
                      Insurance Plan
                    </strong>
                    <span className="insurance-details-dot">:</span> Health
                    Insurance
                  </p>
                  <p className="insurance-details-contentbox">
                    <strong className="insurance-details-title">
                      Claim Amount
                    </strong>
                    <span className="insurance-details-dot">:</span> ₹ 2,000.00
                  </p>
                  <p className="insurance-details-contentbox">
                    <strong className="insurance-details-title">
                      Claimed Amount
                    </strong>
                    <span className="insurance-details-dot">:</span> ₹ 2,500.00
                  </p>
                </div>
                <div className="col-md-6 text-lg-end mt-lg-0 mt-4">
                  <p className="insurance-details-contentbox">
                    <strong className="insurance-details-title">Amount</strong>
                    <span className="insurance-details-dot">:</span> ₹ 25,840.00
                  </p>
                  <p className="insurance-details-contentbox">
                    <strong className="insurance-details-title">
                      Discount 5%
                    </strong>
                    <span className="insurance-details-dot">:</span> ₹ 1,292.00
                  </p>
                  <p className="insurance-details-contentbox">
                    <strong className="insurance-details-title">Tax</strong>
                    <span className="insurance-details-dot">:</span> ₹ 120.00
                  </p>
                  <p className="insurance-total-contentbox">
                    <strong className="insurance-total-title">
                      Total Amount
                    </strong>
                    <span className="insurance-total-dot">:</span> ₹ 24,668.00
                  </p>
                </div>
              </div>
            </div>

            <div className="invoice-footer">
              <div className="contact-info">
                <p>Call: +91604 22394</p>
                <p>Email: Hello@Gmail.com</p>
              </div>
            </div>
            <div className="text-center">
              <button className="pay-btn" onClick={handlePayNow}>
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Select Payment Type Modal */}
      <Modal
        show={showPaymentTypeModal}
        onHide={() => setShowPaymentTypeModal(false)}
        centered
        className="payment-type-select-modal"
      >
        <Modal.Header>
          <Modal.Title>Select Payment Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="d-flex align-items-center payment-select-box mb-3">
              <img
                src="/assets/images/online-payment.svg"
                alt="online-payment"
                className="img-fluid"
              />
              <Form.Check
                type="radio"
                label="Online"
                name="paymentType"
                id="online"
                onChange={() => handlePaymentTypeSelect("Online")}
                checked={paymentType === "Online"}
              />
            </div>
            <div className="d-flex align-items-center payment-select-box">
              <img
                src="/assets/images/ruppess-sign-2.svg"
                alt="ruppess-sign-2"
                className="img-fluid"
              />
              <Form.Check
                type="radio"
                label="Cash"
                name="paymentType"
                id="cash"
                onChange={() => handlePaymentTypeSelect("Cash")}
                checked={paymentType === "Cash"}
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="cancle-btn"
            onClick={() => setShowPaymentTypeModal(false)}
          >
            Cancel
          </button>
          <button
             type="submit"
            className="submit-btn"
            onClick={handlePaymentTypeSubmit}
            disabled={!paymentType}
          >
            Pay Now
          </button>
        </Modal.Footer>
      </Modal>

      {/* Payment Modal */}
      <Modal
        className="payment-modal"
        show={showPaymentModal}
        onHide={() => setShowPaymentModal(false)}
        centered
      >
        <Modal.Header>
          <Modal.Title>Payment Method</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="payment-options">
            <div className="form-check">
              <img
                src="/assets/images/master-card.png"
                alt="master-card"
                className="img-fluid"
              />
              <label className="form-check-label" htmlFor="masterCard">
                Master Card
              </label>
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="masterCard"
                value="MasterCard"
                onChange={handlePaymentChange}
              />
              {paymentMethod === "MasterCard" && (
                <div className="mt-3">
                  <form>
                    {/* Card Holder Name */}
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter Card Holder Name"
                      />
                      <label>Card Holder Name</label>
                    </div>

                    {/* Card Number */}
                    <div className="form-floating mb-3 position-relative">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter Card Number"
                      />
                      <label>Card Number</label>
                      <img
                        src="/assets/images/master-card.png"
                        alt="master-card"
                        className="img-fluid"
                      />
                    </div>

                    {/* Expiry Date and CVV */}
                    <div className="d-flex justify-content-between">
                      <div className="form-floating mb-3 me-2 w-50">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="MM/YY"
                        />
                        <label>Expiry Date</label>
                      </div>

                      <div className="form-floating mb-3 w-50">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="CVV"
                        />
                        <label>CVV</label>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
            <div className="form-check mt-4">
              <img
                src="/assets/images/visa.png"
                alt="visa"
                className="img-fluid"
              />
              <label className="form-check-label" htmlFor="visaCard">
                Visa Card
              </label>
              <input
                className="form-check-input"
                type="radio"
                name="paymentMethod"
                id="visaCard"
                value="VisaCard"
                onChange={handlePaymentChange}
              />
              {paymentMethod === "VisaCard" && (
                <div className="mt-3">
                  <Form>
                    {/* Card Holder Name */}
                    <div className="form-floating mb-3">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter Card Holder Name"
                      />
                      <label>Card Holder Name</label>
                    </div>

                    {/* Card Number */}
                    <div className="form-floating mb-3 position-relative">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Enter Card Number"
                      />
                      <label>Card Number</label>
                      <img
                        src="/assets/images/master-card.png"
                        alt="master-card"
                        className="img-fluid"
                      />
                    </div>

                    {/* Expiry Date and CVV */}
                    <div className="d-flex justify-content-between">
                      <div className="form-floating mb-3 me-2 w-50">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="MM/YY"
                        />
                        <label>Expiry Date</label>
                      </div>

                      <div className="form-floating mb-3 w-50">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="CVV"
                        />
                        <label>CVV</label>
                      </div>
                    </div>
                  </Form>
                </div>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="cancle-btn"
            onClick={() => setShowPaymentModal(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="submit-btn"
            onClick={handlePaymentSubmit}
          >
            Pay Now
          </button>
        </Modal.Footer>
      </Modal>

      <PaymentSuccessModal
        show={showSuccessModal}
        handleClose={handleCloseSuccessModal}
      />
    </div>
  );
};

export default BillInvoicePage;
