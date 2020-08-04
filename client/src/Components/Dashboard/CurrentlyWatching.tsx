import { ApolloError } from '@apollo/client';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  useMyCurrentlyWatchingQuery,
  useUpdateMyProgressMutation,
} from '../../gql/queries';
import { GenericError, NetworkError } from '../ErrorSnackbars';

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
  const { enqueueSnackbar } = useSnackbar();
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  const { data, refetch } = useMyCurrentlyWatchingQuery({
    fetchPolicy: 'no-cache',
  });

  const [updateUserProgressMutation] = useUpdateMyProgressMutation({
    onError: (error: ApolloError) => {
      if (error.networkError) {
        NetworkError();
      } else if (error.graphQLErrors) {
        enqueueSnackbar(error.message.replace(`GraphQL error: `, ''), {
          key: 'watch-progress-message',
          variant: 'warning',
        });
      } else {
        GenericError();
      }
    },
    onCompleted: () => {
      enqueueSnackbar(`Successfully updated watch progress`, {
        key: 'watch-progress-message',
      });
      refetch();
    },
  });

  const increaseCount = (
    seriesId: string,
    currentCount: number | null | undefined,
    maxCount: number | null | undefined
  ) => {
    if (maxCount) {
      let newCount;
      if (!currentCount || currentCount + 1 <= maxCount) {
        if (currentCount) {
          newCount = currentCount + 1;
        } else {
          newCount = 1;
        }
        updateUserProgressMutation({
          variables: {
            where: { id: seriesId },
            data: {
              completed: newCount,
            },
          },
        });
      }
    }
  };

  const decreaseCount = (
    seriesId: string,
    currentCount: number | null | undefined
  ) => {
    if (currentCount) {
      updateUserProgressMutation({
        variables: {
          where: { id: seriesId },
          data: {
            completed: currentCount - 1,
          },
        },
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Card elevation={3} className={classes.card} style={{ height: '100%' }}>
      <CardHeader
        className={classes.cardHeader}
        title={<Typography variant="h5">Currently Watching</Typography>}
      />
      <CardContent className={classes.cardContent}>
        {data?.myCurrentlyWatching?.length &&
        data?.myCurrentlyWatching.length > 0 ? (
          <List>
            {data?.myCurrentlyWatching.map((item, index) => {
              return (
                <React.Fragment key={`watching-${item?.id}`}>
                  <ListItem key={`currentlyWatching-${item?.id}`}>
                    <Grid container spacing={3} className={classes.gridList}>
                      <Grid item xs zeroMinWidth>
                        <Typography>{item?.title}</Typography>
                      </Grid>
                      {innerWidth >= 960 && (
                        <>
                          <Grid item>
                            <Grid
                              container
                              style={{ flexDirection: 'row' }}
                              spacing={1}
                            >
                              <Grid item>
                                <IconButton
                                  size="small"
                                  onClick={() =>
                                    item?.id &&
                                    decreaseCount(
                                      item.id,
                                      item.progress?.completed
                                    )
                                  }
                                >
                                  <RemoveOutlinedIcon fontSize="small" />
                                </IconButton>
                              </Grid>
                              <Grid item>
                                <Typography>
                                  {`${item?.progress?.completed ?? '0'} / ${
                                    item?.episodeCount
                                  }`}
                                </Typography>
                              </Grid>
                              <Grid item>
                                <IconButton
                                  size="small"
                                  onClick={() =>
                                    item?.id &&
                                    increaseCount(
                                      item.id,
                                      item.progress?.completed,
                                      item.episodeCount
                                    )
                                  }
                                >
                                  <AddOutlinedIcon fontSize="small" />
                                </IconButton>
                              </Grid>
                            </Grid>
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
                </React.Fragment>
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
