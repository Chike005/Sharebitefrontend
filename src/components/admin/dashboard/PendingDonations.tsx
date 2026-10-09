import { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import DonationApiRequest from 'api/donation';

type DonationStatusFilter = 'all' | 'Pending' | 'Successful';
type CollectionStatusFilter = 'all' | Donation['collection_status'];

const collectionStatusLabels: Record<Donation['collection_status'], string> = {
  awaiting_dropoff: 'Awaiting drop-off',
  received_at_collection_point: 'Received at collection point',
};

const PendingDonations = () => {
  const queryClient = useQueryClient();
  const [donationStatusFilter, setDonationStatusFilter] =
    useState<DonationStatusFilter>('Pending');
  const [collectionStatusFilter, setCollectionStatusFilter] =
    useState<CollectionStatusFilter>('all');
  const [donationToConfirm, setDonationToConfirm] = useState<Donation | null>(
    null,
  );
  const [successMessage, setSuccessMessage] = useState('');

  const {
    data: donations = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['admin-dashboard-donations'],
    queryFn: async () => {
      const response = await DonationApiRequest.getAllDonations();
      return response.donations;
    },
  });

  const confirmMutation = useMutation({
    mutationFn: DonationApiRequest.confirmCollectionPointReceipt,
    onSuccess: async () => {
      setDonationToConfirm(null);
      setSuccessMessage('Donation marked as received at its collection point.');
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['admin-dashboard-donations'],
        }),
        queryClient.invalidateQueries({ queryKey: ['donations'] }),
      ]);
    },
  });

  const filteredDonations =
    donations.filter(
      (donation) =>
        (donationStatusFilter === 'all' ||
          donation.status === donationStatusFilter) &&
        (collectionStatusFilter === 'all' ||
          donation.collection_status === collectionStatusFilter),
    );

  const donorName = (donor: DonationDonor) =>
    [donor.first_name, donor.last_name].filter(Boolean).join(' ') ||
    donor.email ||
    `Donor #${donor.id}`;

  return (
    <Card sx={{ borderRadius: 2, boxShadow: 1 }}>
      <CardContent>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          alignItems={{ xs: 'stretch', sm: 'center' }}
          justifyContent="space-between"
          sx={{ mb: 2 }}
        >
          <Box>
            <Typography variant="h6" component="h2">
              Collection-point donations
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Review donations and confirm when they arrive.
            </Typography>
          </Box>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1}>
            <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 170 } }}>
              <Select
                value={donationStatusFilter}
                onChange={(event) =>
                  setDonationStatusFilter(
                    event.target.value as DonationStatusFilter,
                  )
                }
                inputProps={{ 'aria-label': 'Filter by donation status' }}
              >
                <MenuItem value="all">All donation statuses</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Successful">Successful</MenuItem>
              </Select>
            </FormControl>
            <FormControl size="small" sx={{ minWidth: { xs: '100%', sm: 190 } }}>
              <Select
                value={collectionStatusFilter}
                onChange={(event) =>
                  setCollectionStatusFilter(
                    event.target.value as CollectionStatusFilter,
                  )
                }
                inputProps={{
                  'aria-label': 'Filter by collection-point status',
                }}
              >
                <MenuItem value="all">All collection statuses</MenuItem>
                <MenuItem value="awaiting_dropoff">Awaiting drop-off</MenuItem>
                <MenuItem value="received_at_collection_point">
                  Received at collection point
                </MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Stack>

        {successMessage && (
          <Alert
            severity="success"
            onClose={() => setSuccessMessage('')}
            sx={{ mb: 2 }}
          >
            {successMessage}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error instanceof Error
              ? error.message
              : 'Could not load donations. Please try again.'}
          </Alert>
        )}

        {isLoading ? (
          <Typography role="status" color="text.secondary">
            Loading donations…
          </Typography>
        ) : error ? null : filteredDonations.length === 0 ? (
          <Typography color="text.secondary">
            {donationStatusFilter === 'all' &&
            collectionStatusFilter === 'all'
              ? 'There are no donations to review yet.'
              : 'No donations match these status filters.'}
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {filteredDonations.map((donation) => (
              <Grid item xs={12} key={donation.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Stack
                      direction={{ xs: 'column', sm: 'row' }}
                      spacing={2}
                      justifyContent="space-between"
                      alignItems={{ xs: 'stretch', sm: 'center' }}
                    >
                      <Box sx={{ minWidth: 0 }}>
                        <Stack
                          direction={{ xs: 'column', sm: 'row' }}
                          spacing={1}
                          alignItems={{ xs: 'flex-start', sm: 'center' }}
                          sx={{ mb: 1 }}
                        >
                          <Typography variant="subtitle1" fontWeight={600}>
                            {donation.title}
                          </Typography>
                          <Chip
                            size="small"
                            label={collectionStatusLabels[donation.collection_status]}
                            color={
                              donation.collection_status ===
                              'received_at_collection_point'
                                ? 'success'
                                : 'warning'
                            }
                          />
                        </Stack>
                        <Typography variant="body2" color="text.secondary">
                          {donation.description}
                        </Typography>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          Donor: {donorName(donation.donor)}
                        </Typography>
                        <Typography variant="body2">
                          Collection point:{' '}
                          {donation.collection_point_details?.name ??
                            'Not specified'}
                          {donation.collection_point_details?.address
                            ? ` — ${donation.collection_point_details.address}`
                            : ''}
                        </Typography>
                        <Typography variant="body2">
                          Submitted:{' '}
                          {new Date(donation.created_at).toLocaleString()}
                        </Typography>
                        <Typography variant="body2">
                          Donation status: {donation.status}
                        </Typography>
                        {donation.quantity != null && (
                          <Typography variant="body2">
                            Quantity: {donation.quantity}
                          </Typography>
                        )}
                        {donation.expiry_date && (
                          <Typography variant="body2">
                            Best before: {donation.expiry_date}
                          </Typography>
                        )}
                      </Box>
                      {donation.collection_status === 'awaiting_dropoff' && (
                        <Button
                          variant="contained"
                          sx={{ flexShrink: 0 }}
                          disabled={confirmMutation.isPending}
                          onClick={() => {
                            setSuccessMessage('');
                            confirmMutation.reset();
                            setDonationToConfirm(donation);
                          }}
                        >
                          Confirm received
                        </Button>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </CardContent>

      <Dialog
        open={donationToConfirm !== null}
        onClose={() => {
          if (!confirmMutation.isPending) setDonationToConfirm(null);
        }}
        fullWidth
        maxWidth="xs"
      >
        <DialogTitle>Confirm collection-point receipt?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Mark “{donationToConfirm?.title}” as received at{' '}
            {donationToConfirm?.collection_point_details?.name ??
              'its selected collection point'}
            ? Receivers will then be able to reserve it.
          </DialogContentText>
          {confirmMutation.error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {confirmMutation.error.message ||
                'Could not update this donation. Please try again.'}
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDonationToConfirm(null)}
            disabled={confirmMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={!donationToConfirm || confirmMutation.isPending}
            onClick={() => {
              if (donationToConfirm && !confirmMutation.isPending) {
                confirmMutation.mutate(donationToConfirm.id);
              }
            }}
          >
            {confirmMutation.isPending ? 'Confirming…' : 'Confirm received'}
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default PendingDonations;
