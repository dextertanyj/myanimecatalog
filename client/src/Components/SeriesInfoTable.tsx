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
import Skeleton from '@material-ui/lab/Skeleton';
import moment from 'moment';
import React, { useState } from 'react';
import { SeriesForm } from '../Forms/SeriesForm';
import { useSeriesQuery } from '../gql/queries';
import { Action_Type } from '../utils/constants';
import { renderSeason, renderStatus, renderType } from '../utils/enumRender';
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
    grid: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    gridTitle: {
      textAlign: 'left',
    },
    gridButton: {
      textAlign: 'right',
    },
    gridSpacer: {
      height: '5px',
    },
  })
);

export const SeriesInfoTable = (props: Props) => {
  const classes = useStyles();
  const [showForm, setShowForm] = useState<boolean>(false);

  const { data: seriesData, refetch, loading } = useSeriesQuery({
    fetchPolicy: 'cache-and-network',
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
            <Grid container spacing={2}>
              <Grid item xs={10} className={classes.gridTitle}>
                <Typography variant="h5"> Series Information</Typography>
              </Grid>
              <Grid item xs={2} className={classes.gridButton}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => setShowForm(true)}
                >
                  Edit
                </Button>
              </Grid>
              <Grid item xs={12} className={classes.gridSpacer} />
              <Grid item xs={2} className={classes.grid}>
                <Typography>Title</Typography>
              </Grid>
              <Grid item xs={10} className={classes.grid}>
                <Typography noWrap>{seriesData?.series?.title}</Typography>
              </Grid>
              {seriesData?.series?.alternativeTitles &&
                seriesData.series?.alternativeTitles.map((altTitle) => {
                  return (
                    altTitle?.title && (
                      <>
                        <Grid item xs={2} className={classes.grid}>
                          <Typography>Alternative Title</Typography>
                        </Grid>
                        <Grid item xs={10} className={classes.grid}>
                          <Typography noWrap>{altTitle.title}</Typography>
                        </Grid>
                      </>
                    )
                  );
                })}
              <Grid item xs={2} className={classes.grid}>
                <Typography>Season No.</Typography>
              </Grid>
              <Grid item xs={2} className={classes.grid}>
                <Typography>
                  {seriesData?.series?.seasonNumber || '-'}
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.grid}>
                <Typography>No. of Episodes</Typography>
              </Grid>
              <Grid item xs={2} className={classes.grid}>
                <Typography>{seriesData?.series?.episodeCount}</Typography>
              </Grid>
              <Grid item xs={2} className={classes.grid}>
                <Typography>Status</Typography>
              </Grid>
              <Grid item xs={2} className={classes.grid}>
                <Typography>
                  {!!seriesData?.series?.status &&
                    renderStatus(seriesData?.series?.status)}
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.grid}>
                <Typography>Type</Typography>
              </Grid>
              <Grid item xs={2} className={classes.grid}>
                <Typography>
                  {!!seriesData?.series?.type &&
                    renderType(seriesData?.series?.type)}
                </Typography>
              </Grid>
              <Grid item xs={2} className={classes.grid}>
                <Typography>Release Season</Typography>
              </Grid>
              <Grid item xs={2} className={classes.grid}>
                <Typography>{`${
                  !!seriesData?.series?.releaseSeason &&
                  renderSeason(seriesData?.series?.releaseSeason)
                } ${moment(seriesData?.series?.releaseYear).format(
                  'YYYY'
                )}`}</Typography>
              </Grid>
              <Grid item xs={2} className={classes.grid}>
                <Typography>Last Updated</Typography>
              </Grid>
              <Grid item xs={2} className={classes.grid}>
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
                      <Grid item xs={2} className={classes.grid}>
                        <Typography>{reference?.source}</Typography>
                      </Grid>
                      <Grid item xs={10} className={classes.grid}>
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
          </Paper>
          <SeriesForm
            seriesId={props.seriesId}
            open={showForm}
            action={Action_Type.UPDATE}
            onSubmit={() => refetch()}
            onClose={() => setShowForm(false)}
          />
        </>
      )}
    </div>
  );
};
