import { Stack, Typography } from '@mui/material';

const Details = ({ titleLeft, titleRight, labelLeft, labelRight }: DetailsProps) => {
  return (
    <Stack
      direction="row"
      sx={{
        justifyContent: 'space-between',
        alignItems: 'start',
        mb: 2,
      }}
    >
      <Stack
        direction="column"
        sx={{
          justifyContent: 'space-between',
          alignItems: 'start',
          width: '45%',
          borderBottom: '1px solid',
          borderColor: 'primary.light',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: 11,
            fontWeight: 600,
            mb: 1,
          }}
        >
          {titleLeft}
        </Typography>
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 500,
            color: 'primary.main',
          }}
        >
          {labelLeft}
        </Typography>
      </Stack>
      <Stack
        direction="column"
        sx={{
          justifyContent: 'space-between',
          alignItems: 'start',
          width: '50%',
          borderBottom: '1px solid',
          borderColor: 'primary.light',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: 11,
            fontWeight: 600,
            textAlign: 'left',
            mb: 1,
          }}
        >
          {titleRight}
        </Typography>
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 500,
            color: 'primary.main',
            textAlign: 'left',
          }}
        >
          {labelRight}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Details;
