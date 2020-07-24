import { Grid } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { EpisodeInfoTable } from '../../Components/EpisodeInfoTable';
import { withAuth } from '../../HOC/withAuth';

const EpisodePage = () => {
  const { episodeId } = useParams();
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <EpisodeInfoTable episodeId={episodeId} key={episodeId} />
        </Grid>
      </Grid>
    </div>
  );
};

export default (props: any, key: any) => withAuth()(EpisodePage)(props);
