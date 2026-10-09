import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import ImageUpload from 'components/base/ImageUpload';
import Details from './DetailsComponents';
import { dateFormatFromUTC, transformBool } from 'helpers/utils';
import ImagePreview from 'components/base/ImagePreview';
import { useMutation } from '@tanstack/react-query';
import DonationApiRequest from 'api/donation';
import toast from 'react-hot-toast';
import { useUser } from 'context/userContext';
import DropOffMap from 'components/base/DropOffMap';

const DonationView = ({ onClose, donation, mode }: DonationViewProps) => {
  const { user } = useUser();
  const mapsEnabled = Boolean(import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim());

  const reservedonationMutation = useMutation({
    mutationFn: DonationApiRequest.reserveDonation,
    onSuccess() {
      toast.success('Reserved Successfully!', { id: 'async' });
      onClose();
    },
    onError(error) {
      toast.error(error.message, { id: 'async' });
    },
  });

  const handleReservation = async () => {
    toast.loading('Reserving...', { id: 'async' });
    reservedonationMutation.mutate(donation.id);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          width: '100%',
          height: '100%',
          position: 'fixed',
          left: 0,
          right: 0,
          zIndex: 1111,
          top: 0,
        }}
      />
      <Box
        sx={{
          borderRadius: 5,
          position: 'fixed',
          top: 0,
          right: 0,
          width: { xs: '100%', md: '50%' },
          height: '100%',
          background: '#fff',
          zIndex: 1112,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'scroll',
          p: 2,
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)',
          transition: 'all 0.9s ease-in-out',
        }}
      >
        <Box
          sx={{
            position: 'relative',
            flexGrow: 1,
            overflow: 'auto',
            p: 2,
          }}
        >
          <Button
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            {/* close button svg */}
          </Button>
          <Grid sx={{ paddingTop: 5, width: '100%' }}>
            <>
              <Typography variant="h4" fontWeight="700" fontSize="15px">
                Donation Details
              </Typography>
              <Typography
                color="textSecondary"
                variant="body1"
                fontWeight="400"
                sx={{ mb: 2.5, mt: 1.5, fontSize: 12 }}
              >
                Please enter details for the donations
              </Typography>

              <Stack spacing={3} position="relative">
                <Details
                  titleLeft="Title"
                  titleRight="Description"
                  labelLeft={donation.title}
                  labelRight={donation.description}
                />
                <Details
                  titleLeft="Reserved"
                  titleRight="Delievered"
                  labelLeft={transformBool(donation.is_reserved)}
                  labelRight={transformBool(donation.is_delivered)}
                />
                <Details
                  titleLeft="Quantity"
                  titleRight="Best before"
                  labelLeft={donation.quantity ? String(donation.quantity) : 'Not specified'}
                  labelRight={donation.expiry_date || 'Not specified'}
                />
                <Details
                  titleLeft="Dropoff location"
                  titleRight="Donated at"
                  labelLeft={donation.collection_point_details.name}
                  labelRight={dateFormatFromUTC(donation.created_at)}
                />
                <Details
                  titleLeft="Collection point address"
                  titleRight="Drop-off status"
                  labelLeft={donation.collection_point_details.address}
                  labelRight={
                    donation.collection_status === 'received_at_collection_point'
                      ? 'Received at collection point'
                      : 'Awaiting drop-off'
                  }
                />

                {donation.food_image && (
                  <Box>
                    <Typography variant="body2" fontWeight={700} mb={1}>
                      Food photo
                    </Typography>
                    <Box
                      component="img"
                      src={donation.food_image}
                      alt={`Photo of ${donation.title}`}
                      sx={{
                        display: 'block',
                        width: '100%',
                        maxWidth: 480,
                        maxHeight: 320,
                        objectFit: 'cover',
                        borderRadius: 3,
                      }}
                    />
                  </Box>
                )}

                {mapsEnabled &&
                  donation.collection_point_details.latitude &&
                  donation.collection_point_details.longitude && (
                    <Box mt={2}>
                      <Typography variant="body2" fontWeight="500" mb={1}>
                        Collection point on map
                      </Typography>
                      <DropOffMap
                        lat={donation.collection_point_details.latitude}
                        lng={donation.collection_point_details.longitude}
                      />
                    </Box>
                  )}
                {!mapsEnabled && (
                  <Typography variant="caption" color="text.secondary">
                    Map view is optional and has not been configured.
                  </Typography>
                )}

                <Details
                  titleLeft="Donor Name"
                  titleRight="Donor Email"
                  labelLeft={`${donation.donor.first_name} ${donation.donor.last_name}`}
                  labelRight={donation.donor.email}
                />
                {mode === 'Reserved' ? (
                  <Stack alignItems="center" justifyContent="center">
                    <Typography
                      color="textSecondary"
                      variant="body1"
                      fontWeight="400"
                      sx={{ mb: 2.5, mt: 1.5, fontSize: 12 }}
                    >
                      Donation Proof
                    </Typography>
                    <ImagePreview logo={donation.proof?.proof_image} />
                  </Stack>
                ) : donation.proof?.proof_image === undefined ? (
                  <ImageUpload id={donation.id} userid={user!.id} mode="proof" />
                ) : (
                  <Stack alignItems="center" justifyContent="center">
                    <Typography
                      color="textSecondary"
                      variant="body1"
                      fontWeight="400"
                      sx={{ mb: 2.5, mt: 1.5, fontSize: 12 }}
                    >
                      Donation Proof
                    </Typography>
                    <ImagePreview logo={donation.proof?.proof_image} />
                  </Stack>
                )}
              </Stack>
            </>
          </Grid>
        </Box>

        {mode === 'Reserved' && (
          <Box
            sx={{
              mt: 3,
              mb: 0,
              background: '#',
              zIndex: 1112,
              borderTop: '1px solid #c7ebfc',
              p: 1,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: 11,
                fontWeight: 600,
                my: 1.5,
                textTransform: 'uppercase',
              }}
            >
              {donation.collection_status !== 'received_at_collection_point'
                ? 'This donation can be reserved once an administrator confirms it has reached the collection point.'
                : ''}
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                sx={{ fontSize: 12, width: 150 }}
                onClick={handleReservation}
                disabled={
                  donation.collection_status !== 'received_at_collection_point' ||
                  reservedonationMutation.isPending
                }
              >
                Reserve
              </Button>
            </Stack>
          </Box>
        )}
      </Box>
    </>
  );
};

export default DonationView;
