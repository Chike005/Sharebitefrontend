import { ChangeEvent, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useBreakpoints } from 'providers/useBreakpoints';
import { useFormValidation } from 'hooks/useFormValidation';
import AuthSchemas from 'schema/auth';
import IconifyIcon from 'components/base/IconifyIcon';
import { useMutation } from '@tanstack/react-query';
import ApiRequests from 'api';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import paths from 'router/path';

const SignupForm = () => {
  const { up } = useBreakpoints();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const upSM = up('sm');
  const roleParam = searchParams.get('role');
  const initialRole: 'donor' | 'receiver' | '' =
    roleParam === 'donor' || roleParam === 'receiver' ? roleParam : '';
  const [formData, setFornData] = useState<SignupFormData>({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmpassword: '',
    role: initialRole,
    is_donor: initialRole === 'donor',
    is_receiver: initialRole === 'receiver',
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const { errors, validate } = useFormValidation(AuthSchemas.signupSchema);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent,
  ) => {
    const { name, value } = e.target;

    setFornData((prev: SignupFormData) => {
      if (name === 'role') {
        return {
          ...prev,
          role: value,
          is_donor: value === 'donor',
          is_receiver: value === 'receiver',
        };
      }
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const signupMutation = useMutation({
    mutationFn: ApiRequests.registerUser,
    onSuccess() {
      toast.success('Account created. You can now sign in.', {
        id: 'asyntoast',
      });
      navigate(paths.login);
    },
    onError(error) {
      toast.error(error.message, { id: 'asyntoast' });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate(formData)) {
      toast.loading('Registering...', { id: 'asyntoast' });
      signupMutation.mutate({
        username: formData.username,
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        password: formData.password,
        confirmpassword: formData.confirmpassword,
        is_donor: formData.is_donor,
        is_receiver: formData.is_receiver,
      });
    } else {
      toast.error('Please correct error');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container spacing={3} sx={{ mb: 2.5 }}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size={upSM ? 'medium' : 'small'}
            name="first_name"
            label="First Name"
            value={formData.first_name}
            onChange={handleChange}
          />
          {errors.first_name && (
            <Typography sx={{ color: 'red', fontSize: '10px' }}>{errors.first_name}</Typography>
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
          />
          {errors.last_name && (
            <Typography sx={{ color: 'red', fontSize: '10px' }}>{errors.last_name}</Typography>
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
          />
          {errors.email && (
            <Typography sx={{ color: 'red', fontSize: '10px' }}>{errors.email}</Typography>
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
          />
          {errors.username && (
            <Typography sx={{ color: 'red', fontSize: '10px' }}>{errors.username}</Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={formData.role}
              name="role"
              onChange={handleChange}
              label="Event to Send"
              MenuProps={{
                PaperProps: {
                  sx: {
                    zIndex: 44444,
                    maxHeight: 300,
                  },
                },
              }}
              style={{
                zIndex: 44444,
              }}
            >
              <MenuItem value="">
                <em>--</em>
              </MenuItem>
              <MenuItem value="donor">Donor</MenuItem>
              <MenuItem value="receiver">Receiver</MenuItem>
            </Select>
            <FormHelperText
              sx={{
                ml: 0,
              }}
            >
              Register As
            </FormHelperText>
          </FormControl>
          {errors.role && (
            <Typography sx={{ color: 'red', fontSize: '10px' }}>{errors.role}</Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size={upSM ? 'medium' : 'small'}
            name="password"
            label="Password"
            value={formData.password}
            onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            sx={{ size: { xs: 'small', sm: 'medium' } }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="button"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    <IconifyIcon icon={showPassword ? 'majesticons:eye' : 'majesticons:eye-off'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {errors.password && (
            <Typography sx={{ color: 'red', fontSize: '10px' }}>{errors.password}</Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            size={upSM ? 'medium' : 'small'}
            name="confirmpassword"
            label="Confirm Password"
            value={formData.confirmpassword}
            onChange={handleChange}
            type={showConfirmPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    type="button"
                    aria-label={
                      showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'
                    }
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    <IconifyIcon
                      icon={showConfirmPassword ? 'majesticons:eye' : 'majesticons:eye-off'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {errors.confirmPassword && (
            <Typography sx={{ color: 'red', fontSize: '10px' }}>
              {errors.confirmPassword}
            </Typography>
          )}
        </Grid>
      </Grid>
      <Button
        fullWidth
        size={upSM ? 'large' : 'medium'}
        sx={{
          fontSize: 12,
        }}
        type="submit"
        disabled={signupMutation.isPending}
        variant="contained"
        color="primary"
      >
        {signupMutation.isPending ? 'Creating account...' : 'Sign Up'}
      </Button>
    </Box>
  );
};

export default SignupForm;
