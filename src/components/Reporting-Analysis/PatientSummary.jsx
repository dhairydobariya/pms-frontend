import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import classNames from "classnames";

const PatientSummary = () => {
  const [activeTab, setActiveTab] = useState("Week");

  // Sample data for weekly and daily views
  const weeklyData = [
    { day: "Mon", newPatient: 10, oldPatient: 20 },
    { day: "Tue", newPatient: 20, oldPatient: 30 },
    { day: "Wed", newPatient: 30, oldPatient: 15 },
    { day: "Thu", newPatient: 25, oldPatient: 35 },
    { day: "Fri", newPatient: 40, oldPatient: 25 },
    { day: "Sat", newPatient: 20, oldPatient: 45 },
    { day: "Sun", newPatient: 15, oldPatient: 30 },
  ];

  const dailyData = [
    { hour: "12 AM", newPatient: 5, oldPatient: 15 },
    { hour: "1 AM", newPatient: 10, oldPatient: 20 },
    { hour: "2 AM", newPatient: 8, oldPatient: 10 },
    { hour: "3 AM", newPatient: 6, oldPatient: 14 },
    { hour: "4 AM", newPatient: 12, oldPatient: 9 },
    { hour: "5 AM", newPatient: 15, oldPatient: 18 },
    { hour: "6 AM", newPatient: 20, oldPatient: 25 },
    { hour: "7 AM", newPatient: 12, oldPatient: 22 },
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const chartData = activeTab === "Week" ? weeklyData : dailyData;

  return (
    <div className="patients_summary_graph">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="patients_summary_graph-title">Patients Summary</h2>
        <div className="btn-group" role="group" aria-label="Tab buttons">
          <button
            className={`btn ${
              activeTab === "Week" ? "btn-active" : "btn-unactive"
            }`}
            onClick={() => handleTabChange("Week")}
          >
            Week
          </button>
          <button
            className={`btn ${
              activeTab === "Day" ? "btn-active" : "btn-unactive"
            }`}
            onClick={() => handleTabChange("Day")}
          >
            Day
          </button>
        </div>
      </div>

      {/* Line Chart */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={activeTab === "Week" ? "day" : "hour"} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="newPatient"
            stroke="#FFA500"
            activeDot={{ r: 8 }}
            name="New Patient"
          />
          <Line
            type="monotone"
            dataKey="oldPatient"
            stroke="#1E90FF"
            name="Old Patient"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PatientSummary;
