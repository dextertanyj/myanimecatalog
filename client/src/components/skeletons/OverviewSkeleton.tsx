import {
  Card,
  CardContent,
  CardHeader,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import {
  blue,
  blueGrey,
  green,
  grey,
  lime,
  red,
} from '@material-ui/core/colors';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

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

const data = {
  datasets: [
    {
      data: [0, 0, 0, 0, 0, 0],
      backgroundColor: [
        blue[500],
        green[500],
        lime[500],
        blueGrey[500],
        red[500],
        grey[500],
      ],
      hoverBackgroundColor: [
        blue[300],
        green[300],
        lime[300],
        blueGrey[300],
        red[300],
        grey[300],
      ],
    },
  ],
  labels: [
    'Completed',
    'Watching',
    'On Hold',
    'Plan To Watch',
    'Dropped',
    'No Status',
  ],
};

const options = {
  legend: {
    position: 'bottom',
    labels: {
      boxWidth: 30,
      fontSize: 14,
    },
  },
};

export const OverviewSkeleton = () => {
  const classes = useStyles();

  return (
    <Card elevation={3} className={classes.card} style={{ height: '100%' }}>
      <CardHeader
        className={classes.cardHeader}
        title={<Typography variant="h5">Overview</Typography>}
      />
      <CardContent className={classes.cardContent}>
        <Doughnut type="doughnut" data={data} options={options} />
      </CardContent>
    </Card>
  );
};
