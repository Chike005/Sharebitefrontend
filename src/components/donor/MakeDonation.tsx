import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import DonationApiRequest from 'api/donation';
import { useUser } from 'context/userContext';
import { useFormValidation } from 'hooks/useFormValidation';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import DonationSchemas from 'schema/donation';
import DropOffMapSelector from 'components/base/DropOffMapSelector';
import { string } from 'zod';

interface MakeDonationProps {
  onClose: () => void;
}

const MakeDonation = ({ onClose }: MakeDonationProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const { user } = useUser();

  const { validate } = useFormValidation(
    DonationSchemas.makeDonation.extend({
      expiry_date: string(),
    }),
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
          toast.error('Unable to access location. Please enable GPS.');
        },
      );
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const makeDonationMutation = useMutation({
    mutationFn: (data: MakeDonation) => DonationApiRequest.makeDonation(data),
    onSuccess(data) {
      toast.success('Donation successful', { id: 'asyntoast' });
      console.log(data);
      onClose();
    },
    onError(error) {
      toast.error(error.message, { id: 'asyntoast' });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const lat = userLocation?.lat ?? 0;
    const lng = userLocation?.lng ?? 0;
    const locationString = `${lat},${lng}`;

    if (
      validate({
        title,
        description,
        expiry_date: expiryDate,
        location: locationString,
      })
    ) {
      toast.loading('Donating...', { id: 'asyntoast' });

      makeDonationMutation.mutate({
        title,
        description,
        quantity,
        expiry_date: expiryDate,
        location: locationString, // ✅ Always a string
        latitude: lat,
        longitude: lng,
        donor: user?.id,
      });
    }
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
          width: { xs: '100%', md: '60%' },
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
        <Box sx={{ position: 'relative', flexGrow: 1, overflow: 'auto', p: 2 }}>
          <Button onClick={onClose} sx={{ position: 'absolute', top: 0, left: 0 }}>
            Close
          </Button>
          <Grid sx={{ paddingTop: 5, width: '100%' }}>
            <Typography variant="h4" fontWeight="700" fontSize="15px">
              Make a Donation
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
              fontWeight="400"
              sx={{ mb: 2.5, mt: 1.5, fontSize: 12 }}
            >
              Please enter details for the donation
            </Typography>

            <Stack spacing={3}>
              <TextField
                name="title"
                label="Donation Title *"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                name="description"
                label="Description *"
                multiline
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                name="quantity"
                label="Quantity *"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <TextField
                name="expiry_date"
                label="Expiry Date *"
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
              />

              <Typography fontSize={13} fontWeight={500}>
                Select Drop-off Location on Map *
              </Typography>
              <DropOffMapSelector
                onLocationSelect={(lat, lng) => {
                  setUserLocation({ lat, lng });
                }}
              />

              {userLocation && (
                <Typography sx={{ fontSize: '12px', color: 'gray', mt: 1 }}>
                  📍 Selected Location: {userLocation.lat.toFixed(5)}, {userLocation.lng.toFixed(5)}
                </Typography>
              )}
            </Stack>
          </Grid>
        </Box>
        <Box sx={{ mt: 3, borderTop: '1px solid #c7ebfc', p: 1 }}>
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              sx={{ fontSize: 12, width: 150 }}
              onClick={handleSubmit}
            >
              {makeDonationMutation.isPending ? 'Donating...' : 'Donate'}
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default MakeDonation;
