import { Grid } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { SeriesInfoTable } from '../../Components/SeriesInfoTable';
import { withAuth } from '../../HOC/withAuth';
import { EpisodesTable } from '../../Tables/EpisodesTable';

const SeriesPage = () => {
  const { seriesId } = useParams();

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SeriesInfoTable seriesId={seriesId} key={seriesId} />
        </Grid>
        <Grid item xs={12}>
          <EpisodesTable seriesId={seriesId} key={`${seriesId}-table`} />
        </Grid>
      </Grid>
    </div>
  );
};

export default (props: any, key: any) => withAuth()(SeriesPage)(props);
