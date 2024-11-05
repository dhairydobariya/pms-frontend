import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import "./PatientsSummary.scss";

const PatientsSummary = () => {
  const data = [
    { name: "New Patients", value: 35, color: "#FFA500" },
    { name: "Old Patients", value: 65, color: "#4CAF50" },
  ];

  const totalPatients = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="summary-card">
      <h5 className="summary-title">Patients Summary</h5>
      <div className="d-flex flex-lg-row flex-column align-items-center">
        <div
          className="position-relative"
          style={{ width: "200px", height: "200px" }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div
            className="position-absolute top-50 start-50 translate-middle text-center"
            style={{ width: "100px" }}
          >
            <div className="total-pat">Total Patients</div>
            <div className="total-pers">{totalPatients}</div>
          </div>
        </div>
        <div className="chart-detalis">
          {data.map((item, index) => (
            <div
              key={index}
              className="d-flex justify-content-between align-items-center mb-4"
            >
              <div className="d-flex align-items-center">
                <div
                  className="chart-box"
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: item.color,
                    marginRight: "8px",
                  }}
                />
                <span className="chart-data">{item.name}</span>
              </div>
              <span style={{ color: item.color, fontWeight: 600, fontSize: "18px" }} className="ms-4">
                {item.value}
              </span>
            </div>
          ))}
          <div className="d-flex justify-content-between align-items-center mt-2">
            <div className="d-flex align-items-center">
              <div
                className="chart-box"
                style={{
                  width: "12px",
                  height: "12px",
                  backgroundColor: "#007bff",
                  marginRight: "8px",
                }}
              />
              <span className="chart-data">Total Patients</span>
            </div>
            <span className="total-pers-2 ms-4">{totalPatients}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientsSummary;
