import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import React from 'react';
import { CurrentlyWatching } from '../../Components/Dashboard/CurrentlyWatching';
import { TopTenSeriesCard } from '../../Components/Dashboard/TopTenSeriesCard';
import { OverviewSkeleton } from './OverviewSkeleton';
import { RatingSkeleton } from './RatingSkeleton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: blueGrey[700],
    },
  })
);

export const DashboardSkeleton = () => {
  const classes = useStyles();
  return (
    <>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <CurrentlyWatching />
          </Grid>
          <Grid item xs={4}>
            <OverviewSkeleton />
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <RatingSkeleton />
          </Grid>
          <Grid item xs={6}>
            <TopTenSeriesCard />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
