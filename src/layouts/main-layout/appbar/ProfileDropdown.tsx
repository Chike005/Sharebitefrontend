import { Avatar, Box, Button, Divider, Menu, Stack, Typography } from '@mui/material';
// import ProfileImage from 'assets/avatar.jpg';
import IconifyIcon from 'components/base/IconifyIcon';
import ProfileInformation from 'components/profile/ProfileInfo';
import ResetPassword from 'components/profile/ResetPassword';
import { useUser } from 'context/userContext';
import { MouseEvent, useState } from 'react';
// import { useDispatch } from 'react-redux';
import { Fragment } from 'react/jsx-runtime';
// import { logout } from 'redux/store/authslice';

/* ------------------------Profile dropdown Data --------------------------- */
const profileData = [
  {
    href: '!settings',
    subtitle: 'Profile Settings',
    icon: 'fa:user-circle-o',
    color: 'primary.light',
  },
];
/* -------------------------------------------------------------------------- */
const ProfileDropdown = () => {
  const { user, logout } = useUser();
  const [open, setOpen] = useState<{ [key: string]: HTMLElement | null }>({
    popover1: null,
    popover2: null,
    popover3: null,
  });

  const handleOpen = (event: MouseEvent<HTMLElement>, popoverId: string) => {
    setOpen({});
    setOpen({ ...open, [popoverId]: event.currentTarget });
  };

  const handleClose = (popoverId: string) => {
    setOpen({ ...open, [popoverId]: null });
  };
  return (
    <>
      <Fragment>
        <Button
          sx={{ p: 0, position: 'relative' }}
          onClick={(event) => handleOpen(event, 'popover1')}
        >
          <Typography color="primary.darker" variant="body1" fontWeight="700">
            Welcome, {(user?.first_name || user?.username || '').toUpperCase()}
          </Typography>
          <div style={{ paddingLeft: 15 }}>
            <svg
              width="12"
              height="8"
              viewBox="0 0 12 8"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1.4 0.299988L6 4.89999L10.6 0.299988L12 1.69999L6 7.69999L0 1.69999L1.4 0.299988Z"
                fill="#1e493c"
              />
            </svg>
          </div>
        </Button>
        {/* Profile Menu Dropdown*/}
        <Menu
          id="profile-menu"
          anchorEl={open.popover1}
          keepMounted
          open={Boolean(open.popover1)}
          onClose={() => handleClose('popover1')}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          sx={{
            '& .MuiMenu-paper': {
              width: 280,
              bgcolor: 'common.white',
            },
          }}
        >
          <Box p={3}>
            <Divider />
            {profileData.map((profileItem) => (
              <Box
                key={profileItem.subtitle}
                sx={{ py: 1.5, px: 0, cursor: 'pointer' }}
                onClick={(event) => handleOpen(event, 'popover2')}
              >
                <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                  <Stack
                    direction="row"
                    sx={{
                      width: 45,
                      height: 45,
                      bgcolor: 'neutral.light',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 1.5,
                    }}
                  >
                    <Avatar
                      variant="rounded"
                      sx={{
                        minwidth: 24,
                        height: 24,
                        bgcolor: 'transparent',
                      }}
                    >
                      <IconifyIcon icon={profileItem.icon} color={profileItem.color} />
                    </Avatar>
                  </Stack>
                  <div>
                    <Typography
                      variant="subtitle2"
                      fontWeight={600}
                      noWrap
                      sx={{
                        width: 150,
                      }}
                    >
                      {profileItem.subtitle}
                    </Typography>
                  </div>
                </Stack>
              </Box>
            ))}
            <Divider />
            <Box
              sx={{ py: 1.5, px: 0, cursor: 'pointer' }}
              onClick={(event) => handleOpen(event, 'popover3')}
            >
              <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
                <Stack
                  direction="row"
                  sx={{
                    width: 45,
                    height: 45,
                    bgcolor: 'neutral.light',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1.5,
                  }}
                >
                  <Avatar
                    variant="rounded"
                    sx={{
                      minwidth: 24,
                      height: 24,
                      bgcolor: 'transparent',
                    }}
                  >
                    <IconifyIcon icon="carbon:password" color="primary.light" />
                  </Avatar>
                </Stack>
                <div>
                  <Typography
                    variant="subtitle2"
                    fontWeight={600}
                    noWrap
                    sx={{
                      width: 150,
                    }}
                  >
                    Reset Password
                  </Typography>
                </div>
              </Stack>
            </Box>
            <Box mt={1.25}>
              <Button onClick={logout} variant="outlined" color="error" fullWidth>
                Logout
              </Button>
            </Box>
          </Box>
        </Menu>
      </Fragment>
      {open.popover2 && (
        <ProfileInformation onClose={() => handleClose('popover2')} profileInfo={user!} />
      )}
      {open.popover3 && (
        <ResetPassword onClose={() => handleClose('popover3')} open={open.popover3} />
      )}
    </>
  );
};

export default ProfileDropdown;
