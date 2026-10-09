import { Link, Stack, Theme, Toolbar, Typography } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { Utensils } from 'lucide-react';
import paths from 'router/path';

const AuthLayout = () => {
  return (
    <Stack
      sx={{
        position: 'relative',
        minHeight: '100vh',
        background: (theme: Theme) => theme.palette.gradients['bgGradient'],
      }}
    >
      <Toolbar
        sx={{
          gap: 1.25,
          minHeight: { xs: 68, sm: 76 },
          px: { xs: 2.5, sm: 4, md: 6 },
        }}
      >
        <Link
          component={RouterLink}
          to={paths.home}
          underline="none"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1.25,
            color: 'text.primary',
          }}
        >
          <Stack
            sx={{
              width: 38,
              height: 38,
              display: 'grid',
              placeItems: 'center',
              borderRadius: 2.5,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
            }}
          >
            <Utensils size={18} aria-hidden="true" />
          </Stack>
          <Typography fontWeight={900} fontSize={20} letterSpacing="-0.04em">
            ShareBite<span style={{ color: '#88a137' }}>.</span>
          </Typography>
        </Link>
      </Toolbar>
      <Stack
        direction="row"
        sx={{
          width: '100%',
          justifyContent: 'center',
          flex: 1,
          px: { xs: 2, md: 4 },
          pb: { xs: 4, md: 6 },
        }}
      >
        <Outlet />
      </Stack>
    </Stack>
  );
};

export default AuthLayout;
