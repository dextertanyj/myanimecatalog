import {
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import React from 'react';
import { UserProgress } from '../../gql/documents';
import { RatingChart } from './RatingChart';

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
      height: 'calc(100% - 102px)',
    },
    gridContainer: {
      justifyContent: 'center',
      paddingLeft: 0,
      paddingRight: 0,
    },
  })
);

type Props = {
  watchProgress: UserProgress[];
};

export const RatingCard = (props: Props) => {
  const classes = useStyles();

  return (
    <Card elevation={3} className={classes.card} style={{ height: '100%' }}>
      <CardHeader
        className={classes.cardHeader}
        title={<Typography variant="h5">Your Ratings</Typography>}
      />
      <CardContent className={classes.cardContent}>
        <Grid container spacing={3} className={classes.gridContainer}>
          <Grid item xs={11}>
            <RatingChart watchProgress={props.watchProgress} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
