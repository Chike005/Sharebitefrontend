import { useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  Alert,
  Box,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
import { useDonation } from 'context/donationContext';

const storageKey = 'sharebite-admin-visible-widgets';

const widgetOptions = [
  { id: 'total-donations', label: 'Total donations', kind: 'stat' },
  { id: 'pending-donations', label: 'Pending donations', kind: 'stat' },
  { id: 'successful-donations', label: 'Successful donations', kind: 'stat' },
  { id: 'awaiting-dropoff', label: 'Awaiting drop-off', kind: 'stat' },
  { id: 'received-donations', label: 'Received at collection point', kind: 'stat' },
  { id: 'donors', label: 'Donors', kind: 'stat' },
  { id: 'receivers', label: 'Receivers', kind: 'stat' },
  { id: 'donation-status-chart', label: 'Donation status chart', kind: 'chart' },
  {
    id: 'collection-status-chart',
    label: 'Collection-point status chart',
    kind: 'chart',
  },
] as const;

type WidgetId = (typeof widgetOptions)[number]['id'];

const defaultWidgets: WidgetId[] = widgetOptions.map((widget) => widget.id);

const loadVisibleWidgets = (): {
  visible: WidgetId[];
  errorMessage?: string;
} => {
  let saved: string | null;
  try {
    saved = localStorage.getItem(storageKey);
  } catch (error) {
    console.error('Unable to read saved admin widget preferences.', error);
    return {
      visible: defaultWidgets,
      errorMessage: 'Saved widget preferences could not be read.',
    };
  }

  if (!saved) return { visible: defaultWidgets };

  let parsed: unknown;
  try {
    parsed = JSON.parse(saved);
  } catch (error) {
    console.error('Saved admin widget preferences are invalid JSON.', error);
    return {
      visible: defaultWidgets,
      errorMessage: 'Saved widget preferences were invalid; defaults are shown.',
    };
  }

  if (!Array.isArray(parsed)) {
    return {
      visible: defaultWidgets,
      errorMessage: 'Saved widget preferences were invalid; defaults are shown.',
    };
  }

  const validIds = new Set<string>(widgetOptions.map((widget) => widget.id));
  return {
    visible: parsed.filter(
      (widget): widget is WidgetId =>
        typeof widget === 'string' && validIds.has(widget),
    ),
  };
};

const StatWidget = ({
  label,
  value,
  detail,
}: {
  label: string;
  value: number;
  detail: string;
}) => (
  <Card sx={{ height: '100%', borderRadius: 2 }}>
    <CardContent>
      <Typography color="text.secondary" variant="body2">
        {label}
      </Typography>
      <Typography variant="h4" component="p" sx={{ my: 1, fontWeight: 700 }}>
        {value}
      </Typography>
      <Typography color="text.secondary" variant="caption">
        {detail}
      </Typography>
    </CardContent>
  </Card>
);

const ChartWidget = ({
  title,
  data,
}: {
  title: string;
  data: { name: string; total: number; color: string }[];
}) => (
  <Card sx={{ height: '100%', borderRadius: 2 }}>
    <CardContent>
      <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Box sx={{ width: '100%', height: 250, minWidth: 0 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 8, right: 12, bottom: 8, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis allowDecimals={false} width={32} />
            <Tooltip formatter={(value: number) => [value, 'Donations']} />
            <Bar dataKey="total" radius={[5, 5, 0, 0]}>
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </CardContent>
  </Card>
);

const WidgetPage = () => {
  const {
    donations,
    users,
    donationLoading,
    userLoading,
    donationError,
    userError,
  } = useDonation();
  const [widgetPreferences, setWidgetPreferences] =
    useState(loadVisibleWidgets);
  const visibleWidgets = widgetPreferences.visible;

  const pendingCount = donations.filter(
    (donation) => donation.status === 'Pending',
  ).length;
  const successfulCount = donations.filter(
    (donation) => donation.status === 'Successful',
  ).length;
  const awaitingCount = donations.filter(
    (donation) => donation.collection_status === 'awaiting_dropoff',
  ).length;
  const receivedCount = donations.filter(
    (donation) =>
      donation.collection_status === 'received_at_collection_point',
  ).length;
  const donorsCount = users.filter((user) => user.is_donor).length;
  const receiversCount = users.filter((user) => user.is_receiver).length;

  const donationStatusData = [
    { name: 'Pending', total: pendingCount, color: '#e6a700' },
    { name: 'Successful', total: successfulCount, color: '#06a77d' },
  ];
  const collectionStatusData = [
    { name: 'Awaiting drop-off', total: awaitingCount, color: '#e6a700' },
    { name: 'Received', total: receivedCount, color: '#06a77d' },
  ];

  const toggleWidget = (widgetId: WidgetId) => {
    const next = visibleWidgets.includes(widgetId)
      ? visibleWidgets.filter((id) => id !== widgetId)
      : [...visibleWidgets, widgetId];

    try {
      localStorage.setItem(storageKey, JSON.stringify(next));
      setWidgetPreferences({ visible: next });
    } catch (error) {
      console.error('Unable to save admin widget preferences.', error);
      setWidgetPreferences({
        visible: next,
        errorMessage: 'Your widget selection could not be saved in this browser.',
      });
    }
  };

  const isVisible = (widgetId: WidgetId) => visibleWidgets.includes(widgetId);
  const isLoading = donationLoading || userLoading;
  const errorMessage = donationError?.message || userError?.message;

  return (
    <Stack spacing={3} sx={{ pb: 3 }}>
      <Box>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Admin widgets
        </Typography>
        <Typography color="text.secondary" sx={{ mt: 0.5 }}>
          Choose which donation insights to show. Your selection is saved in this
          browser.
        </Typography>
      </Box>

      {errorMessage && (
        <Alert severity="error">
          Could not load widget data: {errorMessage}
        </Alert>
      )}
      {widgetPreferences.errorMessage && (
        <Alert severity="warning">{widgetPreferences.errorMessage}</Alert>
      )}
      {isLoading && (
        <Alert severity="info" role="status">
          Loading donation and member data…
        </Alert>
      )}

      <Paper variant="outlined" sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
        <Typography variant="h6" component="h2">
          Customize your widgets
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Select the statistics and charts you want on this page.
        </Typography>
        <FormGroup
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, minmax(0, 1fr))',
              lg: 'repeat(3, minmax(0, 1fr))',
            },
          }}
        >
          {widgetOptions.map((widget) => (
            <FormControlLabel
              key={widget.id}
              control={
                <Checkbox
                  checked={isVisible(widget.id)}
                  onChange={() => toggleWidget(widget.id)}
                  disabled={isLoading || Boolean(errorMessage)}
                />
              }
              label={widget.label}
            />
          ))}
        </FormGroup>
      </Paper>

      {!isLoading && !errorMessage && (
        <>
          <Grid container spacing={2}>
            {isVisible('total-donations') && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <StatWidget
                  label="Total donations"
                  value={donations.length}
                  detail="All submitted donations"
                />
              </Grid>
            )}
            {isVisible('pending-donations') && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <StatWidget
                  label="Pending donations"
                  value={pendingCount}
                  detail="Awaiting donation approval"
                />
              </Grid>
            )}
            {isVisible('successful-donations') && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <StatWidget
                  label="Successful donations"
                  value={successfulCount}
                  detail="Approved donations"
                />
              </Grid>
            )}
            {isVisible('awaiting-dropoff') && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <StatWidget
                  label="Awaiting drop-off"
                  value={awaitingCount}
                  detail="Not yet received at a collection point"
                />
              </Grid>
            )}
            {isVisible('received-donations') && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <StatWidget
                  label="Received donations"
                  value={receivedCount}
                  detail="At a selected collection point"
                />
              </Grid>
            )}
            {isVisible('donors') && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <StatWidget
                  label="Donors"
                  value={donorsCount}
                  detail="Registered donor accounts"
                />
              </Grid>
            )}
            {isVisible('receivers') && (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <StatWidget
                  label="Receivers"
                  value={receiversCount}
                  detail="Registered receiver accounts"
                />
              </Grid>
            )}
          </Grid>

          <Grid container spacing={2}>
            {isVisible('donation-status-chart') && (
              <Grid item xs={12} lg={6}>
                <ChartWidget
                  title="Donations by status"
                  data={donationStatusData}
                />
              </Grid>
            )}
            {isVisible('collection-status-chart') && (
              <Grid item xs={12} lg={6}>
                <ChartWidget
                  title="Collection-point progress"
                  data={collectionStatusData}
                />
              </Grid>
            )}
          </Grid>

          {visibleWidgets.length === 0 && (
            <Alert severity="info">
              No widgets selected. Choose at least one above to display it.
            </Alert>
          )}
        </>
      )}
    </Stack>
  );
};

export default WidgetPage;
