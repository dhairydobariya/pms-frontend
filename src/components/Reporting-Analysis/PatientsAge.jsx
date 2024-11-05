import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const PatientsAge = () => {
  const data = [
    { name: '0-2 Years', value: 8, color: '#F65D79' },
    { name: '3-12 Years', value: 12, color: '#506EF2' },
    { name: '13-19 Years', value: 20, color: '#51D2A6' },
    { name: '20-39 Years', value: 18, color: '#F6A52D' },
    { name: '40-59 Years', value: 8, color: '#FACF2E' },
    { name: '60 And Above', value: 34, color: '#9253E1' },
  ];

  const totalPatients = data.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <div className='patient_age_container h-100'>
      <h2 className="patient_age_title">Patients Age</h2>
      <div className="d-flex justify-content-between">
        
        <div className="position-relative d-flex justify-content-center align-items-center">
          {/* Donut Chart */}
          <PieChart width={200} height={200}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          {/* Total Patients */}
          <div className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center total-count-box">
            <div className="text-center">
              <p className="text-muted mb-1">Total Patients</p>
              <p className="total-count-number">{totalPatients}</p>
            </div>
          </div>
        </div>

        {/* Age Group Legend */}
        <div className="mt-4">
          {data.map((entry, index) => (
            <div key={index} className="d-flex justify-content-between align-items-center my-2">
              <div className="d-flex align-items-center">
                <span
                  className="d-inline-block rounded-circle mr-2"
                  style={{ backgroundColor: entry.color, width: '10px', height: '10px' }}
                ></span>
                <p className="mb-0">{entry.name}</p>
              </div>
              <p className="text-muted mb-0">{`${entry.value}%`}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientsAge;
