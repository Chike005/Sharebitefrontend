import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useFormValidation } from 'hooks/useFormValidation';
import { useBreakpoints } from 'providers/useBreakpoints';
import { FormEvent, useState } from 'react';
import AuthSchemas from 'schema/auth';
import toast from 'react-hot-toast';
import { useMutation } from '@tanstack/react-query';
import ApiRequests from 'api';

interface ProfileInformationProps {
  onClose: () => void;
  profileInfo: User;
}

const ProfileInformation = ({
  onClose,
  profileInfo,
}: ProfileInformationProps) => {
  const { up } = useBreakpoints();
  const upSM = up('sm');
  const [formData, setFornData] = useState<EditProfileFormData>({
    username: profileInfo.username,
    first_name: profileInfo.first_name,
    last_name: profileInfo.last_name,
    email: profileInfo.email,
  });

  const [disabled, setDisabled] = useState<boolean>(true);
  const handleToggle = () => {
    setDisabled(!disabled);
  };

  const { errors, validate } = useFormValidation(AuthSchemas.editprofileSchema);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFornData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const editProfileMutation = useMutation({
    mutationFn: ApiRequests.editUser,
    onSuccess(data) {
      console.log(data);
      toast.success('profile updated successful!');
      onClose();
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validate(formData)) {
      toast.loading('Logging in...', { id: 'asyntoast' });
      editProfileMutation.mutate(formData);
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
          <Stack spacing={3} sx={{ mb: 2.5, mt: 5 }}>
            <Typography
              variant="h4"
              fontWeight="700"
              fontSize="15px"
              color="textSecondary"
            >
              Profile Information
            </Typography>
            <Typography
              color="textSecondary"
              variant="body1"
              fontWeight="400"
              sx={{ mb: 2.5, mt: 1.5, fontSize: 12 }}
            >
              Please enter details for the donations
            </Typography>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size={upSM ? 'medium' : 'small'}
                name="first_name"
                label="First Name"
                value={formData.first_name}
                onChange={handleChange}
                disabled={disabled}
              />
              {errors.firstname && (
                <Typography sx={{ color: 'red', fontSize: '10px' }}>
                  {errors.firstname}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size={upSM ? 'medium' : 'small'}
                name="last_name"
                label="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                disabled={disabled}
              />
              {errors.lastname && (
                <Typography sx={{ color: 'red', fontSize: '10px' }}>
                  {errors.lastname}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size={upSM ? 'medium' : 'small'}
                name="email"
                label="Email address"
                value={formData.email}
                onChange={handleChange}
                disabled={disabled}
              />
              {errors.email && (
                <Typography sx={{ color: 'red', fontSize: '10px' }}>
                  {errors.email}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size={upSM ? 'medium' : 'small'}
                name="username"
                label="Username"
                value={formData.username}
                onChange={handleChange}
                disabled={disabled}
              />
              {errors.username && (
                <Typography sx={{ color: 'red', fontSize: '10px' }}>
                  {errors.username}
                </Typography>
              )}
            </Grid>
          </Stack>
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
          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button
              variant="contained"
              color="primary"
              sx={{
                fontSize: 12,
                width: 150,
              }}
              onClick={disabled ? handleToggle : handleSubmit}
            >
              {disabled ? 'Edit Profile' : 'Save Changes'}
            </Button>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default ProfileInformation;
