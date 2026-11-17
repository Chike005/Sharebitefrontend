import { Card, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import NoData from '../../base/NoData';
import { useState } from 'react';
import { useBreakpoints } from 'providers/useBreakpoints';
import { useDonation } from 'context/donationContext';
import ErrorDisplay from 'components/base/ErrorDisplay';

const SiteListings = () => {
  const { locations, locationError, locationLoading } = useDonation();
  const { down } = useBreakpoints();
  const title = 'No Collection Points Configured';
  const description = 'Add collection points in Django Admin to list them here.';

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Collection Point',
      flex: 1,
      minWidth: 170,
      hideable: false,
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1,
      minWidth: 220,
      hideable: false,
    },
    {
      field: 'opening_hours',
      headerName: 'Opening Hours',
      flex: 1.2,
      minWidth: 220,
      hideable: false,
    },
    {
      field: 'accepted_food_types',
      headerName: 'Accepted Food Types',
      flex: 1.2,
      minWidth: 240,
      hideable: false,
      renderCell: (params) => (
        <Typography variant="body2" sx={{ whiteSpace: 'normal' }}>
          {params.value.join(', ') || 'Not specified'}
        </Typography>
      ),
    },
  ];

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const isXs = down('sm');
  const rowHeight = isXs ? 72 : 64;

  const handlePaginationModelChange = (model: GridPaginationModel) => {
    setPaginationModel(model);
  };

  return (
    <Stack sx={{ overflow: 'auto', justifyContent: 'space-between' }}>
      <Stack
        sx={{
          mb: 1.5,
          mt: 1,
          justifyContent: 'space-between',
          alignContent: 'center',
        }}
        direction={{ xs: 'column', sm: 'row' }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: 'body2.fontSize',
              md: 'h6.fontSize',
              xl: 'h3.fontSize',
            },
            fontWeight: 600,
            alignSelf: 'center',
          }}
        >
          Collection Points
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Donation drop-off locations and their accepted food types.
        </Typography>
      </Stack>
      <Card
        sx={{
          flexGrow: { md: 1 },
          display: { md: 'flex' },
          flexDirection: { md: 'column' },
          overflow: 'hidden',
          borderRadius: 6.5,
          '&.MuiPaper-root': {
            p: 1,
            border: 1,
            borderColor: 'neutral.light',
            bgcolor: { xs: 'transparent', sm: 'white' },
            boxShadow: (theme) => `inset 0px -1px ${theme.palette.neutral.light}`, // color for row border
          },
        }}
      >
        <>
          {locationError ? (
            <ErrorDisplay
              title={'Something went wrong, Please Try again'}
              description={locationError.message}
            />
          ) : (
            <DataGrid
              rowHeight={rowHeight}
              rows={locations.slice(
                paginationModel.page * paginationModel.pageSize,
                (paginationModel.page + 1) * paginationModel.pageSize,
              )}
              rowCount={locations.length}
              columns={columns}
              disableRowSelectionOnClick
              paginationMode="server"
              paginationModel={paginationModel}
              onPaginationModelChange={handlePaginationModelChange}
              slots={{
                noRowsOverlay: () => <NoData title={title} description={description} />,
                pagination: () => null, // Hide the default pagination component
              }}
              loading={locationLoading}
              sx={{
                px: { xs: 0, md: 3 },
                '& .MuiDataGrid-main': {
                  minHeight: 300,
                },
                '& .MuiDataGrid-virtualScroller': {
                  minHeight: 300,
                  p: 0,
                },
                '& .MuiDataGrid-columnHeader': {
                  fontSize: { xs: 10, lg: 13 },
                  pl: 3,
                },
                '& .MuiDataGrid-cell': {
                  fontSize: { xs: 10, lg: 12 },
                  pl: 3,
                },
              }}
            />
          )}
        </>
      </Card>
    </Stack>
  );
};

export default SiteListings;
