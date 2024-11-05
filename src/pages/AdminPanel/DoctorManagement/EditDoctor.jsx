import React, { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import "./EditDoctor.scss";
import axios from "axios";

const EditDoctor = () => {
  const { doctorId } = useParams();
  const adminId = localStorage.getItem("adminId");

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [signatureFile, setSignatureFile] = useState(null);
  const [doctor, setDoctor] = useState({
    firstName: "",
    qualification: "",
    gender: "",
    specialistType: "",
    workOn: "",
    workingTime: "",
    patientCheckUpTime: "",
    breakTime: "",
    experience: "",
    phoneNumber: "",
    age: "",
    email: "",
    country: "",
    state: "",
    city: "",
    zipCode: "",
    doctorAddress: "",
    description: "",
    consultationRate: "",
    image: "",
    signatureImage: "",
    currentHospital: "",
    hospitalName: "",
    website: "",
    emergencyContact: "",
  });

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

  useEffect(() => {
    const fetchDoctor = async () => {
      const token = localStorage.getItem("token");
      const adminId = localStorage.getItem("adminId");
      try {
        const response = await axios.post(
          `http://localhost:9500/v1/dashboard-adminFlow/doctor-list-id`,
          {
            adminId: adminId,
            doctorId: doctorId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDoctor(response.data.doctor);
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    };

    if (doctorId) fetchDoctor();
  }, [doctorId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleProfilePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setDoctor((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
    }
  };

  const handleSignatureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSignatureFile(file);
      setDoctor((prev) => ({
        ...prev,
        signatureImage: URL.createObjectURL(file),
      })); 
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      const token = localStorage.getItem("token");
      formData.append("doctorData", JSON.stringify(doctor));
      if (profilePhoto) {
        formData.append("image", profilePhoto);
      }
      if (signatureFile) {
        formData.append("signatureImage", signatureFile);
      }
      const response = await axios.put(
        "http://localhost:9500/v1/admin/update-doctor-by-admin",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
           adminId: adminId,
        }
      );

      console.log("response====>", response);
      

      if (response.status === 200) {
        console.log("Doctor updated successfully");
        navigate("/doctor-management"); // Navigate back to the doctor management page or another page
      } else {
        console.error("Failed to update doctor");
      }
    } catch (error) {
      console.error("Error updating doctor:", error);
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
        <div className="container-fluid edit_doctor_form py-4">
          <h1 className="edit_doctor_title">Edit Doctor Detail</h1>
          <div className="row">
            {/* Left Side - Profile Image and Signature */}
            <div className="col-md-3 text-center mb-4">
              <div className="mb-3">
                <label htmlFor="profile-upload">
                  <div className="cursor-pointer mb-2">
                    <img
                      src={
                        profilePhoto
                          ? URL.createObjectURL(profilePhoto)
                          : doctor.image
                      }
                      alt="Profile"
                      className="rounded-full img-fluid mb-2"
                    />
                    <div className="text-center mt-3">
                      <button className="edit-choose-photo-btn">
                        Choose Photo
                      </button>
                    </div>
                  </div>
                </label>
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="d-none"
                  onChange={handleProfilePhotoChange}
                />
              </div>

              <div className="mt-4">
                <h4 className="edit_upload_title">Upload Signature</h4>
                <label
                  htmlFor="signature-upload"
                  className="cursor-pointer mt-3"
                >
                  <div className="text-center">
                    <img
                      src={
                        signatureFile
                          ? URL.createObjectURL(signatureFile)
                          : doctor.specialistType
                      }
                      alt="Signature"
                      className="img-fluid border rounded"
                    />
                    <div className="text-center mt-3">
                      <button className="edit-choose-photo-btn">
                        Upload Signature
                      </button>
                    </div>
                  </div>
                </label>
                <input
                  id="signature-upload"
                  type="file"
                  accept="image/*"
                  className="d-none"
                  onChange={handleSignatureChange} // Update state with selected signature file
                />
              </div>
            </div>

            {/* Right Side - Form Fields */}
            <div className="col-md-9">
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="form-floating mb-3">
                    <input
                      name="firstName"
                      className="form-control"
                      type="text"
                      value={doctor?.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter Doctor Name"
                    />
                    <label>Doctor Name</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-floating mb-3">
                    <input
                      name="qualification"
                      value={doctor?.qualification}
                      onChange={handleInputChange}
                      className="form-control"
                      type="text"
                      placeholder="Enter Doctor Qualification"
                    />
                    <label>Doctor Qualification</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-floating form-floating-select mb-3">
                    <select
                      name="gender"
                      value={doctor?.gender}
                      onChange={handleInputChange}
                      id="gender"
                      className="form-select"
                    >
                      <option value="1">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <label htmlFor="gender">Gender</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-floating mb-3">
                    <input
                      name="specialistType"
                      value={doctor?.specialistType}
                      onChange={handleInputChange}
                      className="form-control"
                      type="text"
                      placeholder="Enter Specialty Type"
                    />
                    <label>Specialty Type</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-floating form-floating-select mb-3">
                    <select
                      name="workOn"
                      value={doctor?.workOn}
                      onChange={handleInputChange}
                      id="workon"
                      className="form-select"
                    >
                      <option value="1">Select Work On</option>
                      <option value="Online">Online</option>
                      <option value="OnSite">OnSite</option>
                    </select>
                    <label htmlFor="workon">Work On</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-floating mb-3">
                    <input
                      name="workingTime"
                      value={doctor?.workingTime}
                      onChange={handleInputChange}
                      className="form-control"
                      type="time"
                      placeholder="Enter Working Time"
                    />
                    <label>Working Time</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-floating mb-3">
                    <input
                      name="patientCheckUpTime"
                      value={doctor?.patientCheckUpTime}
                      onChange={handleInputChange}
                      className="form-control"
                      type="time"
                      placeholder="Enter Checkup Time"
                    />
                    <label>Checkup Time</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-floating mb-3">
                    <input
                      name="breakTime"
                      value={doctor?.breakTime}
                      onChange={handleInputChange}
                      className="form-control"
                      type="time"
                      placeholder="Enter Break Time"
                    />
                    <label>Break Time</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-floating mb-3">
                    <input
                      name="experience"
                      value={doctor?.experience}
                      onChange={handleInputChange}
                      className="form-control"
                      type="text"
                      placeholder="Enter Experience"
                    />
                    <label>Experience</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-floating mb-3">
                    <input
                      name="phoneNumber"
                      value={doctor?.phoneNumber}
                      onChange={handleInputChange}
                      className="form-control"
                      type="number"
                      placeholder="Enter Phone Number"
                    />
                    <label>Phone Number</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-floating mb-3">
                    <input
                      name="age"
                      value={doctor?.age}
                      onChange={handleInputChange}
                      className="form-control"
                      type="number"
                      placeholder="Enter Age"
                    />
                    <label>Age</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-floating mb-3">
                    <input
                      name="email"
                      value={doctor?.email}
                      onChange={handleInputChange}
                      className="form-control"
                      type="email"
                      placeholder="Enter Doctor Email"
                    />
                    <label>Doctor Email</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-floating form-floating-select mb-3">
                    <select
                      name="country"
                      value={doctor?.country}
                      onChange={handleInputChange}
                      id="country"
                      className="form-select"
                    >
                      <option value="1">Select Country</option>
                      <option value="india">India</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="USA">USA</option>
                    </select>
                    <label htmlFor="country">Country</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-floating form-floating-select mb-3">
                    <select
                      name="state"
                      value={doctor?.state}
                      onChange={handleInputChange}
                      id="state"
                      className="form-select"
                    >
                      <option value="1">Select State</option>
                      <option value="gujrat">Gujarat</option>
                      <option value="rajastan">Rajastan</option>
                      <option value="panjab">Panjab</option>
                    </select>
                    <label htmlFor="state">State</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-floating form-floating-select mb-3">
                    <select
                      name="city"
                      value={doctor?.city}
                      onChange={handleInputChange}
                      id="city"
                      className="form-select"
                    >
                      <option value="1">Select City</option>
                      <option value="surat">Surat</option>
                      <option value="vadodara">Vadodara</option>
                      <option value="jamanagar">Jamanagar</option>
                    </select>
                    <label htmlFor="city">City</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-floating mb-3">
                    <input
                      name="zipCode"
                      value={doctor?.zipCode}
                      onChange={handleInputChange}
                      className="form-control"
                      type="number"
                      placeholder="Enter Zip Code"
                    />
                    <label>Zip Code</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-floating mb-3">
                    <input
                      name="doctorAddress"
                      value={doctor?.doctorAddress}
                      onChange={handleInputChange}
                      className="form-control"
                      type="text"
                      placeholder="Enter Doctor Address"
                    />
                    <label>Doctor Address</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-floating mb-3">
                    <input
                      name="description"
                      value={doctor?.description}
                      onChange={handleInputChange}
                      className="form-control"
                      type="text"
                      placeholder="Enter Description"
                    />
                    <label>Description</label>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="form-floating mb-3">
                    <input
                      name="consultationRate"
                      value={doctor?.consultationRate}
                      onChange={handleInputChange}
                      className="form-control"
                      type="number"
                      placeholder="₹ 0000"
                    />
                    <label>Online Consultation Rate</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="row g-3 mt-4">
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    name="currentHospital"
                    value={doctor?.currentHospital}
                    onChange={handleInputChange}
                    className="form-control"
                    type="text"
                    placeholder="Enter Doctor Current Hospital"
                  />
                  <label>Doctor Current Hospital</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    name="hospitalName"
                    value={doctor?.hospitalName}
                    onChange={handleInputChange}
                    className="form-control"
                    type="text"
                    placeholder="Enter Hospital Name"
                  />
                  <label>Hospital Name</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    name="doctorAddress"
                    value={doctor?.doctorAddress}
                    onChange={handleInputChange}
                    className="form-control"
                    type="text"
                    placeholder="Enter Hospital Address"
                  />
                  <label>Hospital Address</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    name="website"
                    value={doctor?.website}
                    onChange={handleInputChange}
                    className="form-control"
                    type="text"
                    placeholder="Enter Hospital Website Link"
                  />
                  <label>Hospital Website Link</label>
                </div>
              </div>

              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input
                    name="emergencyContact"
                    value={doctor?.emergencyContact}
                    onChange={handleInputChange}
                    className="form-control"
                    type="number"
                    placeholder="Enter Emergency Contact Number"
                  />
                  <label>Emergency Contact Number</label>
                </div>
              </div>
            </div>

            <div className="col-12 text-end mt-4">
              <button type="submit" className="save-btn" onClick={handleSave}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDoctor;
