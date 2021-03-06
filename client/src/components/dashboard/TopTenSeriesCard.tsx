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
import { blueGrey } from '@material-ui/core/colors';
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
      color: blueGrey[700],
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
        {loading ? (
          <></>
        ) : data?.myTopTenSeries?.length && data?.myTopTenSeries?.length > 0 ? (
          <List>
            {data?.myTopTenSeries?.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <ListItem key={`topten-${index}`}>
                    <Grid container spacing={3} className={classes.gridList}>
                      <Grid item>
                        <Typography>{index + 1}</Typography>
                      </Grid>
                      <Grid item xs zeroMinWidth>
                        <Typography>{item?.title}</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              );
            })}
          </List>
        ) : (
          <Typography>You have not rated any animes</Typography>
        )}
      </CardContent>
    </Card>
  );
};
