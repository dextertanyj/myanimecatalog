import {
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import React, { useState } from 'react';
import { File } from '../../gql/documents';
import { useCatalogStatisticsQuery } from '../../gql/queries';
import { renderDuration } from '../../utils/enumRender';
import { CatalogDataExportButton } from '../CatalogDataExportButton';
import { FileRecordsExportButton } from '../FileRecordsExportButton';
import { CodecChart } from './CodecChart';
import { ResolutionChart } from './ResolutionChart';
import { SourceChart } from './SourceChart';

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
    gridContainer: {
      justifyContent: 'center',
      paddingLeft: 0,
      paddingRight: 0,
    },
  })
);

export const AdminCard = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(false);

  const { data } = useCatalogStatisticsQuery({
    fetchPolicy: 'cache-and-network',
  });

  return (
    <Card elevation={3} className={classes.card} style={{ height: '100%' }}>
      <CardHeader
        className={classes.cardHeader}
        title={<Typography variant="h5">Catalog Statistics & Tools</Typography>}
      />
      <CardContent className={classes.cardContent}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={3}>
            <Typography>Series Entries:</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography>
              {data?.catalogStatistics?.totalSeriesCount || ''}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography>Episode Entries:</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography>
              {data?.catalogStatistics?.totalEpisodeCount || ''}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography>Total Duration:</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography>
              {(data?.catalogStatistics?.totalDuration &&
                renderDuration(data?.catalogStatistics?.totalDuration)) ||
                ''}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography>Total File Size:</Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography>
              {`${
                data?.catalogStatistics?.totalFileSize &&
                Math.round(data?.catalogStatistics?.totalFileSize / 1024 / 1024)
              } MB` || ''}
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container spacing={0} item className={classes.gridContainer}>
              {data?.catalogStatistics?.allFiles && (
                <ResolutionChart
                  files={data?.catalogStatistics?.allFiles as File[]}
                />
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container spacing={0} className={classes.gridContainer}>
              {data?.catalogStatistics?.allFiles && (
                <CodecChart
                  files={data?.catalogStatistics?.allFiles as File[]}
                />
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid container spacing={0} className={classes.gridContainer}>
              {data?.catalogStatistics?.allFiles && (
                <SourceChart
                  files={data?.catalogStatistics?.allFiles as File[]}
                />
              )}
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FileRecordsExportButton
              setLoading={setLoading}
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CatalogDataExportButton
              setLoading={setLoading}
              loading={loading}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
