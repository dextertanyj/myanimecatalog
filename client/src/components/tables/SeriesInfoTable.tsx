import { ApolloError } from '@apollo/client';
import {
  Container,
  createStyles,
  Grid,
  IconButton,
  Link,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import { blueGrey, teal } from '@material-ui/core/colors';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  useDeleteSeriesMutation,
  useLoggedInQuery,
  useSeriesQuery,
} from '../../gql/queries';
import { writeAccess } from '../../utils/auth';
import { ActionType } from '../../utils/constants';
import {
  renderReleaseInfo,
  renderStatus,
  renderType,
} from '../../utils/enumRender';
import { DeleteConfirmDialog } from '../dialogs/DeleteConfirmDialog';
import { SeriesForm } from '../dialogs/SeriesForm';
import { GenericError, NetworkError } from '../ErrorSnackbars';
import { SeriesInfoTableSkeleton } from '../skeletons/SeriesInfoTableSkeleton';
import { SeriesRelatedDisplay } from './SeriesRelatedDisplay';

type Props = {
  seriesId: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(3),
      textAlign: 'center',
    },
    tableHeader: {
      marginBottom: '10px',
    },
    tableTitle: {
      color: blueGrey[700],
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
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
    iconButtonContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
      padding: 0,
      minHeight: '36px',
    },
  })
);

export const SeriesInfoTable = (props: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);

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
      history.push(`/catalog`);
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

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {loading && !seriesData?.series ? (
        <SeriesInfoTableSkeleton />
      ) : (
        <Paper elevation={3} className={classes.paper}>
          <Grid container spacing={3} className={classes.tableHeader}>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs className={classes.tableTitle}>
                  <Typography variant="h5"> Series Information</Typography>
                </Grid>
                {AuthData?.loggedIn?.role &&
                  writeAccess.includes(AuthData.loggedIn.role) && (
                    <Grid item>
                      <Grid container spacing={2}>
                        <Grid item>
                          <Container className={classes.iconButtonContainer}>
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => setShowForm(true)}
                            >
                              <EditOutlinedIcon />
                            </IconButton>
                          </Container>
                        </Grid>
                        <Grid item>
                          <Container className={classes.iconButtonContainer}>
                            <IconButton
                              size="small"
                              color="secondary"
                              onClick={() => setShowDeleteDialog(true)}
                            >
                              <DeleteOutlinedIcon />
                            </IconButton>
                          </Container>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
              </Grid>
            </Grid>

            <Grid item xs={12} className={classes.tableContent}>
              <Grid container spacing={3}>
                <Grid item xs={4} sm={2}>
                  <Typography>Title</Typography>
                </Grid>
                <Grid item xs={8} sm={10}>
                  <Grid container spacing={3} wrap={'nowrap'}>
                    <Grid item xs={12}>
                      <Typography>{seriesData?.series?.title}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {seriesData?.series?.alternativeTitles &&
                  seriesData.series?.alternativeTitles.map(
                    (altTitle, index) => {
                      return (
                        altTitle?.title && (
                          <React.Fragment key={altTitle?.id || index}>
                            <Grid item xs={4} sm={2}>
                              <Typography>
                                {' '}
                                {innerWidth >= 960
                                  ? `Alternative Title`
                                  : `Alt. Title`}
                              </Typography>
                            </Grid>
                            <Grid item xs={8} sm={10}>
                              <Grid container spacing={3} wrap={'nowrap'}>
                                <Grid item xs={12}>
                                  <Typography>{altTitle.title}</Typography>
                                </Grid>
                              </Grid>
                            </Grid>
                          </React.Fragment>
                        )
                      );
                    }
                  )}
                <Grid item xs={4} sm={2} md={2}>
                  <Typography>Season No.</Typography>
                </Grid>
                <Grid item xs={8} sm={4} md={2}>
                  <Typography>
                    {seriesData?.series?.seasonNumber || '⁠–'}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={2} md={2}>
                  <Typography>No. of Episodes</Typography>
                </Grid>
                <Grid item xs={8} sm={4} md={2}>
                  <Typography>
                    {seriesData?.series?.episodeCount || '⁠–'}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={2} md={2}>
                  <Typography>Status</Typography>
                </Grid>
                <Grid item xs={8} sm={4} md={2}>
                  <Typography>
                    {!!seriesData?.series?.status &&
                      renderStatus(seriesData?.series?.status)}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={2} md={2}>
                  <Typography>Type</Typography>
                </Grid>
                <Grid item xs={8} sm={4} md={2}>
                  <Typography>
                    {!!seriesData?.series?.type &&
                      renderType(seriesData?.series?.type)}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={2} md={2}>
                  <Typography>Release Season</Typography>
                </Grid>
                <Grid item xs={8} sm={4} md={2}>
                  <Typography>
                    {renderReleaseInfo(
                      seriesData?.series?.releaseSeason,
                      seriesData?.series?.releaseYear
                    )}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={2} md={2}>
                  <Typography>Last Updated</Typography>
                </Grid>
                <Grid item xs={8} sm={4} md={2}>
                  <Typography>
                    {moment(
                      seriesData?.series?.updatedAt ||
                        seriesData?.series?.createdAt
                    ).format('HH:mm   DD/MM/YYYY')}
                  </Typography>
                </Grid>
                {!!seriesData?.series?.references &&
                  seriesData?.series?.references.length > 0 && (
                    <>
                      <Grid item xs={4} sm={2}>
                        <Typography>Sources</Typography>
                      </Grid>
                      <Grid
                        item
                        xs={8}
                        sm={10}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                          flexWrap: 'wrap',
                        }}
                      >
                        {seriesData?.series?.references.map(
                          (reference, index) => {
                            return (
                              <React.Fragment key={reference?.id || index}>
                                <Link
                                  href={reference?.link || undefined}
                                  target="_blank"
                                  rel="noopener"
                                  style={{ color: teal[400] }}
                                >
                                  <Typography>{reference?.source}</Typography>
                                </Link>
                              </React.Fragment>
                            );
                          }
                        )}
                      </Grid>
                    </>
                  )}
              </Grid>
            </Grid>
            <Grid item xs={4} sm={2}>
              <Typography>Remarks</Typography>
            </Grid>
            <Grid item xs={8} sm={10}>
              <Grid container spacing={3} wrap={'nowrap'}>
                <Grid item xs={12}>
                  <Typography>{seriesData?.series?.remarks || ''}</Typography>
                </Grid>
              </Grid>
            </Grid>
            {(seriesData?.series?.prequels?.length || 0) +
              (seriesData?.series?.sequels?.length || 0) +
              (seriesData?.series?.mainStories?.length || 0) +
              (seriesData?.series?.sideStories?.length || 0) +
              (seriesData?.series?.relatedSeries?.length || 0) +
              (seriesData?.series?.relatedAlternatives?.length || 0) >
              0 && (
              <Grid item xs={12} zeroMinWidth>
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
            )}
          </Grid>
        </Paper>
      )}

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
    </div>
  );
};
