import SignupForm from 'components/common/Signup';
import { Card, Grid, Link, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import paths from 'router/path';

const SignupPage = () => {
  return (
    <Grid
      container
      sx={{
        width: '100%',
        maxWidth: 1100,
        minHeight: { md: 'calc(100vh - 150px)' },
        overflow: 'hidden',
        borderRadius: { xs: 4, md: 7 },
        border: '1px solid',
        borderColor: 'divider',
        boxShadow: '0 24px 80px rgba(25, 53, 46, 0.08)',
      }}
    >
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          backgroundColor: 'background.paper',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Card
          sx={{
            p: { xs: 3, sm: 5 },
            width: { xs: '100%', sm: '90%', md: '84%' },
          }}
        >
          <Typography variant="h4">Sign Up</Typography>

          <Typography
            sx={{
              mt: 2,
              mb: { xs: 3, sm: 5 },
              fontSize: { xs: 'subtitle1.fontSize', sm: 'body2.fontSize' },
            }}
          >
            Already have an account?
            <Link
              component={RouterLink}
              to={paths.login}
              variant="subtitle2"
              sx={{ ml: 0.75, '&:hover': { color: 'neutral.light' } }}
            >
              Sign In Now!
            </Link>
          </Typography>
          <SignupForm />
        </Card>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: { xs: 'none', md: 'flex' },
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        {/* <Box
          component="img"
          src="../../../../public/dc2.png"
          alt="Decentralized World"
          sx={{
            width: '100%', // Adjust based on your layout
            maxWidth: '40%', // Optional, to control max image size
          }}
        /> */}
        <Typography
          variant="h1"
          sx={{
            mt: 2,
            mb: { xs: 3, sm: 5 },
            fontSize: { xs: '2.5rem', sm: '3rem', md: '2rem' }, // Increase font size for different screen sizes
            width: '60%',
            wordBreak: 'break-word', // Allows breaking words to the next line
            overflowWrap: 'break-word', // Ensures long words are wrapped
            textAlign: 'center',
            paddingTop: 5,
            color: 'primary.dark',
          }}
        >
          Unlock the possibilities of a Decentralized World
        </Typography>
      </Grid>
    </Grid>
  );
};

export default SignupPage;
