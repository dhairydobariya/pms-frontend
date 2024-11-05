import { Group } from "@mui/icons-material";

const DoctorCountDepartment = () => {
  const doctorData = [
    { name: "Cardiology", count: 8 },
    { name: "Endocrinologist", count: 22 },
    { name: "Gastroenterologist", count: 15 },
    { name: "Anesthesiologist", count: 11 },
    { name: "Pediatrician", count: 10 },
    { name: "Ophthalmologist", count: 8 },
    { name: "Orthopedic", count: 12 },
    { name: "Dermatologist", count: 9 },
    { name: "Neurologist", count: 18 },
    { name: "Oncologist", count: 14 },
    { name: "Urologist", count: 7 },
    { name: "Nephrologist", count: 13 },
    { name: "Pulmonologist", count: 16 },
    { name: "Rheumatologist", count: 6 },
    { name: "Gynecologist", count: 20 },
  ];

  return (
    <div className="doctor_count_department" style={{ maxHeight: "400px" }}>
      <div
        className="sticky top-0 bg-white z-10 border-b pb-2 mb-2"
        style={{ zIndex: 10 }}
      >
        <h2 className="doctor_count_department-title">
          Doctor Count Department
        </h2>
      </div>

      {/* Scrollable Data */}
      {doctorData.length === 0 ? (
        <div className="text-center" style={{ padding: "20px" }}>
          <img
            src="/assets/images/no-doctor-found.png"
            alt="No data found"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      ) : (
        <div className="overflow-y-auto" style={{ maxHeight: "250px" }}>
          <table className="table min-w-full">
            <thead>
              <tr className="table-header">
                <th className="rounded-end-0">Department Name</th>
                <th className="rounded-start-0 text-end">Doctor Count</th>
              </tr>
            </thead>
            <tbody>
              {doctorData.map((item, index) => (
                <tr key={index} className="border-bottom">
                  <td className="p-3">{item.name}</td>
                  <div className="text-end">
                    <td className="py-2 d-inline-flex align-items-center table-blue-rounded">
                      <img src="/assets/images/doctor-icon-2.svg" alt="doctor-icon-2" className="img-fluid" />
                      <span className="text-light-blue ms-2">{item.count}</span>
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

export default DoctorCountDepartment;
