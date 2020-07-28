import {
  Card,
  CardContent,
  CardHeader,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React from 'react';
import { UserProgress } from '../../gql/documents';
import { RatingStatisticsChart } from './RatingStatisticsChart';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      textAlign: 'center',
    },
    cardHeader: {
      padding: theme.spacing(3),
      paddingBottom: theme.spacing(1),
    },
    cardContent: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: 'calc(100% - 102px)',
    },
  })
);

type Props = {
  watchProgress: UserProgress[];
};

export const RatingStatisticsCard = (props: Props) => {
  const classes = useStyles();

  return (
    <Card elevation={3} className={classes.card} style={{ height: '100%' }}>
      <CardHeader
        className={classes.cardHeader}
        title={<Typography variant="h5">Your Ratings</Typography>}
      />
      <CardContent className={classes.cardContent}>
        <RatingStatisticsChart watchProgress={props.watchProgress} />
      </CardContent>
    </Card>
  );
};
