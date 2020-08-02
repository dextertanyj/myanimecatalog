import { ApolloError } from '@apollo/client';
import {
  Button,
  Chip,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
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
  })
);

export const EpisodeInfo = (props: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

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

  return (
    <div>
      {!episodeData?.episode && loading ? (
        <EpisodeInfoSkeleton />
      ) : (
        <Paper elevation={3} className={classes.paper}>
          <Grid container spacing={3} className={classes.tableHeader}>
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm className={classes.tableTitle}>
                  <Typography variant="h5">Episode Information</Typography>
                </Grid>
                {AuthData?.loggedIn?.role &&
                  writeAccess.includes(AuthData.loggedIn.role) && (
                    <Grid item xs={12} sm={'auto'}>
                      <Grid container spacing={3}>
                        <Grid item xs={6}>
                          <Button
                            fullWidth
                            startIcon={<EditOutlinedIcon />}
                            color="primary"
                            variant="contained"
                            onClick={() => setShowForm(true)}
                          >
                            Edit
                          </Button>
                        </Grid>
                        <Grid item xs={6}>
                          <Button
                            fullWidth
                            startIcon={<DeleteOutlinedIcon />}
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                              setShowDeleteDialog(true);
                            }}
                          >
                            Delete
                          </Button>
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
                      <Typography>{episodeData?.episode?.title}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                {episodeData?.episode?.alternativeTitles &&
                  episodeData?.episode?.alternativeTitles.map((altTitle) => {
                    return (
                      altTitle?.title && (
                        <>
                          <Grid item xs={4} sm={2}>
                            <Typography>Alternative Title</Typography>
                          </Grid>
                          <Grid item xs={8} sm={10}>
                            <Grid container spacing={3} wrap={'nowrap'}>
                              <Grid item xs={12}>
                                <Typography noWrap>{altTitle.title}</Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </>
                      )
                    );
                  })}

                <Grid item xs={4} sm={2} md={2}>
                  <Typography>Series</Typography>
                </Grid>
                <Grid item xs={8} sm={10} md={6}>
                  <Grid container>
                    <Grid item xs={12} style={{ flexDirection: 'row' }}>
                      <Chip
                        label={episodeData?.episode?.series?.title}
                        onClick={() =>
                          history.push(
                            `/series/${episodeData?.episode?.series?.id}`
                          )
                        }
                      />
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
