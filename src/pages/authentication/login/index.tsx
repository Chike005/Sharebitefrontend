import { Card, Grid, Typography } from '@mui/material';
import LoginForm from 'components/common/Login';

const LoginPage = () => {
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
            width: { xs: '100%', sm: '80%', md: '78%' },
            backgroundColor: 'transparent',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mt: 2,
              mb: { xs: 3, sm: 5 },
              fontSize: { xs: 'h5.fontSize', sm: 'h4.fontSize' },
            }}
          >
            Sign In
          </Typography>
          <LoginForm />
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
          src="../../../../public/blockchain.png"
          alt="Decentralized World"
          sx={{
            width: '100%', // Adjust based on your layout
            maxWidth: '60%', // Optional, to control max image size
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

export default LoginPage;
