import {
  Card,
  CardContent,
  CardHeader,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import React from 'react';
import { Bar } from 'react-chartjs-2';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      textAlign: 'center',
    },
    cardHeader: {
      padding: theme.spacing(3),
      paddingBottom: theme.spacing(1),
      color: blueGrey[700],
    },
    cardContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: 'calc(100% - 102px)',
    },
  })
);

export const RatingSkeleton = () => {
  const classes = useStyles();

  const data = {
    datasets: [
      {
        barPercentage: 0.85,
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
    labels: [
      '100',
      '90-99',
      '80-89',
      '70-79',
      '60-69',
      '50-59',
      '40-49',
      '30-39',
      '20-29',
      '10-19',
      '0-9',
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    indexAxis: 'y',
    scales: {
      x: {
        ticks: {
          beginAtZero: true,
          precision: 0,
        },
      },
    },
  };

  return (
    <Card elevation={3} className={classes.card} style={{ height: '100%' }}>
      <CardHeader
        className={classes.cardHeader}
        title={<Typography variant="h5">Your Ratings</Typography>}
      />
      <CardContent className={classes.cardContent} style={{ height: '336px' }}>
        <Bar type="bar" data={data} options={options} />
      </CardContent>
    </Card>
  );
};
