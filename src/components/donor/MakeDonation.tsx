import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import DonationApiRequest from 'api/donation';
import DroffSiteApiRequest from 'api/droffoff';
import { useUser } from 'context/userContext';
import { useFormValidation } from 'hooks/useFormValidation';
import { useEffect, useRef, useState } from 'react';
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
  const [foodImage, setFoodImage] = useState<File | null>(null);
  const [foodImageError, setFoodImageError] = useState('');
  const [selectedPointId, setSelectedPointId] = useState<number | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [collectionPointError, setCollectionPointError] = useState('');
  const foodImageInputRef = useRef<HTMLInputElement>(null);
  const [foodImagePreview, setFoodImagePreview] = useState('');
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { data, isLoading, error } = useQuery({
    queryKey: ['collection-points'],
    queryFn: DroffSiteApiRequest.getCollectionPoints,
  });
  const collectionPoints = data?.collectionPoints ?? [];
  const selectedPoint = collectionPoints.find(
    (point) => point.id === selectedPointId,
  );
  const mapsEnabled = Boolean(import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim());

  useEffect(() => {
    if (!foodImage) {
      setFoodImagePreview('');
      return;
    }

    const previewUrl = URL.createObjectURL(foodImage);
    setFoodImagePreview(previewUrl);
    return () => URL.revokeObjectURL(previewUrl);
  }, [foodImage]);

  const { validate } = useFormValidation(
    DonationSchemas.makeDonation.extend({
      expiry_date: string(),
    }),
  );

  const makeDonationMutation = useMutation({
    mutationFn: (donation: MakeDonation) =>
      DonationApiRequest.makeDonation(donation),
    async onSuccess() {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['donations'] }),
        queryClient.invalidateQueries({ queryKey: ['cdonation'] }),
      ]);
      toast.success('Donation submitted. Please take it to the selected point.', {
        id: 'asyntoast',
      });
      onClose();
    },
    onError(mutationError) {
      toast.error(mutationError.message, { id: 'asyntoast' });
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedPoint) {
      setCollectionPointError('Choose a collection point before continuing.');
      return;
    }

    setCollectionPointError('');
    if (
      !validate({
        title,
        description,
        expiry_date: expiryDate,
        location: selectedPoint.address,
      })
    ) {
      return;
    }

    toast.loading('Submitting donation...', { id: 'asyntoast' });
    makeDonationMutation.mutate({
      title,
      description,
      quantity,
      expiry_date: expiryDate,
      location: selectedPoint.address,
      collection_point: selectedPoint.id,
      donor: user?.id,
      food_image: foodImage ?? undefined,
    });
  };

  const handleFoodImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setFoodImage(null);
      setFoodImageError('Choose a JPG, PNG, or WebP image.');
    } else if (file.size > 5 * 1024 * 1024) {
      setFoodImage(null);
      setFoodImageError('Choose an image smaller than 5 MB.');
    } else {
      setFoodImage(file);
      setFoodImageError('');
    }
    event.target.value = '';
  };

  const removeFoodImage = () => {
    setFoodImage(null);
    setFoodImageError('');
  };

  return (
    <>
      <Box
        onClick={onClose}
        aria-hidden="true"
        sx={{
          backgroundColor: 'rgba(25, 53, 46, 0.35)',
          position: 'fixed',
          inset: 0,
          zIndex: 1111,
        }}
      />
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          borderRadius: { xs: 0, md: 5 },
          position: 'fixed',
          top: { xs: 0, md: 16 },
          right: { xs: 0, md: 16 },
          bottom: { xs: 0, md: 16 },
          width: { xs: '100%', md: 'min(760px, calc(100% - 32px))' },
          background: 'background.paper',
          zIndex: 1112,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(25, 53, 46, 0.2)',
        }}
      >
        <Box sx={{ flex: 1, overflow: 'auto', p: { xs: 2, sm: 3 } }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Box>
              <Typography variant="h4" fontWeight={800}>
                Share a donation
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1, mb: 2.5 }}>
                Choose a staffed collection point for your donation.
              </Typography>
            </Box>
            <Button type="button" onClick={onClose} aria-label="Close donation form">
              Close
            </Button>
          </Stack>

          <Alert severity="info" sx={{ mb: 3 }}>
            Portfolio demo — collection points are illustrative; no real
            donations are accepted.
          </Alert>

          <Stack spacing={3}>
            <Box
              sx={{
                display: 'flex',
                gap: { xs: 1, sm: 2 },
                alignItems: 'center',
                borderRadius: 3,
                backgroundColor: '#f4f7e8',
                px: { xs: 1.5, sm: 2 },
                py: 1.5,
              }}
              aria-label="Donation form steps"
            >
              {['Food details', 'Add a photo', 'Choose a point'].map(
                (step, index) => (
                  <Stack
                    key={step}
                    direction="row"
                    alignItems="center"
                    spacing={0.75}
                    sx={{ flex: 1, minWidth: 0 }}
                  >
                    <Chip
                      size="small"
                      label={index + 1}
                      color="success"
                      sx={{ fontWeight: 800 }}
                    />
                    <Typography
                      variant="caption"
                      fontWeight={700}
                      sx={{ lineHeight: 1.2 }}
                    >
                      {step}
                    </Typography>
                  </Stack>
                ),
              )}
            </Box>

            <Box>
              <Typography variant="h6" fontWeight={800}>
                What are you sharing?
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                A clear title and a few details help people know what to expect.
              </Typography>
              <Stack spacing={2}>
                <TextField
                  required
                  name="title"
                  label="Food name"
                  placeholder="e.g. Fresh vegetable box"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  inputProps={{ maxLength: 255 }}
                />
                <TextField
                  required
                  name="description"
                  label="Description"
                  placeholder="Add quantity, ingredients, storage notes, or allergens"
                  multiline
                  minRows={3}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="quantity"
                      label="Quantity (optional)"
                      type="number"
                      inputProps={{ min: 1 }}
                      value={quantity}
                      onChange={(event) => setQuantity(event.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      name="expiry_date"
                      label="Best before (optional)"
                      type="date"
                      InputLabelProps={{ shrink: true }}
                      value={expiryDate}
                      onChange={(event) => setExpiryDate(event.target.value)}
                    />
                  </Grid>
                </Grid>
              </Stack>
            </Box>

            <Box>
              <Typography variant="h6" fontWeight={800}>
                Add a food photo
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                Optional, but a photo makes your listing easier to recognize.
              </Typography>
              <input
                ref={foodImageInputRef}
                hidden
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFoodImageChange}
                aria-label="Choose a photo of the food"
              />
              {foodImagePreview ? (
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    maxWidth: 420,
                    overflow: 'hidden',
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                    backgroundColor: '#f8f8f4',
                  }}
                >
                  <Box
                    component="img"
                    src={foodImagePreview}
                    alt={`Preview of ${foodImage?.name ?? 'donated food'}`}
                    sx={{
                      display: 'block',
                      width: '100%',
                      height: { xs: 190, sm: 230 },
                      objectFit: 'cover',
                    }}
                  />
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ p: 1.25 }}
                  >
                    <Typography variant="body2" noWrap sx={{ minWidth: 0, mr: 1 }}>
                      {foodImage?.name}
                    </Typography>
                    <IconButton
                      type="button"
                      aria-label="Remove food photo"
                      onClick={removeFoodImage}
                      size="small"
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </Stack>
                </Box>
              ) : (
                <Button
                  type="button"
                  variant="outlined"
                  startIcon={<AddPhotoAlternateOutlinedIcon />}
                  onClick={() => foodImageInputRef.current?.click()}
                  sx={{
                    width: '100%',
                    maxWidth: 420,
                    minHeight: 116,
                    borderStyle: 'dashed',
                    borderWidth: 2,
                    borderRadius: 3,
                    flexDirection: 'column',
                    gap: 0.5,
                    textTransform: 'none',
                  }}
                >
                  <Typography fontWeight={700}>Choose a food photo</Typography>
                  <Typography variant="caption" color="text.secondary">
                    JPG, PNG or WebP · up to 5 MB
                  </Typography>
                </Button>
              )}
              {foodImage && (
                <Button
                  type="button"
                  size="small"
                  onClick={() => foodImageInputRef.current?.click()}
                  sx={{ mt: 0.5 }}
                >
                  Replace photo
                </Button>
              )}
              {foodImageError && (
                <Typography role="alert" color="error" variant="body2" sx={{ mt: 1 }}>
                  {foodImageError}
                </Typography>
              )}
            </Box>

            <Box>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                spacing={1}
                sx={{ mb: 1.5 }}
              >
                <Box>
                  <Typography variant="h6" fontWeight={800}>
                    Where will you drop it off?
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Choose a staffed point. You can select by card without sharing your location.
                  </Typography>
                </Box>
                {mapsEnabled && (
                  <Button
                    type="button"
                    size="small"
                    onClick={() => setShowMap((visible) => !visible)}
                    aria-expanded={showMap}
                  >
                    {showMap ? 'Hide map' : 'View map'}
                  </Button>
                )}
              </Stack>

              {isLoading && (
                <Typography role="status">Loading collection points…</Typography>
              )}
              {error && (
                <Alert severity="error">
                  Could not load collection points. Please retry in a moment.
                </Alert>
              )}
              {!isLoading && !error && collectionPoints.length === 0 && (
                <Alert severity="warning">
                  No collection points are available yet.
                </Alert>
              )}

              <Stack spacing={1.5}>
                {collectionPoints.map((point) => {
                  const selected = point.id === selectedPointId;
                  return (
                    <Card
                      key={point.id}
                      variant="outlined"
                      sx={{
                        borderRadius: 3,
                        borderWidth: selected ? 2 : 1,
                        borderColor: selected ? 'primary.main' : 'divider',
                        backgroundColor: selected ? '#f4f7e8' : 'background.paper',
                      }}
                    >
                      <CardActionArea
                        onClick={() => {
                          setSelectedPointId(point.id);
                          setCollectionPointError('');
                        }}
                        aria-pressed={selected}
                        sx={{ borderRadius: 3 }}
                      >
                        <CardContent sx={{ p: 2 }}>
                          <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            justifyContent="space-between"
                            gap={1}
                          >
                            <Box>
                              <Typography fontWeight={800}>
                                {point.name}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {point.address}
                              </Typography>
                            </Box>
                            <Chip
                              size="small"
                              label={selected ? 'Selected' : 'Select'}
                              color={selected ? 'success' : 'default'}
                              variant={selected ? 'filled' : 'outlined'}
                            />
                          </Stack>
                          <Typography variant="body2" sx={{ mt: 1.5 }}>
                            <strong>Staffed hours:</strong> {point.opening_hours}
                          </Typography>
                          <Stack
                            direction="row"
                            flexWrap="wrap"
                            gap={0.75}
                            sx={{ mt: 1 }}
                          >
                            {point.accepted_food_types.map((foodType) => (
                              <Chip
                                key={foodType}
                                size="small"
                                label={foodType}
                                sx={{ backgroundColor: '#eff4df' }}
                              />
                            ))}
                          </Stack>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 1 }}
                          >
                            {point.instructions}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  );
                })}
              </Stack>

              {collectionPointError && (
                <Typography role="alert" color="error" variant="body2" sx={{ mt: 1 }}>
                  {collectionPointError}
                </Typography>
              )}

              {showMap && mapsEnabled && (
                <Box sx={{ mt: 2, overflow: 'hidden', borderRadius: 2 }}>
                  <DropOffMapSelector
                    points={collectionPoints}
                    selectedPointId={selectedPointId}
                    onPointSelect={(pointId) => {
                      setSelectedPointId(pointId);
                      setCollectionPointError('');
                    }}
                  />
                </Box>
              )}
              {!mapsEnabled && (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Map view is optional and not configured; all points can be
                  selected using the cards.
                </Typography>
              )}
            </Box>

            {selectedPoint && (
              <Card
                variant="outlined"
                sx={{ borderRadius: 3, backgroundColor: '#f4f7e8' }}
              >
                <CardContent>
                  <Typography variant="overline" color="primary.main">
                    Drop-off summary
                  </Typography>
                  <Typography fontWeight={800}>{selectedPoint.name}</Typography>
                  <Typography variant="body2">{selectedPoint.address}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                    {selectedPoint.opening_hours}
                  </Typography>
                </CardContent>
              </Card>
            )}
          </Stack>
        </Box>

        <Stack
          direction="row"
          spacing={1.5}
          justifyContent="flex-end"
          sx={{
            borderTop: '1px solid',
            borderColor: 'divider',
            p: { xs: 2, sm: 2.5 },
            backgroundColor: 'background.paper',
          }}
        >
          <Button type="button" variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={
              makeDonationMutation.isPending ||
              isLoading ||
              collectionPoints.length === 0
            }
          >
            {makeDonationMutation.isPending ? 'Submitting…' : 'Submit donation'}
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default MakeDonation;
