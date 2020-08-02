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
import { blueGrey } from '@material-ui/core/colors';
import React, { useEffect, useState } from 'react';
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

export const CurrentlyWatching = () => {
  const classes = useStyles();
  const history = useHistory();
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  const { data, loading } = useMyCurrentlyWatchingQuery({
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  return (
    <Card elevation={3} className={classes.card} style={{ height: '100%' }}>
      <CardHeader
        className={classes.cardHeader}
        title={<Typography variant="h5">Currently Watching</Typography>}
      />
      <CardContent className={classes.cardContent}>
        {loading ? (
          <></>
        ) : data?.myCurrentlyWatching?.length &&
          data?.myCurrentlyWatching.length > 0 ? (
          <List>
            {data?.myCurrentlyWatching.map((item, index) => {
              return (
                <>
                  <ListItem key={`currentlyWatching-${index}`}>
                    <Grid container spacing={3} className={classes.gridList}>
                      <Grid item xs zeroMinWidth>
                        <Typography>{item?.title}</Typography>
                      </Grid>
                      {innerWidth >= 960 && (
                        <>
                          <Grid item>
                            <Typography>
                              {`${item?.progress?.completed ?? '0'} / ${
                                item?.episodeCount
                              }`}
                            </Typography>
                          </Grid>
                          <Grid item>
                            <Typography>
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                  history.push(`/series/${item?.id}`)
                                }
                              >
                                View
                              </Button>
                            </Typography>
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </ListItem>
                  <Divider />
                </>
              );
            })}
          </List>
        ) : (
          <Typography>Nothing is on your list right now...</Typography>
        )}
      </CardContent>
    </Card>
  );
};
