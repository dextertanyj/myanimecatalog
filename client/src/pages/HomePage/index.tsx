import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import React from 'react';
import { AdminCard } from '../../components/dashboard/AdminCard';
import { CurrentlyWatching } from '../../components/dashboard/CurrentlyWatching';
import { OverviewCard } from '../../components/dashboard/OverviewCard';
import { RatingCard } from '../../components/dashboard/RatingCard';
import { TopTenSeriesCard } from '../../components/dashboard/TopTenSeriesCard';
import { DashboardSkeleton } from '../../components/skeletons/DashboardSkeleton';
import { UserProgress } from '../../gql/documents';
import { useLoggedInQuery, useMyProgressQuery } from '../../gql/queries';
import { adminAccess } from '../../utils/auth';
import { withAuth } from '../../utils/withAuth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: blueGrey[700],
    },
  })
);

const HomePage = () => {
  const { data: watchProgress, loading: progressLoading } = useMyProgressQuery({
    fetchPolicy: 'cache-and-network',
  });

  const { data: user } = useLoggedInQuery({
    fetchPolicy: 'cache-and-network',
  });

  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            style={{ fontSize: '2em' }}
            className={classes.title}
          >
            Welcome back, {user?.loggedIn?.name}
          </Typography>
        </Grid>
        {progressLoading ? (
          <DashboardSkeleton />
        ) : (
          <>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <CurrentlyWatching />
                </Grid>
                <Grid item xs={12} md={4}>
                  {watchProgress?.myProgress && (
                    <OverviewCard
                      watchProgress={
                        watchProgress?.myProgress as UserProgress[]
                      }
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  {watchProgress?.myProgress && (
                    <RatingCard
                      watchProgress={
                        watchProgress?.myProgress as UserProgress[]
                      }
                    />
                  )}
                </Grid>
                <Grid item xs={12} md={6}>
                  <TopTenSeriesCard />
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
        {user?.loggedIn?.role && adminAccess.includes(user.loggedIn.role) && (
          <Grid item xs={12}>
            <AdminCard />
          </Grid>
        )}
      </Grid>
    </div>
  );
};

export default (props: any, key: any) => withAuth()(HomePage)(props);
