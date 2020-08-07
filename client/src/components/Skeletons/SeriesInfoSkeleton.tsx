import {
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(3),
      textAlign: 'center',
    },
    tableHeader: {
      'color': blueGrey[700],
      'marginBottom': '10px',
      'textAlign': 'left',
      '& div': {
        '& div': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        },
      },
    },
  })
);

export const SeriesInfoSkeleton = () => {
  const classes = useStyles();
  return (
    <Paper elevation={3} className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.tableHeader}>
          <Grid container spacing={3}>
            <Grid item xs>
              <Typography variant="h5"> Series Information</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Typography>Title</Typography>
            </Grid>
            <Grid item xs={10}>
              <Skeleton />
            </Grid>
            <Grid item xs={2}>
              <Typography>Season No.</Typography>
            </Grid>
            <Grid item xs={2}>
              <Skeleton />
            </Grid>
            <Grid item xs={2}>
              <Typography>No. of Episodes</Typography>
            </Grid>
            <Grid item xs={2}>
              <Skeleton />
            </Grid>
            <Grid item xs={2}>
              <Typography>Status</Typography>
            </Grid>
            <Grid item xs={2}>
              <Skeleton />
            </Grid>
            <Grid item xs={2}>
              <Typography>Type</Typography>
            </Grid>
            <Grid item xs={2}>
              <Skeleton />
            </Grid>
            <Grid item xs={2}>
              <Typography>Release Season</Typography>
            </Grid>
            <Grid item xs={2}>
              <Skeleton />
            </Grid>
            <Grid item xs={2}>
              <Typography>Last Updated</Typography>
            </Grid>
            <Grid item xs={2}>
              <Skeleton />
            </Grid>
            <Grid item xs={2}>
              <Typography>Remarks</Typography>
            </Grid>
            <Grid item xs={10}>
              <Skeleton />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
