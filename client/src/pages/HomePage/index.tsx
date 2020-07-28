import {
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import React from 'react';
import { CurrentlyWatching } from '../../Components/Dashboard/CurrentlyWatching';
import { WatchStatusPaper } from '../../Components/Dashboard/WatchStatusPaper';
import { UserProgress } from '../../gql/documents';
import { useLoggedInQuery, useMyProgressQuery } from '../../gql/queries';
import { withAuth } from '../../HOC/withAuth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      color: blueGrey[600],
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
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={9}>
              <CurrentlyWatching />
            </Grid>
            <Grid item xs={3}>
              {watchProgress?.myProgress && (
                <WatchStatusPaper
                  watchProgress={watchProgress?.myProgress as UserProgress[]}
                />
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default (props: any, key: any) => withAuth()(HomePage)(props);
