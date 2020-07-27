import {
  Button,
  createStyles,
  Grid,
  Link,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import Skeleton from '@material-ui/lab/Skeleton';
import { ApolloError } from 'apollo-client';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SeriesForm } from '../Forms/SeriesForm';
import {
  useDeleteSeriesMutation,
  useLoggedInQuery,
  useSeriesQuery,
} from '../gql/queries';
import { writeAccess } from '../utils/auth';
import { ActionType } from '../utils/constants';
import { renderSeason, renderStatus, renderType } from '../utils/enumRender';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { GenericError, NetworkError } from './ErrorSnackbars';
import { SeriesRelatedDisplay } from './SeriesRelatedDisplay';

type Props = {
  seriesId: string;
};

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
    tableContent: {
      '& div': {
        '& div': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        },
      },
    },
  })
);

export const SeriesInfoTable = (props: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  const { data: AuthData } = useLoggedInQuery({
    fetchPolicy: 'cache-and-network',
  });

  const { data: seriesData, refetch, loading } = useSeriesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: props.seriesId,
      },
    },
  });

  const [deleteSeriesMutation] = useDeleteSeriesMutation({
    onError: (error: ApolloError) => {
      if (error.networkError) {
        NetworkError();
      } else if (error.graphQLErrors) {
        enqueueSnackbar(error.message.replace(`GraphQL error: `, ''), {
          key: 'delete-series-message',
          variant: 'warning',
        });
      } else {
        GenericError();
      }
    },
    onCompleted: () => {
      enqueueSnackbar(`Successfully deleted series`, {
        key: `delete-series-message`,
      });
      history.goBack();
    },
  });

  const deleteSelected = () =>
    deleteSeriesMutation({
      variables: {
        where: {
          id: props.seriesId,
        },
      },
    });

  return (
    <div>
      {!seriesData?.series && loading ? (
        <Paper elevation={3} className={classes.paper}>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" width={'75%'} />
          <Skeleton variant="text" width={'60%'} />
        </Paper>
      ) : (
        <>
          <Paper elevation={3} className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12} className={classes.tableHeader}>
                <Grid container spacing={3}>
                  <Grid item xs>
                    <Typography variant="h5"> Series Information</Typography>
                  </Grid>
                  {AuthData?.loggedIn?.role &&
                    writeAccess.includes(AuthData.loggedIn.role) && (
                      <>
                        <Grid item>
                          <Button
                            startIcon={<EditOutlinedIcon />}
                            color="primary"
                            variant="contained"
                            onClick={() => setShowForm(true)}
                          >
                            Edit
                          </Button>
                        </Grid>
                        <Grid item>
                          <Button
                            startIcon={<DeleteOutlinedIcon />}
                            color="secondary"
                            variant="contained"
                            onClick={() => setShowDeleteDialog(true)}
                          >
                            Delete
                          </Button>
                        </Grid>
                      </>
                    )}
                </Grid>
              </Grid>

              <Grid item xs={12} className={classes.tableContent}>
                <Grid container spacing={3}>
                  <Grid item xs={2}>
                    <Typography>Title</Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography noWrap>{seriesData?.series?.title}</Typography>
                  </Grid>
                  {seriesData?.series?.alternativeTitles &&
                    seriesData.series?.alternativeTitles.map((altTitle) => {
                      return (
                        altTitle?.title && (
                          <>
                            <Grid item xs={2}>
                              <Typography>Alternative Title</Typography>
                            </Grid>
                            <Grid item xs={10}>
                              <Typography noWrap>{altTitle.title}</Typography>
                            </Grid>
                          </>
                        )
                      );
                    })}
                  <Grid item xs={2}>
                    <Typography>Season No.</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>
                      {seriesData?.series?.seasonNumber || '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>No. of Episodes</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>{seriesData?.series?.episodeCount}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>
                      {!!seriesData?.series?.status &&
                        renderStatus(seriesData?.series?.status)}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>Type</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>
                      {!!seriesData?.series?.type &&
                        renderType(seriesData?.series?.type)}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>Release Season</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>{`${
                      !!seriesData?.series?.releaseSeason &&
                      renderSeason(seriesData?.series?.releaseSeason)
                    } ${moment(seriesData?.series?.releaseYear).format(
                      'YYYY'
                    )}`}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>Last Updated</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>
                      {moment(
                        seriesData?.series?.updatedAt ||
                          seriesData?.series?.createdAt
                      ).format('HH:mm   DD/MM/YYYY')}
                    </Typography>
                  </Grid>
                  {!!seriesData?.series?.references &&
                    seriesData?.series?.references.length > 0 &&
                    seriesData?.series?.references.map((reference) => {
                      return (
                        <>
                          <Grid item xs={2}>
                            <Typography>{reference?.source}</Typography>
                          </Grid>
                          <Grid item xs={10}>
                            <Typography noWrap>
                              <Link
                                href={reference?.link || undefined}
                                target="_blank"
                              >
                                {reference?.link}
                              </Link>
                            </Typography>
                          </Grid>
                        </>
                      );
                    })}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={3}>
                  {
                    <SeriesRelatedDisplay
                      key={'prequels'}
                      title={'Prequels'}
                      seriesArray={
                        seriesData?.series?.prequels as {
                          id: string;
                          title: string;
                        }[]
                      }
                    />
                  }
                  {
                    <SeriesRelatedDisplay
                      key={'sequels'}
                      title={'Sequels'}
                      seriesArray={
                        seriesData?.series?.sequels as {
                          id: string;
                          title: string;
                        }[]
                      }
                    />
                  }
                  {
                    <SeriesRelatedDisplay
                      key={'main story'}
                      title={'Main Story'}
                      seriesArray={
                        seriesData?.series?.mainStories as {
                          id: string;
                          title: string;
                        }[]
                      }
                    />
                  }
                  {
                    <SeriesRelatedDisplay
                      key={'side stories'}
                      title={'Side Stories'}
                      seriesArray={
                        seriesData?.series?.sideStories as {
                          id: string;
                          title: string;
                        }[]
                      }
                    />
                  }
                  {
                    <SeriesRelatedDisplay
                      key={'related'}
                      title={'Related'}
                      seriesArray={
                        [
                          ...(seriesData?.series?.relatedSeries || []),
                          ...(seriesData?.series?.relatedAlternatives || []),
                        ] as { id: string; title: string }[]
                      }
                    />
                  }
                </Grid>
              </Grid>
            </Grid>
          </Paper>
          {showForm && (
            <SeriesForm
              seriesId={props.seriesId}
              open={showForm}
              action={ActionType.UPDATE}
              onSubmit={() => refetch()}
              onClose={() => setShowForm(false)}
            />
          )}
          {showDeleteDialog && (
            <DeleteConfirmDialog
              open={showDeleteDialog}
              title={`Delete ${seriesData?.series?.title} ?`}
              onClose={() => setShowDeleteDialog(false)}
              onSubmit={() => deleteSelected()}
            />
          )}
        </>
      )}
    </div>
  );
};
