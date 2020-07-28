import {
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Divider,
  Grid,
  List,
  ListItem,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import React from 'react';
import { useMyTopTenSeriesQuery } from '../../gql/queries';

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
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      height: 'calc(100% - 102px)',
    },
    gridList: {
      '& div': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      },
    },
  })
);

export const TopTenSeriesCard = () => {
  const classes = useStyles();

  const { data, loading } = useMyTopTenSeriesQuery({
    fetchPolicy: 'cache-and-network',
  });

  return (
    <Card elevation={3} className={classes.card} style={{ height: '100%' }}>
      <CardHeader
        className={classes.cardHeader}
        title={<Typography variant="h5">Your Top Ten Anime</Typography>}
      />
      <CardContent className={classes.cardContent}>
        {data?.myTopTenSeries ? (
          data?.myTopTenSeries.length > 0 ? (
            <List>
              {data.myTopTenSeries.map((item, index) => {
                return (
                  <>
                    <ListItem key={`topten-${index}`}>
                      <Grid container spacing={3} className={classes.gridList}>
                        <Grid item>
                          <Typography>{index + 1}</Typography>
                        </Grid>
                        <Grid item xs>
                          <Typography noWrap>{item?.title}</Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <Divider />
                  </>
                );
              })}
            </List>
          ) : (
            <Typography>You have not rated any animes</Typography>
          )
        ) : (
          <Skeleton />
        )}
      </CardContent>
    </Card>
  );
};
