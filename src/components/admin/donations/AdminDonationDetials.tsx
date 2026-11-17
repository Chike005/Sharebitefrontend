import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import DonationApiRequest from 'api/donation';
import ImagePreview from 'components/base/ImagePreview';
import Details from 'components/donor/DetailsComponents';
import { dateFormatFromUTC, transformBool } from 'helpers/utils';
import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const AdminDonationDetails = ({ onClose, donation }: ReceiptProps) => {
  const queryClient = useQueryClient();
  const confirmReceiptMutation = useMutation({
    mutationFn: DonationApiRequest.confirmCollectionPointReceipt,
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['donations'] });
      toast.success('Collection point receipt confirmed.', { id: 'async' });
      onClose();
    },
    onError(error) {
      toast.error(error.message, { id: 'async' });
    },
  });
  const updateStatusMutation = useMutation({
    mutationFn: DonationApiRequest.updateDonationStatus,
    onSuccess() {
      toast.success('status updated', { id: 'async' });
      onClose();
    },
    onError(error) {
      toast.error(error.message, { id: 'async' });
    },
  });
  const handleConfirm = async () => {
    toast.loading('confirming...', { id: 'async' });
    updateStatusMutation.mutate({
      status: 'Successful',
      donation_id: donation.id,
    });
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
            <svg
              width="36"
              height="36"
              viewBox="0 0 36 36"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="36" height="36" rx="18" fill="#F2F3F3" />
              <path
                d="M18.7031 18L24.0938 23.3984L23.3906 24.1016L17.9922 18.7109L12.5938 24.1016L11.8906 23.3984L17.2812 18L11.8906 12.6016L12.5938 11.8984L17.9922 17.2891L23.3906 11.8984L24.0938 12.6016L18.7031 18Z"
                fill="#333333"
                stroke="#333333"
                strokeWidth="1.2"
              />
            </svg>
          </Button>
          <Grid
            sx={{
              paddingTop: 5,
              width: '100%',
            }}
          >
            <>
              <Typography variant="h4" fontWeight="700" fontSize="15px">
                Donation Receipt
              </Typography>
              <Typography
                color="textSecondary"
                variant="body1"
                fontWeight="400"
                sx={{ mb: 2.5, mt: 1.5, fontSize: 12 }}
              >
                Donation details
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
                  labelLeft={donation.location}
                  labelRight={dateFormatFromUTC(donation.created_at)}
                />
                <Details
                  titleLeft="Donor Name"
                  titleRight="Donor Email"
                  labelLeft={`${donation.donor.first_name} ${donation.donor.last_name}`}
                  labelRight={donation.donor.email || 'Unavailable'}
                />
                <Details
                  titleLeft="Pickup Location"
                  titleRight="Pickup Date"
                  labelLeft={donation.location}
                  labelRight={
                    donation.receipt != undefined
                      ? dateFormatFromUTC(donation.receipt.pickup_date)
                      : 'Not picked up yet'
                  }
                />
                <Details
                  titleLeft="Collection point"
                  titleRight="Drop-off workflow"
                  labelLeft={donation.collection_point_details.name}
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
                <Details
                  titleLeft="Reciver Name"
                  titleRight="Reciever Email"
                  labelLeft={
                    donation.reserved_by != undefined
                      ? `${donation.reserved_by!.first_name} ${donation.reserved_by!.last_name}`
                      : 'Not Reserved yet'
                  }
                  labelRight={
                    donation.reserved_by != undefined
                      ? donation.reserved_by!.email || 'Unavailable'
                      : 'Not Reserved yet'
                  }
                />
                <Typography
                  color="textSecondary"
                  variant="body1"
                  fontWeight="400"
                  sx={{ mb: 2.5, mt: 1.5, fontSize: 12 }}
                >
                  Proofs
                </Typography>
                <Stack
                  direction="row"
                  sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 2,
                    width: '100%',
                  }}
                >
                  <Stack
                    direction="column"
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <ImagePreview logo={donation.proof?.proof_image} />
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: 11,
                        fontWeight: 600,
                        mt: 1,
                      }}
                    >
                      Donation Proof
                    </Typography>
                  </Stack>
                  <Stack
                    direction="column"
                    sx={{
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <ImagePreview logo={donation.receipt?.proof_image} />
                    <Typography
                      variant="h4"
                      sx={{
                        fontSize: 11,
                        fontWeight: 600,
                        mt: 1,
                      }}
                    >
                      Pickup Proof
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </>
          </Grid>
        </Box>
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
            {donation.proof === null
              ? 'This Donation cannot be confirmed yet until the donor provides a proof of donation!'
              : ''}
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            {donation.collection_status === 'awaiting_dropoff' && (
              <Button
                onClick={() =>
                  confirmReceiptMutation.mutate(donation.id)
                }
                variant="contained"
                color="success"
                disabled={confirmReceiptMutation.isPending}
              >
                {confirmReceiptMutation.isPending
                  ? 'Confirming receipt…'
                  : 'Confirm received at collection point'}
              </Button>
            )}
            {donation.status.toUpperCase() === 'PENDING' ? (
              <Button
                onClick={handleConfirm}
                variant="contained"
                color="primary"
                sx={{
                  fontSize: 12,
                  width: 150,
                }}
                disabled={donation.proof === null ? true : false}
              >
                Confirm Donation
              </Button>
            ) : (
              <Typography
                variant="h4"
                sx={{
                  fontSize: 11,
                  fontWeight: 600,
                  my: 1.5,
                  textTransform: 'uppercase',
                }}
              >
                {' '}
                donation confirmed!!{' '}
              </Typography>
            )}
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default AdminDonationDetails;
