import { Button, Card, Stack, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { dateFormatFromUTC } from 'helpers/utils';
import NoData from '../../base/NoData';
// import IconifyIcon from 'components/base/IconifyIcon';
import { useState, MouseEvent } from 'react';
import { useBreakpoints } from 'providers/useBreakpoints';
import AddLocation from './AddLocation';
import { useDonation } from 'context/donationContext';
import ErrorDisplay from 'components/base/ErrorDisplay';

let rowHeight = 60;

const SiteListings = () => {
  const { locations, locationError, locationLoading } = useDonation();
  const { down } = useBreakpoints();
  const [open, setOpen] = useState<null | HTMLElement>(null);
  const title = 'No Locations Available';
  const description = 'There is no Location to display at the moment.';

  const handleOpen = (event: MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const columns: GridColDef[] = [
    {
      field: 'location',
      headerName: 'Location',
      flex: 1,
      width: 200,
      hideable: false,
      renderCell: (params) => (
        <Typography
          sx={{
            textTransform: 'capitalize',
          }}
        >
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'added_by',
      headerName: 'Added By',
      flex: 1,
      minWidth: 300,
      hideable: false,
      renderCell: (params) => {
        const fullname = params.row.added_by.first_name + ' ' + params.row.added_by.last_name;
        return (
          <Typography
            sx={{
              textTransform: 'capitalize',
            }}
          >
            {fullname}
          </Typography>
        );
      },
    },
    {
      field: 'created_at',
      headerName: 'Date Added',
      flex: 1,
      minWidth: 100,
      hideable: false,
      renderCell: (params) => <>{dateFormatFromUTC(params.value)}</>,
    },
  ];

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const isXs = down('sm');

  if (isXs) {
    rowHeight = 55;
  } else {
    rowHeight = 64;
  }

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
        direction="row"
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
          Locations
        </Typography>
        <Button
          variant="contained"
          sx={{
            px: 1,
            py: 1,
            borderRadius: 2,
            alignItems: 'center',
            bgcolor: '#1e493c',
          }}
          onClick={handleOpen}
        >
          <div style={{ alignSelf: 'center' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 20 20">
              <path
                fill="#ffff"
                d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <Typography
            color="#ffff"
            fontWeight="400"
            textAlign="center"
            alignSelf="center"
            paddingLeft={0.5}
          >
            Add Location
          </Typography>
        </Button>
        <AddLocation open={open} onClose={() => setOpen(null)} />
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
                // '& .MuiTypography-root': {
                //   fontSize: { xs: 13, lg: 16 },
                // },
              }}
            />
          )}
        </>
      </Card>
    </Stack>
  );
};

export default SiteListings;
