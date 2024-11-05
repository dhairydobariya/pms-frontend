import React, { useEffect, useRef, useState } from "react";
import "./CreatePrescription.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import DoctorSidebar from "../../../components/DoctorSidebar/DoctorSidebar";

const CreatePrescription = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const sidebarRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [patientGender, setPatientGender] = useState("");
  const [additionalNote, setAdditionalNote] = useState("");
  const [medicines, setMedicines] = useState([
    {
      name: "Calcium carbonate",
      strength: "100 Mg",
      dose: "1-0-1",
      duration: "2 Day",
      whenToTake: "Before Food",
    },
    {
      name: "Cyclobenzaprine",
      strength: "200 Mg",
      dose: "1-1-1",
      duration: "4 Day",
      whenToTake: "With Food",
    },
    {
      name: "Fluticasone Almeterol",
      strength: "250 Mg",
      dose: "0-1-0",
      duration: "5 Day",
      whenToTake: "Before Food",
    },
    {
      name: "Hydrochlorothiazide",
      strength: "150 Mg",
      dose: "0-0-1",
      duration: "2 Day",
      whenToTake: "After Food",
    },
    {
      name: "Flonase Allergy Relief",
      strength: "180 Mg",
      dose: "1-0-0",
      duration: "1 Day",
      whenToTake: "Before Food",
    },
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

  const noNotificationImage = "/assets/images/no-notification.png";

  const clearNotifications = () => {
    setNotifications([]); // Clear the notifications array
  };

  const addMedicine = () => {
    setMedicines([
      ...medicines,
      { name: "", strength: "", dose: "", duration: "", whenToTake: "" },
    ]);
  };

  const removeMedicine = (index) => {
    const updatedMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(updatedMedicines);
  };

  const updateMedicine = (index, field, value) => {
    const updatedMedicines = medicines.map((medicine, i) => {
      if (i === index) {
        return { ...medicine, [field]: value };
      }
      return medicine;
    });
    setMedicines(updatedMedicines);
  };

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
                      Prescription Tools
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Create
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
        <div className="container-fluid doctor-prescription-create-page py-4">
          <div className="row">
            {/* Left Column - Prescription Form */}
            <div className="col-md-7 prescription-form">
              <h1 className="doctor-prescription-create-title">
                Create Prescription
              </h1>
              <form>
                <div className="row patient-form">
                  <div className="col-md-8">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter patient name"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                      />
                      <label>Patient Name</label>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter age"
                        value={patientAge}
                        onChange={(e) => setPatientAge(e.target.value)}
                      />
                      <label>Age</label>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="form-floating mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter gender"
                        value={patientGender}
                        onChange={(e) => setPatientGender(e.target.value)}
                      />
                      <label>Gender</label>
                    </div>
                  </div>
                </div>
                <h3>Drug Prescription</h3>
                <div className="table-responsive">
                  <table className="table table-hover prescription-table">
                    <thead>
                      <tr>
                        <th>Medicine Name</th>
                        <th>Strength</th>
                        <th>Dose</th>
                        <th>Duration</th>
                        <th>When to take</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {medicines.map((medicine, index) => (
                        <tr key={index}>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={medicine.name}
                              onChange={(e) =>
                                updateMedicine(index, "name", e.target.value)
                              }
                              placeholder="Enter Medicine"
                            />
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={medicine.strength}
                              onChange={(e) =>
                                updateMedicine(
                                  index,
                                  "strength",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <select
                              className="form-select"
                              value={medicine.dose}
                              onChange={(e) =>
                                updateMedicine(index, "dose", e.target.value)
                              }
                            >
                              <option value="">Select dose</option>
                              <option value="1-0-1">1-0-1</option>
                              <option value="1-1-1">1-1-1</option>
                              <option value="0-1-0">0-1-0</option>
                              <option value="0-0-1">0-0-1</option>
                              <option value="1-0-0">1-0-0</option>
                            </select>
                          </td>
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={medicine.duration}
                              onChange={(e) =>
                                updateMedicine(
                                  index,
                                  "duration",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <select
                              className="form-select"
                              value={medicine.whenToTake}
                              onChange={(e) =>
                                updateMedicine(
                                  index,
                                  "whenToTake",
                                  e.target.value
                                )
                              }
                            >
                              <option value="">Select when to take</option>
                              <option value="Before Food">Before Food</option>
                              <option value="With Food">With Food</option>
                              <option value="After Food">After Food</option>
                            </select>
                          </td>
                          <td>
                            <button
                              type="button"
                              className="delete-btn"
                              onClick={() => removeMedicine(index)}
                            >
                              <img
                                src="/assets/images/trash-2.svg"
                                alt="trash-2"
                                className="img-fluid"
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  type="button"
                  className="add-medicine-btn"
                  onClick={addMedicine}
                >
                  Add Medicine
                </button>
                <div className="form-floating form-textarea mt-3">
                  <textarea
                    htmlFor="floatingInput"
                    className="form-control"
                    rows={3}
                    value={additionalNote}
                    onChange={(e) => setAdditionalNote(e.target.value)}
                    placeholder="Enter additional notes"
                  />
                  <label id="floatingInput">Additional Note</label>
                </div>
              </form>
            </div>

            {/* Right Column - Prescription Preview */}
            <div className="col-md-4 prescription-preview">
              <div className="prescription-preview-header">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div className="d-flex align-items-center">
                    <img
                      src="/assets/images/logo.png"
                      alt="Hospital Logo"
                      className="hospital-logo img-fluid"
                    />
                  </div>
                  <div className="text-end">
                    <h3 className="m-0 doctor-name">Dr. Bharat Patel</h3>
                    <p className="doctor-specialty">
                      Obstetrics and gynecology
                    </p>
                  </div>
                </div>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <p>
                      <strong>Hospital Name:</strong> Medical Center
                    </p>
                    <p>
                      <strong>Patient Name:</strong> {patientName || "N/A"}
                    </p>
                    <p>
                      <strong>Gender:</strong> {patientGender || "N/A"}
                    </p>
                    <p className="d-ruby">
                      <strong>Address:</strong> B-105 Virat Bungalows Punagam
                      Motavaracha Jamnagar.
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p>
                      <strong>Prescription Date:</strong>{" "}
                      {new Date().toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Age:</strong> {patientAge || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table mb-4">
                  <thead>
                    <tr>
                      <th>Medicine Name</th>
                      <th>Strength</th>
                      <th>Dose</th>
                      <th>Duration</th>
                      <th>When to take</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicines.map((medicine, index) => (
                      <tr key={index}>
                        <td>{medicine.name || "N/A"}</td>
                        <td>{medicine.strength || "N/A"}</td>
                        <td>{medicine.dose || "N/A"}</td>
                        <td className="duration">{medicine.duration || "N/A"}</td>
                        <td className="whentotake">{medicine.whenToTake || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="form-group additional-note mb-4">
                <label>
                  <strong>Additional Note</strong>
                </label>
                <p>{additionalNote || "No additional notes."}</p>
              </div>
              <div className="d-flex justify-content-between align-items-end">
                <div className="doctor-signature">
                  <img src="/assets/images/doctor-sign.png" alt="Doctor Signature" />
                  <p>Doctor Signature</p>
                </div>
                <button className="send-btn">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePrescription;
