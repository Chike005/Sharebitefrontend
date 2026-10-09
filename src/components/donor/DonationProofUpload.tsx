import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import ImagePreview from 'components/base/ImagePreview';
import ImageUpload from 'components/base/ImageUpload';
import { useUser } from 'context/userContext';
import { useState } from 'react';

const DonationProofUpload = ({
  onClose,
  donation,
  mode,
}: DonationProofUploadProps) => {
  const { user } = useUser();
  const [title, setTitle] = useState<string>(donation.title);
  const [description, setDescription] = useState<string>(donation.description);
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
                {mode === 'proof'
                  ? 'Upload Donation Proof'
                  : 'Upload Pickup proof'}
              </Typography>
              <Typography
                color="textSecondary"
                variant="body1"
                fontWeight="400"
                sx={{ mb: 2.5, mt: 1.5, fontSize: 12 }}
              >
                Here details for the donations
              </Typography>

              <Stack spacing={3} position="relative">
                <TextField
                  name="title"
                  label="Donation title *"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled
                />
                <TextField
                  name="description"
                  label="Description *"
                  value={description}
                  multiline
                  onChange={(e) => setDescription(e.target.value)}
                  disabled
                />
                {donation.receipt === null || donation.receipt === undefined ? (
                  <ImageUpload id={donation.id} userid={user!.id} mode="" />
                ) : (
                  <Stack
                    direction="column"
                    sx={{
                      alignSelf: 'center',
                      alignContent: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '50%',
                    }}
                  >
                    <Typography
                      color="textSecondary"
                      variant="body1"
                      fontWeight="400"
                      sx={{ mb: 2.5, mt: 1.5, fontSize: 12 }}
                    >
                      Pickup Proof
                    </Typography>
                    <ImagePreview logo={donation.receipt?.proof_image} />
                  </Stack>
                )}
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
          {/* <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              sx={{
                fontSize: 12,
                width: 150,
              }}
            >
              Upload
            </Button>
          </Stack> */}
        </Box>
      </Box>
    </>
  );
};

export default DonationProofUpload;
