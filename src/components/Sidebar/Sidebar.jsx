import React from "react";
import "./Sidebar.scss";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, sidebarRef, activeLink }) => {
  return (
    <>
      <div
        ref={sidebarRef}
        className={`sidebar d-flex flex-column ${isOpen ? "open" : "closed"}`}
      >
        <div className="logo-section">
          <img
            src="/assets/images/logo.png"
            alt="Hospital Logo"
            className="logo img-fluid"
          />
        </div>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link
              to={"/"}
              className={`nav-link nav-links-1 ${
                activeLink === "/adminProfile" || activeLink === "/"
                  ? "active"
                  : ""
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to={"/doctor-management"}
              className={`nav-link nav-links-2 ${
                activeLink === "/doctor-management" ||
                activeLink === "/add-new-doctor" ||
                activeLink === "/edit-doctor/:id"
                  ? "active"
                  : ""
              }`}
            >
              Doctor Management
            </Link>
          </li>
          <li className="nav-item mb-3">
            <Link
              to={"/patient-management"}
              className={`nav-link nav-links-3 ${
                activeLink === "/patient-management" ? "active" : ""
              }`}
            >
              Patient Management
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link nav-links-4 collapsed ${
                activeLink.includes("/billing/") ? "active" : ""
              }`}
              to={"#billing"}
              data-bs-toggle="collapse"
              aria-expanded="false"
            >
              Billing And Payments
            </Link>
            <ul
              id="billing"
              className={`collapse ${
                activeLink.includes("/billing/") ? "show" : ""
              }`}
            >
              <li>
                <Link
                  to={"/billing/monitor-billing"}
                  className={`nav-link ${
                    activeLink === "/billing/monitor-billing" ||
                    activeLink === "/billing/pandingbills" ||
                    activeLink === "/billing/monitor-billing/invoice" ||
                    activeLink === "/billing/monitor-billing/pending-invoice" ||
                    activeLink ===
                      "/billing/monitor-billing/invoice-create-bill/:templateId" ||
                    activeLink === "/billing/monitor-billing/createBill" ||
                    activeLink === "/billing/monitor-billing/editInvoice" ||
                    activeLink === "/billing/monitor-billing/selectInvoiceTheme"
                      ? "active"
                      : ""
                  }`}
                >
                  Monitor Billing
                </Link>
              </li>
              <li>
                <Link
                  to={"/billing/insurance-claims"}
                  className={`nav-link ${
                    activeLink === "/billing/insurance-claims" ||
                    activeLink === "/billing/insurance-claims/Invoice"
                      ? "active"
                      : ""
                  }`}
                >
                  Insurance Claims
                </Link>
              </li>
              <li>
                <Link
                  to={"/billing/payment-process"}
                  className={`nav-link ${
                    activeLink === "/billing/payment-process" ||
                    activeLink === "/billing/payment-process/edit" ||
                    activeLink === "/billing/payment-process/invoice"
                      ? "active"
                      : ""
                  }`}
                >
                  Payment Process
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item mb-3">
            <Link
              to={"/analytics"}
              className={`nav-link nav-links-5 ${
                activeLink === "/analytics" ? "active" : ""
              }`}
            >
              Reporting and Analytics
            </Link>
          </li>
        </ul>
        <div className="logout-section">
          <a href="#logout" className="nav-link nav-links-6">
            Logout
          </a>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
