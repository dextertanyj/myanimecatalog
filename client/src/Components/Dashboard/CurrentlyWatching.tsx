import {
  Button,
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
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMyCurrentlyWatchingQuery } from '../../gql/queries';

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

export const CurrentlyWatching = () => {
  const classes = useStyles();
  const history = useHistory();
  const { data, loading } = useMyCurrentlyWatchingQuery({
    fetchPolicy: 'cache-and-network',
  });

  return (
    <Card elevation={3} className={classes.card} style={{ height: '100%' }}>
      <CardHeader
        className={classes.cardHeader}
        title={<Typography variant="h5">Currently Watching</Typography>}
      />
      <CardContent className={classes.cardContent}>
        {data?.myCurrentlyWatching ? (
          data?.myCurrentlyWatching.length > 0 ? (
            <List>
              {data?.myCurrentlyWatching.map((item) => {
                return (
                  <>
                    <ListItem>
                      <Grid container spacing={3} className={classes.gridList}>
                        <Grid item xs>
                          <Typography>{item?.title}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography>
                            {`${item?.progress?.completed} / ${item?.episodeCount}`}
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Typography>
                            <Button
                              variant="contained"
                              onClick={() =>
                                history.push(`/series/${item?.id}`)
                              }
                            >
                              View
                            </Button>
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    <Divider />
                  </>
                );
              })}
            </List>
          ) : (
            <Typography>Nothing is on your list right now...</Typography>
          )
        ) : (
          <Skeleton />
        )}
      </CardContent>
    </Card>
  );
};
