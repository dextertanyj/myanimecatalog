import { Grid } from '@material-ui/core';
import React from 'react';
import { useParams } from 'react-router-dom';
import { EpisodeInfoTable } from '../../components/tables/EpisodeInfoTable';
import { FileInfoList } from '../../components/tables/FileInfoList';
import { withAuth } from '../../utils/withAuth';

const EpisodePage = () => {
  const { episodeId } = useParams();
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12} key={`episode-page-1`}>
          <EpisodeInfoTable episodeId={episodeId} key={`${episodeId}-info`} />
        </Grid>
        <Grid item xs={12} key={`episode-page-2`}>
          <FileInfoList episodeId={episodeId} key={`${episodeId}-files`} />
        </Grid>
      </Grid>
    </div>
  );
};

export default (props: any, key: any) => withAuth()(EpisodePage)(props);
