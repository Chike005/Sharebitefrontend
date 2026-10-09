import { Grid } from '@mui/material';
import DonationChart from 'components/admin/dashboard/DonationChart';
import DonationDetails from 'components/admin/dashboard/DonationDetails';
import PendingDonations from 'components/admin/dashboard/PendingDonations';

const Dashboard = () => {
  return (
    <Grid container mb={3} spacing={{ xs: 2.5, sm: 3 }}>
      {/* ------------- Card section ---------------- */}
      <Grid item xs={12} zIndex={1}>
        <DonationDetails />
      </Grid>
      <Grid item xs={12}>
        <PendingDonations />
      </Grid>
      <Grid item xs={12}>
        <DonationChart />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
