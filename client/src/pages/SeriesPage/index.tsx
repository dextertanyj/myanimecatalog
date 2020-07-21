import {
  Button,
  Chip,
  createStyles,
  Grid,
  Link,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import moment from 'moment';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SeriesForm } from '../../Forms/SeriesForm';
import { useSeriesQuery } from '../../gql/queries';
import { withAuth } from '../../HOC/withAuth';
import { Action_Type } from '../../utils/constants';
import { renderSeason, renderStatus, renderType } from '../../utils/enumRender';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
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
    chip: {
      marginLeft: '2px',
      marginRight: '2px',
    },
  })
);

const SeriesPage = () => {
  const classes = useStyles();
  const { seriesId } = useParams();
  const [showForm, setShowForm] = useState<boolean>(false);

  const { data: seriesData, loading, refetch } = useSeriesQuery({
    variables: {
      where: {
        id: seriesId,
      },
    },
  });

  return (
    <div>
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
          <Grid item xs={2}>
            <Typography>Title</Typography>
          </Grid>
          <Grid item xs={10}>
            <Typography>{seriesData?.series?.title}</Typography>
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
                      <Typography>{altTitle.title}</Typography>
                    </Grid>
                  </>
                )
              );
            })}
          <Grid item xs={2}>
            <Typography>Season No.</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>{seriesData?.series?.seasonNumber || '-'}</Typography>
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
                seriesData?.series?.updatedAt || seriesData?.series?.createdAt
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
                    <Typography>
                      <Link href={reference?.link || undefined} target="_blank">
                        {reference?.link}
                      </Link>
                    </Typography>
                  </Grid>
                </>
              );
            })}
          {!!seriesData?.series?.prequels &&
            seriesData?.series?.prequels.length > 0 && (
              <>
                <Grid item xs={2}>
                  Prequels
                </Grid>
                <Grid item xs={10}>
                  {seriesData?.series?.prequels?.map((series) => (
                    <Chip label={series?.title} className={classes.chip} />
                  ))}
                </Grid>
              </>
            )}
          {!!seriesData?.series?.sequels &&
            seriesData?.series?.sequels.length > 0 && (
              <>
                <Grid item xs={2}>
                  Sequels
                </Grid>
                <Grid item xs={10}>
                  {seriesData?.series?.sequels?.map((series) => (
                    <Chip label={series?.title} className={classes.chip} />
                  ))}
                </Grid>
              </>
            )}
          {!!seriesData?.series?.mainStories &&
            seriesData?.series?.mainStories.length > 0 && (
              <>
                <Grid item xs={2}>
                  Main Story
                </Grid>
                <Grid item xs={10}>
                  {seriesData?.series?.mainStories?.map((series) => (
                    <Chip label={series?.title} className={classes.chip} />
                  ))}
                </Grid>
              </>
            )}
          {!!seriesData?.series?.sideStories &&
            seriesData?.series?.sideStories.length > 0 && (
              <>
                <Grid item xs={2}>
                  Side Stories
                </Grid>
                <Grid item xs={10}>
                  {seriesData?.series?.sideStories?.map((series) => (
                    <Chip label={series?.title} className={classes.chip} />
                  ))}
                </Grid>
              </>
            )}
          {((!!seriesData?.series?.relatedSeries &&
            seriesData.series.relatedSeries.length > 0) ||
            (!!seriesData?.series?.relatedAlternatives &&
              seriesData.series.relatedAlternatives.length > 0)) && (
            <>
              <Grid item xs={2}>
                Related Animes
              </Grid>
              <Grid item xs={10}>
                {seriesData?.series?.relatedSeries?.map((series) => (
                  <Chip label={series?.title} className={classes.chip} />
                ))}
                {seriesData?.series?.relatedAlternatives?.map((series) => (
                  <Chip label={series?.title} className={classes.chip} />
                ))}
              </Grid>
            </>
          )}
        </Grid>
      </Paper>
      <SeriesForm
        seriesId={seriesId}
        open={showForm}
        action={Action_Type.UPDATE}
        onSubmit={() => refetch()}
        onClose={() => setShowForm(false)}
      />
    </div>
  );
};

export default (props: any, key: any) => withAuth()(SeriesPage)(props);
