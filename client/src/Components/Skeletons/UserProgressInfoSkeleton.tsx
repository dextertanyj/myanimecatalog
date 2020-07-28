import {
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(3),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    tableHeader: {
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

export const UserProgressInfoSkeleton = () => {
  const classes = useStyles();
  return (
    <Paper elevation={3} className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.tableHeader}>
          <Grid container spacing={3}>
            <Grid item xs>
              <Typography variant="h5">Watch Progress</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={2}>
              <Typography>Watch Status</Typography>
            </Grid>
            <Grid item xs={2}>
              <Skeleton />
            </Grid>
            <Grid item xs={2}>
              <Typography>Episodes</Typography>
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
              <Typography>Overall</Typography>
            </Grid>
            <Grid item xs={10}>
              <Skeleton />
            </Grid>
            <Grid item xs={2}>
              <Typography>Story</Typography>
            </Grid>
            <Grid item xs={4}>
              <Skeleton />
            </Grid>
            <Grid item xs={2}>
              <Typography>Execution</Typography>
            </Grid>
            <Grid item xs={4}>
              <Skeleton />
            </Grid>
            <Grid item xs={2}>
              <Typography>Appeal</Typography>
            </Grid>
            <Grid item xs={4}>
              <Skeleton />
            </Grid>
            <Grid item xs={2}>
              <Typography>Character</Typography>
            </Grid>
            <Grid item xs={4}>
              <Skeleton />
            </Grid>
            <Grid item xs={2}>
              <Typography>Art</Typography>
            </Grid>
            <Grid item xs={4}>
              <Skeleton />
            </Grid>
            <Grid item xs={2}>
              <Typography>Music</Typography>
            </Grid>
            <Grid item xs={4}>
              <Skeleton />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
