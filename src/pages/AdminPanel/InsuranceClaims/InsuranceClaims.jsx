import React, { useEffect, useMemo, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import "./InsuranceClaims.scss";

const InsuranceClaims = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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

  const noNotificationImage = "/assets/images/no-notification.png";

  const clearNotifications = () => {
    setNotifications([]); // Clear the notifications array
  };

  const claims = [
    {
      billNo: "5654",
      doctorImg: "/assets/images/profile.png",
      doctorName: "Dr. Marcus Philips",
      patientName: "Internal Medicine",
      diseaseName: "Kadin Saris",
      insuranceCompany: "HDFC Life Insurance",
      insurancePlan: "Maternity",
      billDate: "2 Jun, 2024",
    },
    {
      billNo: "5655",
      doctorImg: "/assets/images/profile.png",
      doctorName: "Dr. Haylie Schleifer",
      patientName: "Jaxson Bergson",
      diseaseName: "Charlie Rosser",
      insuranceCompany: "LIC Life Insurance",
      insurancePlan: "Health",
      billDate: "3 Jun, 2024",
    },
    {
      billNo: "5660",
      doctorImg: "/assets/images/profile.png",
      doctorName: "Dr. Jaxson Levin",
      patientName: "Emerson Levin",
      diseaseName: "Justin Dokidis",
      insuranceCompany: "Aegon Life Insurance",
      insurancePlan: "Medical",
      billDate: "4 Jun, 2024",
    },
    {
      billNo: "5654",
      doctorImg: "/assets/images/profile.png",
      doctorName: "Dr. Roger Carder",
      patientName: "Brandon Lipshitz",
      diseaseName: "Terry Dokidis",
      insuranceCompany: "HDFC Life Insurance",
      insurancePlan: "Medical",
      billDate: "5 Jun, 2024",
    },
    {
      billNo: "5662",
      doctorImg: "/assets/images/profile.png",
      doctorName: "Dr. Corey Siphron",
      patientName: "Ruben Dokidis",
      diseaseName: "Phillip Donin",
      insuranceCompany: "LIC Life Insurance",
      insurancePlan: "Health",
      billDate: "6 Jun, 2024",
    },
    {
      billNo: "5668",
      doctorImg: "/assets/images/profile.png",
      doctorName: "Dr. Roger Carder",
      patientName: "Kadin Saris",
      diseaseName: "Kadin Philips",
      insuranceCompany: "Aegon Life Insurance",
      insurancePlan: "Medical",
      billDate: "7 Jun, 2024",
    },
    {
      billNo: "5663",
      doctorImg: "/assets/images/profile.png",
      doctorName: "Dr. Jaxson Levin",
      patientName: "Ryan Schleifer",
      diseaseName: "Emerson Dokidis",
      insuranceCompany: "HDFC Life Insurance",
      insurancePlan: "Health",
      billDate: "8 Jun, 2024",
    },
    {
      billNo: "2254",
      doctorImg: "/assets/images/profile.png",
      doctorName: "Dr. Chance Vaccaro",
      patientName: "Zaire Mango",
      diseaseName: "Marcus Ekstrom",
      insuranceCompany: "LIC Life Insurance",
      insurancePlan: "Medical",
      billDate: "9 Jun, 2022",
    },
    {
      billNo: "2353",
      doctorImg: "/assets/images/profile.png",
      doctorName: "Dr. Marcus Philips",
      patientName: "Alfonso Mango",
      diseaseName: "Kadin Botosh",
      insuranceCompany: "Aegon Life Insurance",
      insurancePlan: "Health",
      billDate: "10 Jun, 2024",
    },
    {
      billNo: "5663",
      doctorImg: "/assets/images/profile.png",
      doctorName: "Dr. Jaxson Levin",
      patientName: "Marcus Levin",
      diseaseName: "Charlie Vaccaro",
      insuranceCompany: "HDFC Life Insurance",
      insurancePlan: "Medical",
      billDate: "11 Jun, 2024",
    },
    {
      billNo: "5662",
      doctorImg: "/assets/images/profile.png",
      doctorName: "Dr. Marcus Philips",
      patientName: "Cooper Dias",
      diseaseName: "Zain Passaquindici",
      insuranceCompany: "LIC Life Insurance",
      insurancePlan: "Maternity",
      billDate: "12 Jun, 2024",
    },
    {
      billNo: "5662",
      doctorImg: "/assets/images/profile.png",
      doctorName: "Dr. Marcus Philips",
      patientName: "Cooper Dias",
      diseaseName: "Zain Passaquindici",
      insuranceCompany: "LIC Life Insurance",
      insurancePlan: "Health",
      billDate: "12 Jun, 2024",
    }
  ];

  const filteredClaims = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    
    if (!query) return claims;

    return claims.filter(claim => 
      claim.billNo.toLowerCase().includes(query) ||
      claim.doctorName.toLowerCase().includes(query) ||
      claim.patientName.toLowerCase().includes(query) ||
      claim.diseaseName.toLowerCase().includes(query) ||
      claim.insuranceCompany.toLowerCase().includes(query) ||
      claim.insurancePlan.toLowerCase().includes(query) ||
      claim.billDate.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Clear search
  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleInsuranceClaimsDetails = () => {
    navigate("/billing/insurance-claims/Invoice");
  }

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
                      Billing And Payments
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
        <div className="container-fluid insurance-claims-page py-4">
          <div className="d-flex align-items-center justify-content-between flex-md-row flex-column">
            <h1 className="insurance-claims-title mb-md-0 mb-3">Insurance Claims</h1>
            <div className="insurance-claims-search-container">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search Patient"
                className="form-control"
              />
              {searchQuery && (
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
          <div className="table-responsive">
          {filteredClaims.length > 0 ? (
          <table className="table insurance-claims-table">
            <thead>
              <tr>
                <th>Bill No</th>
                <th>Doctor Name</th>
                <th>Patient Name</th>
                <th>Disease Name</th>
                <th>Insurance Company</th>
                <th>Insurance Plan</th>
                <th>Bill Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredClaims.map((claim, index) => (
                <tr key={`${claim.billNo}-${index}`}>
                  <td><span className="bill-no">{claim.billNo}</span></td>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="doctor-img-wrapper me-2">
                        <img
                          src={claim.doctorImg}
                          alt={claim.doctorName}
                          className="doctor-img"
                        />
                      </div>
                      <span>{claim.doctorName}</span>
                    </div>
                  </td>
                  <td>{claim.patientName}</td>
                  <td>{claim.diseaseName}</td>
                  <td>{claim.insuranceCompany}</td>
                  <td>
                    <span className="insurance-plan" data-plan={claim.insurancePlan}>
                      {claim.insurancePlan}
                    </span>
                  </td>
                  <td>{claim.billDate}</td>
                  <td>
                    <button className="btn action-btn" onClick={handleInsuranceClaimsDetails}>
                      <img
                        src="/assets/images/eye-gray-2.svg"
                        alt="actions"
                        className="action-icon"
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
           ) : (
            <div className="no-results">
              <div className="text-center py-5">
                <img 
                  src="/assets/images/no-results.svg" 
                  alt="No results found" 
                  className="no-results-img img-fluid mb-3"
                />
                <h3>No Results Found</h3>
                <p>
                  No matches found for "{searchQuery}". Try adjusting your search.
                </p>
              </div>
            </div>
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default InsuranceClaims;
