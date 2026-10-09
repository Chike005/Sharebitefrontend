import { Stack, Typography, Card } from '@mui/material';
import DonationIcon from './DonationDetailsIcon';
import { useDonation } from 'context/donationContext';
import { toUpperCase } from 'helpers/utils';

const DonationDetails = () => {
  const { donations, users } = useDonation();

  const donors = users.filter((user) => {
    const matchUsers = toUpperCase(user.is_donor) === 'TRUE';
    return matchUsers;
  });
  return (
    <Stack>
      <Stack direction="row" alignItems="center" sx={{ pt: 3, pb: 2.5 }}>
        <Typography
          sx={{
            fontSize: {
              xs: 'body2.fontSize',
              md: 'h6.fontSize',
              xl: 'h4.fontSize',
            },
            fontWeight: 500,
          }}
        >
          Doantions Analysis
        </Typography>
        <Typography
          sx={{
            fontSize: { xs: 'overline.fontSize', md: 'caption.fontSize' },
            fontWeight: 'bold',
            color: 'primary.main',
            ml: 1,
            backgroundColor: 'neutral.light',
            padding: '7px',
          }}
        >
          ALL TIME
        </Typography>
      </Stack>
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
            iconTitle="Donors"
            IconNumber={donors.length}
            iconBgColor="neutral.light"
          />
          <DonationIcon
            iconName="stash:shield-check-light"
            iconColor="#06c9a9"
            iconTitle="Recievers"
            IconNumber={users.length - donors.length}
            iconBgColor="#cffff9"
          />
          <DonationIcon
            iconName="mdi:donation-outline"
            iconColor="#e30707"
            iconTitle="Donations Made"
            IconNumber={donations.length}
            iconBgColor="#f7b5b5"
          />
          {/* <DonationIcon
            iconName="hugeicons:pickup-02"
            iconColor="black"
            iconTitle="Ongoing Donations"
            IconNumber={105}
            iconBgColor="#cfcccc"
          /> */}
        </Stack>
      </Card>
    </Stack>
  );
};

export default DonationDetails;
