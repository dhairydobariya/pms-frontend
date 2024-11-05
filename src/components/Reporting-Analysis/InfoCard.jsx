const InfoCard = ({ icon, label, value, bgColor, iconBgColor }) => {
  return (
    <div className="bg-white d-flex align-items-center justify-content-between gap-4 w-100">
      <div className="d-flex align-items-center">
        <div className={`p-3 rounded-circle ${iconBgColor}`}>{icon}</div>
        <p className="card-text ms-3">{label}</p>
      </div>
      <p className="card-count">{value}</p>
    </div>
  );
};
export default InfoCard;
