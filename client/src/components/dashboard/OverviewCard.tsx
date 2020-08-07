import {
  Card,
  CardContent,
  CardHeader,
  createStyles,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import React from 'react';
import { UserProgress } from '../../gql/documents';
import { OverviewDoughnut } from './OverviewDoughnut';

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
      alignItems: 'center',
      height: 'calc(100% - 102px)',
    },
  })
);

type Props = {
  watchProgress: UserProgress[];
};

export const OverviewCard = (props: Props) => {
  const classes = useStyles();

  return (
    <Card elevation={3} className={classes.card} style={{ height: '100%' }}>
      <CardHeader
        className={classes.cardHeader}
        title={<Typography variant="h5">Overview</Typography>}
      />
      <CardContent className={classes.cardContent}>
        <OverviewDoughnut watchProgress={props.watchProgress} />
      </CardContent>
    </Card>
  );
};
