import { CircularProgress, Grid, makeStyles, Theme } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
  grid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  item: {
    textAlign: 'center',
  },
}));

export const FormLoading = () => {
  const classes = useStyles();
  return (
    <Grid container style={{ height: '250px' }} className={classes.grid}>
      <Grid item className={classes.item}>
        <CircularProgress size={50} />
      </Grid>
    </Grid>
  );
};
