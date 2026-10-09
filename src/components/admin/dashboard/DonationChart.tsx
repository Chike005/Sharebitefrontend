import { Card, Stack } from '@mui/material';
import DonationIcon from './DonationDetailsIcon';
import DonationPieChart from './DonationPieChart';
import { useDonation } from 'context/donationContext';
import { calculatePercentage, toUpperCase } from 'helpers/utils';

const DonationChart = () => {
  const { donations, users } = useDonation();

  const pendingDonation = donations.filter((donation) => {
    const matchDonation = donation.status.toUpperCase() === 'PENDING';
    return matchDonation;
  });

  const donors = users.filter((user) => {
    const matchUsers = toUpperCase(user.is_donor) === 'TRUE';
    return matchUsers;
  });

  const dataDonation: PieChartDataType[] = [
    {
      name: 'Successful',
      value: calculatePercentage(donations.length, donations.length - pendingDonation.length),
      color: '#06c9a9',
    },
    {
      name: 'Pending',
      value: calculatePercentage(donations.length, pendingDonation.length),
      color: '#1e493c',
    },
  ];

  const dataP: PieChartDataType[] = [
    {
      name: 'Donor',
      value: calculatePercentage(users.length, donors.length),
      color: '#e30707',
    },
    {
      name: 'Reciever',
      value: calculatePercentage(users.length, users.length - donors.length),
      color: '#f5ffc4',
    },
  ];

  return (
    <Stack
      spacing={1.5}
      direction={{ xs: 'column', md: 'row' }}
      sx={{ width: '100%' }}
    >
      <DonationPieChart
        data={dataDonation}
        titleheader="Donation Distribution"
        titleLenght={donations.length}
        centerTitle="Donations"
      />
      <DonationPieChart
        data={dataP}
        titleheader="People distribution"
        titleLenght={users.length}
        centerTitle="People"
      />
      <Stack
        spacing={1.5}
        direction="column"
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          width: { xs: '100%', md: '25.3%' },
        }}
      >
        <Card
          sx={{
            borderRadius: '5px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
            width: '100%',
            height: '50%',
            display: 'flex',
            pl: '10px',
            py: 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DonationIcon
            iconName="iconoir:network"
            iconColor="#e6ed0c"
            iconTitle="Successful Donations"
            IconNumber={donations.length - pendingDonation.length}
            iconBgColor="#f5ffc4"
          />
        </Card>
        <Card
          sx={{
            py: 3,
            pl: '10px',
            borderRadius: '5px',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
            width: '100%',
            height: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <DonationIcon
            iconName="streamline:interface-arrows-reload-2-arrows-load-arrow-sync-square-loading-reload-synchronize"
            iconColor="#0e80eb"
            iconTitle="Pending Donations"
            IconNumber={pendingDonation.length}
            iconBgColor="#e1effc"
          />
        </Card>
      </Stack>
    </Stack>
  );
};

export default DonationChart;
