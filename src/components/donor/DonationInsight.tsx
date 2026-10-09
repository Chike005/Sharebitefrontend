import { Card, Stack } from '@mui/material';
import DonationIcon from 'components/admin/dashboard/DonationDetailsIcon';
import { useDonation } from 'context/donationContext';

const DonationDetails = () => {
  const { currentUserDonations } = useDonation();

  const filteredDonation = currentUserDonations.filter(
    (donation) => donation.status.toUpperCase() === 'SUCCESSFUL',
  );
  return (
    <Stack>
      <Card
        sx={{
          borderRadius: '5px',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
          padding: 1,
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Stack
          direction="row"
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            pl: '10px',
          }}
        >
          <DonationIcon
            iconName="carbon:credentials"
            iconColor="#1e493c"
            iconTitle="Donations Made"
            IconNumber={currentUserDonations.length}
            iconBgColor="neutral.light"
          />
          <DonationIcon
            iconName="stash:shield-check-light"
            iconColor="#06c9a9"
            iconTitle="Succesful Donations"
            IconNumber={filteredDonation.length}
            iconBgColor="#cffff9"
          />
          <DonationIcon
            iconName="mdi:donation-outline"
            iconColor="#e30707"
            iconTitle="Pending Donations"
            IconNumber={currentUserDonations.length - filteredDonation.length}
            iconBgColor="#f7b5b5"
          />
        </Stack>
      </Card>
    </Stack>
  );
};

export default DonationDetails;
