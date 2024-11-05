import { People, Repeat, LocalHospital, Assignment } from '@mui/icons-material';
import InfoCard from './InfoCard';

const CardData = () => {
  return (
    <div className="row">
      <div className="col-md-3 mb-3 people-card">
        <InfoCard
          icon={<People className="text-primary" />} 
          label="Total Patients"
          value="1500"
          iconBgColor="bg-light-blue"
        />
      </div>
      <div className="col-md-3 mb-3 repeat-card">
        <InfoCard
          icon={<Repeat className="text-purple" />}
          label="Repeat Patient"
          value="500"
          iconBgColor="bg-light-purple"
        />
      </div>
      <div className="col-md-3 mb-3 hospital-card">
        <InfoCard
          icon={<LocalHospital className="text-success" />}
          label="Admitted Patient"
          value="1000"
          iconBgColor="bg-light-green"
        />
      </div>
      <div className="col-md-3 mb-3 assignment-card">
        <InfoCard
          icon={<Assignment className="text-purple" />}
          label="Total Claim"
          value="250"
          iconBgColor="bg-lighter-purple"
        />
      </div>
    </div>
  );
};

export default CardData;
