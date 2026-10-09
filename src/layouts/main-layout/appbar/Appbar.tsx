import { AppBar, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import IconifyIcon from 'components/base/IconifyIcon';
import ProfileDropdown from 'layouts/main-layout/appbar/ProfileDropdown';
import { useLocation } from 'react-router-dom';

interface NavbarProps {
  onDrawerToggle: () => void;
}
const MainNavbar = ({ onDrawerToggle }: NavbarProps) => {
  const location = useLocation();

  const pathSegments = location.pathname.split('/').filter((segment) => segment.trim() !== '');
  const routeName = pathSegments.length > 0 ? pathSegments.pop() : 'Overview';

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          bgcolor: 'background.default',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: { xs: 0, lg: 2 },
          }}
        >
          <Typography
            sx={{
              display: { xs: 'none', md: 'block' },
              fontSize: { sm: 'h5.fontSize', xl: 'h4.fontSize' },
              fontWeight: 800,
              color: 'primary.darker',
              flex: 1,
              textAlign: { xs: 'center', md: 'left' },
              textTransform: 'capitalize',
            }}
          >
            {routeName}
          </Typography>
          <Stack direction="row" gap={1} sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={onDrawerToggle} sx={{ display: { md: 'none' } }}>
              <IconifyIcon icon="mingcute:menu-line" color="primary.darker" width={25} />
            </IconButton>
          </Stack>

          <Stack direction="row" sx={{ alignItems: 'center' }}>
            <ProfileDropdown />
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default MainNavbar;
