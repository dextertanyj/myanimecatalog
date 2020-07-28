import {
  createStyles,
  Divider,
  Grid,
  List,
  ListItem,
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
    listItem: {
      marginTop: '10px',
      marginBottom: '10px',
      paddingLeft: '12px',
      paddingRight: '12px',
    },
  })
);

export const FileListSkeleton = () => {
  const classes = useStyles();
  return (
    <Paper elevation={3} className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes.tableHeader}>
          <Grid container spacing={3}>
            <Grid item xs>
              <Typography variant="h5">Files</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <List>
            <Divider />
            <ListItem className={classes.listItem}>
              <Skeleton key={`file-skeleton-1`} />
              <Skeleton key={`file-skeleton-2`} width={'85%'} />
              <Skeleton key={`file-skeleton-3`} width={'75%'} />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Paper>
  );
};