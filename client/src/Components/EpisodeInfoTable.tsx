import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import moment from 'moment';
import React, { useState } from 'react';
import { EpisodeForm } from '../Forms/EpisodeForm';
import { useEpisodeQuery, useLoggedInQuery } from '../gql/queries';
import { writeAccess } from '../utils/auth';
import { ActionType } from '../utils/constants';

type Props = {
  episodeId: string;
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

export const EpisodeInfoTable = (props: Props) => {
  const classes = useStyles();
  const [showForm, setShowForm] = useState<boolean>(false);

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

  return (
    <div>
      {!episodeData?.episode && loading ? (
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
                    <Typography variant="h5">Episode Information</Typography>
                  </Grid>
                  {AuthData?.loggedIn?.role &&
                    writeAccess.includes(AuthData.loggedIn.role) && (
                      <Grid item>
                        <Button
                          color="primary"
                          variant="contained"
                          onClick={() => setShowForm(true)}
                        >
                          Edit
                        </Button>
                      </Grid>
                    )}
                </Grid>
              </Grid>

              <Grid item xs={12} className={classes.tableContent}>
                <Grid container spacing={3}>
                  <Grid item xs={2}>
                    <Typography>Title</Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography noWrap>
                      {episodeData?.episode?.title}
                    </Typography>
                  </Grid>
                  {episodeData?.episode?.alternativeTitles &&
                    episodeData?.episode?.alternativeTitles.map((altTitle) => {
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
                    <Typography>Remarks</Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Typography>
                      {episodeData?.episode?.remarks || ''}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>Episode No.</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>
                      {episodeData?.episode?.episodeNumber || '-'}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} />
                  <Grid item xs={2}>
                    <Typography>Last Updated</Typography>
                  </Grid>
                  <Grid item xs={2}>
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
          <EpisodeForm
            open={showForm}
            episodeId={props.episodeId}
            action={ActionType.UPDATE}
            onSubmit={() => refetch()}
            onClose={() => setShowForm(false)}
          />
        </>
      )}
    </div>
  );
};
