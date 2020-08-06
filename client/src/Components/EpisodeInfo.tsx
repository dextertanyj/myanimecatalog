import { ApolloError } from '@apollo/client';
import {
  Chip,
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
import { EpisodeForm } from '../Forms/EpisodeForm';
import {
  useDeleteEpisodeMutation,
  useEpisodeQuery,
  useLoggedInQuery,
} from '../gql/queries';
import { writeAccess } from '../utils/auth';
import { ActionType } from '../utils/constants';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { GenericError, NetworkError } from './ErrorSnackbars';
import { EpisodeInfoSkeleton } from './Skeletons/EpisodeInfoSkeleton';

type Props = {
  episodeId: string;
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

export const EpisodeInfo = (props: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);

  const { data: AuthData } = useLoggedInQuery({
    fetchPolicy: 'cache-and-network',
  });

  const { data: episodeData, refetch, loading } = useEpisodeQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: props.episodeId,
      },
    },
  });

  const [deleteEpisodeMutation] = useDeleteEpisodeMutation({
    onError: (error: ApolloError) => {
      if (error.networkError) {
        NetworkError();
      } else if (error.graphQLErrors) {
        enqueueSnackbar(error.message.replace(`GraphQL error: `, ''), {
          key: 'delete-episode-message',
          variant: 'warning',
        });
      } else {
        GenericError();
      }
    },
    onCompleted: () => {
      enqueueSnackbar(`Successfully deleted episode`, {
        key: 'delete-episode-message',
      });
      history.goBack();
    },
  });

  const deleteEpisode = () => {
    deleteEpisodeMutation({
      variables: {
        where: {
          id: props.episodeId,
        },
      },
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {!episodeData?.episode && loading ? (
        <EpisodeInfoSkeleton />
      ) : (
        <Paper elevation={3} className={classes.paper}>
          <Grid container spacing={3} className={classes.tableHeader}>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs className={classes.tableTitle}>
                  <Typography variant="h5">Episode Information</Typography>
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
                  <Grid container spacing={3}>
                    <Grid item xs={12} zeroMinWidth>
                      <Typography>{episodeData?.episode?.title}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {episodeData?.episode?.alternativeTitles &&
                  episodeData?.episode?.alternativeTitles.map(
                    (altTitle, index) => {
                      return (
                        altTitle?.title && (
                          <React.Fragment key={altTitle?.id || index}>
                            <Grid item xs={4} sm={2}>
                              <Typography>
                                {innerWidth >= 960
                                  ? `Alternative Title`
                                  : `Alt. Title`}
                              </Typography>
                            </Grid>
                            <Grid item xs={8} sm={10}>
                              <Grid container spacing={3}>
                                <Grid item xs={12} zeroMinWidth>
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
                  <Typography>Series</Typography>
                </Grid>
                <Grid item xs={8} sm={10} md={6}>
                  <Grid container>
                    <Grid
                      item
                      xs={12}
                      zeroMinWidth
                      style={{ flexDirection: 'row' }}
                    >
                      {innerWidth >= 960 ? (
                        <Chip
                          label={episodeData?.episode?.series?.title}
                          onClick={() =>
                            history.push(
                              `/series/${episodeData?.episode?.series?.id}`
                            )
                          }
                        />
                      ) : (
                        <Link
                          onClick={() =>
                            history.push(
                              `/series/${episodeData?.episode?.series?.id}`
                            )
                          }
                          style={{ color: teal[400] }}
                        >
                          <Typography>
                            {episodeData?.episode?.series?.title}
                          </Typography>
                        </Link>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4} sm={2} md={2}>
                  <Typography>Episode No.</Typography>
                </Grid>
                <Grid item xs={8} sm={10} md={2}>
                  <Typography>
                    {episodeData?.episode?.episodeNumber || '-'}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={2} md={2}>
                  <Typography>Remarks</Typography>
                </Grid>
                <Grid item xs={8} sm={10} md={6}>
                  <Grid container spacing={3} wrap={'nowrap'}>
                    <Grid item xs={12}>
                      <Typography>
                        {episodeData?.episode?.remarks || ''}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={4} sm={2} md={2}>
                  <Typography>Last Updated</Typography>
                </Grid>
                <Grid item xs={8} sm={10} md={2}>
                  <Typography>
                    {moment(
                      episodeData?.episode?.updatedAt ||
                        episodeData?.episode?.createdAt
                    ).format('HH:mm   DD/MM/YYYY')}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      )}
      {showForm && (
        <EpisodeForm
          open={showForm}
          episodeId={props.episodeId}
          action={ActionType.UPDATE}
          onSubmit={() => refetch()}
          onClose={() => setShowForm(false)}
        />
      )}
      {showDeleteDialog && (
        <DeleteConfirmDialog
          open={showDeleteDialog}
          title={`Delete ${episodeData?.episode?.title} ?`}
          onClose={() => setShowDeleteDialog(false)}
          onSubmit={() => deleteEpisode()}
        />
      )}
    </div>
  );
};
