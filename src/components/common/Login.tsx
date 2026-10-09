import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import { useBreakpoints } from 'providers/useBreakpoints';
import { useFormValidation } from 'hooks/useFormValidation';
import AuthSchemas from 'schema/auth';
import { useMutation } from '@tanstack/react-query';
import ApiRequests from 'api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import paths from 'router/path';
import { useUser } from 'context/userContext';

const LoginForm = () => {
  const { login } = useUser();
  const { up } = useBreakpoints();
  const navigate = useNavigate();
  const upSM = up('sm');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });
  const { errors, validate } = useFormValidation(AuthSchemas.loginSchema);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const loginMutation = useMutation({
    mutationFn: ApiRequests.loginUser,
    onSuccess(data: User) {
      toast.success('Login successful!', { id: 'asyntoast' });
      login(data);
      navigate(
        data?.is_donor
          ? paths.donordashboard
          : data?.is_receiver
            ? paths.recieverdashboard
            : paths.dashboard,
      );
    },
    onError(error) {
      toast.error(error.message, { id: 'asyntoast' });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate(formData)) {
      toast.loading('Logging in...', { id: 'asyntoast' });
      loginMutation.mutate(formData);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={3} sx={{ mb: 2.5 }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size={upSM ? 'medium' : 'small'}
            name="username"
            label="Username"
            autoComplete="username"
            inputProps={{ autoCapitalize: 'none', autoCorrect: 'off' }}
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && (
            <Typography sx={{ color: 'red', fontSize: '10px' }}>
              {errors.username}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size={upSM ? 'medium' : 'small'}
            name="password"
            label="Password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="button"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <IconifyIcon
                      icon={
                        showPassword ? 'majesticons:eye' : 'majesticons:eye-off'
                      }
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {errors.password && (
            <Typography sx={{ color: 'red', fontSize: '10px' }}>
              {errors.password}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Grid container justifyContent="flex-end" sx={{ my: 3 }}>
        <Grid item>
          <Link
            component={RouterLink}
            to={paths.signup}
            variant="subtitle2"
            underline="hover"
          >
            Create an account
          </Link>
        </Grid>
      </Grid>
      <Button
        fullWidth
        size={upSM ? 'large' : 'medium'}
        type="submit"
        disabled={loginMutation.isPending}
        variant="contained"
        sx={{
          fontSize: 12,
        }}
        color="primary"
      >
        {loginMutation.isPending ? 'Logging in...' : 'Login'}
      </Button>
    </Box>
  );
};

export default LoginForm;
