import { Card, CardHeader, Typography, Box } from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { styled } from '@mui/system';
import { roundUpToTwoDecimalPlaces } from 'helpers/utils';

const LegendItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  verticalAlign: 'middle',
}));

const ColorBox = styled(Box)<{ color: string }>(({ color }) => ({
  width: 6,
  height: 6,
  marginRight: 5,
  backgroundColor: color,
}));

const DonationPieChart = ({
  data,
  titleheader,
  titleLenght,
  centerTitle,
}: DonationPieChartProps) => {
  return (
    <Card
      sx={{
        width: { xs: '100%', md: '45%' },
        borderRadius: '5px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: '',
        alignSelf: 'start',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
      }}
    >
      <CardHeader
        sx={{
          pb: 0,
        }}
        title={titleheader}
        titleTypographyProps={{
          align: 'left',
          fontSize: {
            xs: 10,
            md: 12,
            xl: 12,
          },
          fontWeight: 600,
        }}
      />
      <Box sx={{ display: 'flex', height: 200, padding: 1, mb: 5 }}>
        <Box sx={{ width: '55%', position: 'relative' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius="65%"
                outerRadius="100%"
                paddingAngle={0}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `${value}%`}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography variant="h4" component="div" sx={{ fontWeight: '600' }}>
              {titleLenght}
            </Typography>
            <Typography
              sx={{
                xs: 'overline.fontSize',
                md: 'caption.fontSize',
              }}
            >
              {centerTitle}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            width: '40%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'right',
            ml: '20px',
          }}
        >
          {data.map((entry, index) => (
            <LegendItem
              key={`legend-${index}`}
              sx={{
                verticalAlign: 'center',
              }}
            >
              <ColorBox color={entry.color} />
              <Typography variant="caption">{entry.name}</Typography>
              <Typography
                variant="body2"
                sx={{ marginLeft: 'auto', fontWeight: 600 }}
              >
                {roundUpToTwoDecimalPlaces(entry.value)}%
              </Typography>
            </LegendItem>
          ))}
        </Box>
      </Box>
    </Card>
  );
};

export default DonationPieChart;
