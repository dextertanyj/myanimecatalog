import {
  Button,
  createStyles,
  Grid,
  LinearProgress,
  makeStyles,
  Paper,
  Theme,
  Typography,
  withStyles,
} from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import moment from 'moment';
import React, { useState } from 'react';
import { UserProgressForm } from '../Forms/UserProgressForm';
import { useMySeriesProgressQuery } from '../gql/queries';
import { ActionType } from '../utils/constants';
import { renderWatchStatus } from '../utils/enumRender';
import { UserProgressInfoSkeleton } from './Skeletons/UserProgressInfoSkeleton';

type Props = {
  seriesId: string;
};

const BorderLinearProgress = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 15,
      borderRadius: 15,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 15,
    },
  })
)(LinearProgress);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(3),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    tableHeader: {
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
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      },
    },
    listItem: {
      marginTop: '10px',
      paddingLeft: '12px',
      paddingRight: '12px',
    },
  })
);

export const UserProgressInfo = (props: Props) => {
  const classes = useStyles();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formActionType, setFormActionType] = useState<ActionType>(
    ActionType.CREATE
  );

  console.log(props.seriesId);

  const { data: progress, refetch, loading } = useMySeriesProgressQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: props.seriesId,
      },
    },
  });

  return (
    <div>
      {loading && !progress?.mySeriesProgress ? (
        <UserProgressInfoSkeleton />
      ) : (
        <Paper elevation={3} className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12} className={classes.tableHeader}>
              <Grid container spacing={3}>
                <Grid item xs>
                  <Typography variant="h5">Watch Progress</Typography>
                </Grid>
                {!progress?.mySeriesProgress ? (
                  <Grid item>
                    <Button
                      color="primary"
                      variant="contained"
                      startIcon={<EditOutlinedIcon />}
                      onClick={() => {
                        setFormActionType(ActionType.CREATE);
                        setShowForm(true);
                      }}
                    >
                      Update
                    </Button>
                  </Grid>
                ) : (
                  <Grid item>
                    <Button
                      color="primary"
                      variant="contained"
                      startIcon={<EditOutlinedIcon />}
                      onClick={() => {
                        setFormActionType(ActionType.UPDATE);
                        setShowForm(true);
                      }}
                    >
                      Update
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Grid>
            {!progress?.mySeriesProgress ? (
              <Grid item xs={12}>
                <Typography variant="overline" style={{ fontSize: '1em' }}>
                  No existing watch progress record found
                </Typography>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Grid container spacing={3} className={classes.tableContent}>
                  <Grid item xs={2}>
                    <Typography>Watch Status</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>
                      {progress?.mySeriesProgress?.status &&
                        renderWatchStatus(progress?.mySeriesProgress?.status)}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>Episodes</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>
                      {progress?.mySeriesProgress?.completed || '0'} /{' '}
                      {progress?.mySeriesProgress?.series?.episodeCount}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>Last Updated</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>
                      {moment(
                        progress?.mySeriesProgress?.updatedAt ||
                          progress?.mySeriesProgress?.createdAt
                      ).format('HH:mm DD/MM/YYYY')}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>Overall</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    {progress?.mySeriesProgress?.overall ? (
                      <BorderLinearProgress
                        variant="determinate"
                        value={progress?.mySeriesProgress?.overall}
                      />
                    ) : (
                      <BorderLinearProgress variant="determinate" value={0} />
                    )}
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>
                      {progress?.mySeriesProgress?.overall || 0} / 100
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>Story</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    {progress?.mySeriesProgress?.story ? (
                      <BorderLinearProgress
                        variant="determinate"
                        value={progress?.mySeriesProgress?.story}
                      />
                    ) : (
                      <BorderLinearProgress variant="determinate" value={0} />
                    )}
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>
                      {progress?.mySeriesProgress?.story || 0} / 100
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>Execution</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    {progress?.mySeriesProgress?.execution ? (
                      <BorderLinearProgress
                        variant="determinate"
                        value={progress?.mySeriesProgress?.execution}
                      />
                    ) : (
                      <BorderLinearProgress variant="determinate" value={0} />
                    )}
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>
                      {progress?.mySeriesProgress?.execution || 0} / 100
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>Appeal</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    {progress?.mySeriesProgress?.appeal ? (
                      <BorderLinearProgress
                        variant="determinate"
                        value={progress?.mySeriesProgress?.appeal}
                      />
                    ) : (
                      <BorderLinearProgress variant="determinate" value={0} />
                    )}
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>
                      {progress?.mySeriesProgress?.appeal || 0} / 100
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>Character</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    {progress?.mySeriesProgress?.character ? (
                      <BorderLinearProgress
                        variant="determinate"
                        value={progress?.mySeriesProgress?.character}
                      />
                    ) : (
                      <BorderLinearProgress variant="determinate" value={0} />
                    )}
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>
                      {progress?.mySeriesProgress?.character || 0} / 100
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>Art</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    {progress?.mySeriesProgress?.art ? (
                      <BorderLinearProgress
                        variant="determinate"
                        value={progress?.mySeriesProgress?.art}
                      />
                    ) : (
                      <BorderLinearProgress variant="determinate" value={0} />
                    )}
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>
                      {progress?.mySeriesProgress?.art || 0} / 100
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>Music</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    {progress?.mySeriesProgress?.sound ? (
                      <BorderLinearProgress
                        variant="determinate"
                        value={progress?.mySeriesProgress?.sound}
                      />
                    ) : (
                      <BorderLinearProgress variant="determinate" value={0} />
                    )}
                  </Grid>
                  <Grid item xs={1}>
                    <Typography>
                      {progress?.mySeriesProgress?.sound || 0} / 100
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>Comments</Typography>
                  </Grid>
                  <Grid item xs={10}>
                    <Grid container spacing={3} wrap={'nowrap'}>
                      <Grid item xs={12}>
                        <Typography>
                          {progress?.mySeriesProgress?.remarks || ''}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Paper>
      )}
      {showForm && (
        <UserProgressForm
          open={showForm}
          action={formActionType}
          seriesId={props.seriesId}
          progressId={
            formActionType === ActionType.UPDATE
              ? progress?.mySeriesProgress?.id ?? undefined
              : undefined
          }
          onSubmit={() => refetch()}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};
