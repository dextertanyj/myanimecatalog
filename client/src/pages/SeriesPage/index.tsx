import { Grid } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { EpisodesTable } from '../../components/tables/EpisodesTable';
import { SeriesInfoTable } from '../../components/tables/SeriesInfoTable';
import { UserProgressInfoTable } from '../../components/tables/UserProgressInfoTable';
import { withAuth } from '../../utils/withAuth';

const SeriesPage = () => {
  const { seriesId } = useParams();

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SeriesInfoTable seriesId={seriesId} key={`${seriesId}-info`} />
        </Grid>
        <Grid item xs={12}>
          <UserProgressInfoTable
            seriesId={seriesId}
            key={`${seriesId}-progress`}
          />
        </Grid>
        <Grid item xs={12}>
          <EpisodesTable seriesId={seriesId} key={`${seriesId}-table`} />
        </Grid>
      </Grid>
    </div>
  );
};

export default (props: any, key: any) => withAuth()(SeriesPage)(props);
