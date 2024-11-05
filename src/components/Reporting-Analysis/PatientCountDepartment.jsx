import { Group } from "@mui/icons-material";
import React from "react";

const PatientCountDepartment = () => {
  // Sample data
  const departments = [
    { name: "Cardiology", count: 105 },
    { name: "Endocrinologist", count: 254 },
    { name: "Gastroenterologist", count: 657 },
    { name: "Anesthesiologist", count: 2 },
    { name: "Pediatrician", count: 784 },
    { name: "Ophthalmologist", count: 254 },
    { name: "Orthopedic", count: 321 },
    { name: "Dermatologist", count: 567 },
    { name: "Neurologist", count: 189 },
    { name: "Oncologist", count: 421 },
    { name: "Urologist", count: 935 },
    { name: "Nephrologist", count: 117 },
    { name: "Pulmonologist", count: 654 },
    { name: "Rheumatologist", count: 270 },
    { name: "Gynecologist", count: 819 },
    { name: "Otolaryngologist", count: 463 },
    { name: "Pathologist", count: 198 },
    { name: "Radiologist", count: 742 },
    { name: "Psychiatrist", count: 351 },
    { name: "General Surgeon", count: 627 },
  ];

  return (
    <div className="patient_count_department" style={{ maxHeight: "400px" }}>
      <div
        className="position-sticky bg-white top-0 pb-2 mb-2"
        style={{ zIndex: 10 }}
      >
        <h2 className="patient_count_department-title">
          Patients Count Department
        </h2>
      </div>

      {departments.length === 0 ? (
        <div className="text-center" style={{ padding: "20px" }}>
          <img src="/assets/images/no-patient-found.png" alt="No data found" style={{ maxWidth: "100%", height: "auto" }} />
        </div>
      ) : (
        <div className="overflow-auto" style={{ maxHeight: "250px" }}>
          <table className="table min-w-full table-borderless">
            <thead>
              <tr className="table-header">
                <th className="rounded-end-0">Department Name</th>
                <th className="rounded-start-0 text-end">Patient Count</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept, index) => (
                <tr key={index} className="border-bottom">
                  <td className="py-2">{dept.name}</td>
                  <div className="text-end">
                    <td className="py-2 d-inline-flex align-items-center table-rounded">
                      <Group className="text-dark-green" />
                      <span className="text-dark-green ms-2">{dept.count}</span>
                    </td>
                  </div>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PatientCountDepartment;
