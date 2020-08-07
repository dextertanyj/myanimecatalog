import { Grid } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { EpisodeInfo } from '../../components/EpisodeInfo';
import { FileList } from '../../components/FileList';
import { withAuth } from '../../HOC/withAuth';

const EpisodePage = () => {
  const { episodeId } = useParams();
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} key={`episode-page-1`}>
          <EpisodeInfo episodeId={episodeId} key={`${episodeId}-info`} />
        </Grid>
        <Grid item xs={12} key={`episode-page-2`}>
          <FileList episodeId={episodeId} key={`${episodeId}-files`} />
        </Grid>
      </Grid>
    </div>
  );
};

export default (props: any, key: any) => withAuth()(EpisodePage)(props);
