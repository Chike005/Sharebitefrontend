import { Button, Popover, Stack, Typography } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import DonationApiRequest from 'api/donation';
import IconifyIcon from 'components/base/IconifyIcon';
import { useBreakpoints } from 'providers/useBreakpoints';
import toast from 'react-hot-toast';
import { Fragment } from 'react/jsx-runtime';

interface CancelReservationDropdownProps {
  onClose: () => void;
  open: HTMLElement | null;
  donationData?: Donation;
}

const CancelReservation = ({
  open,
  onClose,
  donationData,
}: CancelReservationDropdownProps) => {
  const { up } = useBreakpoints();
  const upSM = up('sm');
  const queryClient = useQueryClient();

  const canceldonationMutation = useMutation({
    mutationFn: DonationApiRequest.cancelDonation,
    async onSuccess() {
      toast.success('Cancel Successfully!', { id: 'async' });
      onClose();
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['donations'] }),
        queryClient.invalidateQueries({ queryKey: ['reservations'] }),
      ]);
    },
    onError(error) {
      toast.error(error.message, { id: 'async' });
    },
  });

  const handleSubmit = () => {
    toast.loading('Canceling...', { id: 'async' });
    canceldonationMutation.mutate(donationData!.id);
  };

  return (
    <Fragment>
      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={onClose}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        transformOrigin={{ vertical: 'center', horizontal: 'center' }}
        slotProps={{
          paper: {
            sx: {
              p: 2,
              ml: 0.75,
              width: 300,
              bgcolor: 'common.white',
              borderRadius: '3%',
            },
          },
        }}
      >
        <Stack>
          <Typography
            variant="h4"
            fontWeight="700"
            fontSize="15px"
            sx={{
              textAlign: 'center',
              alignSelf: 'center',
            }}
          >
            Are you sure you want to cancel pickup?
          </Typography>
          <IconifyIcon
            icon="typcn:warning"
            color="red"
            sx={{
              width: 100,
              height: 100,
              mt: 2,
              mb: 2,
              alignSelf: 'center',
              justifySelf: 'center',
            }}
          />
        </Stack>
        <Stack direction="row" justifyContent="space-between">
          <Button
            size={upSM ? 'large' : 'medium'}
            type="submit"
            variant="contained"
            color="error"
            sx={{ fontSize: 13 }}
            disabled={canceldonationMutation.isPending}
            onClick={handleSubmit}
          >
            Yes
          </Button>
          <Button
            size={upSM ? 'large' : 'medium'}
            type="submit"
            variant="contained"
            color="primary"
            sx={{ fontSize: 13 }}
            disabled={canceldonationMutation.isPending}
            onClick={onClose}
          >
            No
          </Button>
        </Stack>
      </Popover>
    </Fragment>
  );
};

export default CancelReservation;
