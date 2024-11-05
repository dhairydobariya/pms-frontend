import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import Sidebar from "../../../../components/Sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import "./SelectInvoiceTheme.scss";

const SelectInvoiceTheme = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [hoveredTemplate, setHoveredTemplate] = useState(null);

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

  const handleSelectTemplate = (templateId) => {
    navigate(`/billing/monitor-billing/invoice-create-bill/${templateId}`);
    setSelectedTemplate(templateId);
  };

  const TemplateOne = () => (
    <div className="invoice-template image-theme">
      <div className="templete-header">
        <div className="templet-spacing">
          <h2>Terry Vaccaro - Manager</h2>
          <h1>Billing Invoice</h1>
        </div>
      </div>
      <div className="sub-header">
        <span>Invoice No. 111</span>
        <span>Jan 01, 2022</span>
      </div>
      <table className="templete-table">
        <thead>
          <tr>
            <th>Qty.</th>
            <th>Description</th>
            <th>Price</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>01</td>
            <td>Payment transferred</td>
            <td>$ 50</td>
            <td>$ 70</td>
          </tr>
          <tr>
            <td>01</td>
            <td>Payment transferred</td>
            <td>$ 50</td>
            <td>$ 70</td>
          </tr>
        </tbody>
      </table>
      <div className="totals">
        <div className="d-flex align-items-center justify-content-between">
          <span>Sub Total</span>
          <span>$ 1545414</span>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <span>Discount 5%</span>
          <span>$ 1545414</span>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <strong>Total</strong>
          <strong>$ 215611554</strong>
        </div>
      </div>
      <div className="notes">
        <h3>Notes</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mattis
          turpis nulla, finibus sodales erat porta eu. Ut eu dolor diam.
          Pellentesque quis mollis nulla. Suspendisse blandit odio in odio porta
          euismod.
        </p>
      </div>
      <div className="footer">
        <div>
          <h3>Bank Details</h3>
          <p>PLK Madhuvan Bank</p>
        </div>
        <div>
          <h3>Account Number</h3>
          <p>123-456-7890</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>123 Anywhere Street, Any City</p>
        <p>Hello@Gmail.com</p>
      </div>
    </div>
  );

  const TemplateTwo = () => (
    <div className="invoice-template blue-theme">
      <div className="header">
        <div className="logo">
          <img src="/assets/images/logo-white.png" alt="logo-white" />
        </div>
        <div className="title">
          <h4>Invoice</h4>
          <p>Invoice No : 1234</p>
        </div>
      </div>
      <div className="content">
        <div className="billed-to">
          <h6>Invoice To :</h6>
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <h3>PLK Madhavan Bank</h3>
            <p className="invoice-date">
              <span className="me-2">Invoice Date :</span>30 May, 2020
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <div className="d-flex align-items-center">
              <img
                src="/assets/images/call-calling-2.svg"
                alt="call-calling-2"
                className="img-fluid me-2"
              />
              <p>+1-234-567-8900</p>
            </div>
            <h5>Total Due: </h5>
          </div>
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <div className="d-flex align-items-center">
              <img
                src="/assets/images/direct-normal.svg"
                alt="direct-normal"
                className="img-fluid me-2"
              />
              <p>email@gmail.com</p>
            </div>
            <h6 className="total-count">$ 1,251</h6>
          </div>
          <div className="d-flex align-items-center">
            <img
              src="/assets/images/location.svg"
              alt="location"
              className="img-fluid me-2"
            />
            <p>123 Anywhere Street, Any City</p>
          </div>
        </div>
        <table className="blue_theme-table">
          <thead>
            <tr>
              <th className="rounded-end-0">Description</th>
              <th className="rounded-start-0 rounded-end-0">Qty</th>
              <th className="rounded-start-0 rounded-end-0">Price</th>
              <th className="rounded-start-0">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Payment transferred</td>
              <td>1</td>
              <td>$260</td>
              <td>$260</td>
            </tr>
            <tr>
              <td>Payment transferred</td>
              <td>1</td>
              <td>$260</td>
              <td>$260</td>
            </tr>
            <tr>
              <td>Payment transferred</td>
              <td>1</td>
              <td>$260</td>
              <td>$260</td>
            </tr>
            <tr>
              <td>Payment transferred</td>
              <td>1</td>
              <td>$260</td>
              <td>$260</td>
            </tr>
            <tr>
              <td>Payment transferred</td>
              <td>1</td>
              <td>$260</td>
              <td>$260</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
        <div className="total text-end">
          <p className="mb-2">
            <strong>Sub Total:</strong> $2,110.00
          </p>
          <p className="mb-2">
            <strong>Tax (5%):</strong> $14.00
          </p>
          <p className="final-total-count">
            <strong>Total:</strong> $2,124.00
          </p>
        </div>
        <div className="term_condition">
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <div className="d-block">
              <h4>Term and Conditions</h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
                mattis turpis nulla, finibus sodales erat porta eu.
              </p>
            </div>
            <h4 className="sign">Signature</h4>
          </div>
        </div>
      </div>
    </div>
  );

  const TemplateThree = () => (
    <div className="invoice-template white-theme">
      <div className="header">
        <div className="logo">
          <img src="/assets/images/logo.png" alt="logo" />
        </div>
        <div className="title">Invoice</div>
      </div>
      <div className="content">
        <div className="billed-to">
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <h4>Billing To :</h4>
            <p className="invoice-date">
              <span className="me-2">Invoice No :</span>1234
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <h4>Adeline Palmerston</h4>
            <p className="invoice-date">
              <span className="me-2">Invoice Date :</span>20 June, 2020
            </p>
          </div>
          <div className="d-flex align-items-center justify-content-between flex-wrap">
            <p className="address-text">
              123 Anywhere St..., Any City, St 012345
            </p>
            <p className="invoice-date">
              <span className="me-2">Due Date :</span>30 june, 2020
            </p>
          </div>
        </div>
        <table className="white_theme-table">
          <thead>
            <tr>
              <th className="rounded-end-0">Item</th>
              <th className="rounded-start-0 rounded-end-0">Price.</th>
              <th className="rounded-start-0 rounded-end-0">Qty.</th>
              <th className="rounded-start-0">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Payment transferred</td>
              <td>$180.00</td>
              <td>2</td>
              <td>$360.00</td>
            </tr>
            <tr>
              <td>Payment transferred</td>
              <td>$180.00</td>
              <td>2</td>
              <td>$360.00</td>
            </tr>
            <tr>
              <td>Payment transferred</td>
              <td>$180.00</td>
              <td>2</td>
              <td>$360.00</td>
            </tr>
            <tr>
              <td>Payment transferred</td>
              <td>$180.00</td>
              <td>2</td>
              <td>$360.00</td>
            </tr>
            <tr>
              <td>Payment transferred</td>
              <td>$180.00</td>
              <td>2</td>
              <td>$360.00</td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex align-items-center justify-content-between flex-wrap pay-spacing">
          <div className="payment-method">
            <h4>Payment Method</h4>
            <p>
              Bank Name : <span>State Bank Of India</span>
            </p>
            <p>
              Account No : <span>1234567890</span>
            </p>
          </div>
          <div className="total">
            <p>
              <strong>Sub Total:</strong> $ 2110.00
            </p>
            <p>
              <strong>Discount 5%:</strong> $25.00
            </p>
            <p className="final-total-count">
              <strong>Total:</strong> $ 2254.00
            </p>
          </div>
        </div>
        <div className="term_condition">
          <h4>Term and Conditions</h4>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            mattis turpis nulla, finibus sodales erat porta eu.
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Call : +90854 22354</p>
        <p>Email : Hello@Gmail.com</p>
      </div>
    </div>
  );

  const templates = [
    { id: 1, name: "Template 1", component: TemplateOne },
    { id: 2, name: "Template 2", component: TemplateTwo },
    { id: 3, name: "Template 3", component: TemplateThree },
  ];

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
                      Monitor Billing
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
        <div className="container-fluid select-invoice-page py-4">
          <div className="template-selector row">
            {templates.map((template) => (
              <div className="col-lg-4 col-md-6 col-12" key={template.id}>
                <div
                  className="template-option"
                  onMouseEnter={() => setHoveredTemplate(template.id)}
                  onMouseLeave={() => setHoveredTemplate(null)}
                >
                  {React.createElement(template.component)}
                  {hoveredTemplate === template.id && (
                    <div className="template-overlay">
                      <button
                        className="btn-choose-template"
                        onClick={() => handleSelectTemplate(template.id)}
                      >
                        Choose Template
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          {selectedTemplate && (
            <div className="flex justify-center mt-8">
              <button
                className="select-btn"
                onClick={() => navigate("/create-bill")}
              >
                Select {selectedTemplate.name}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectInvoiceTheme;
