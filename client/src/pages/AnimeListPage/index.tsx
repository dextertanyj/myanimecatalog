import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { AnimeListTable } from '../../components/tables/AnimeListTable';
import { withAuth } from '../../utils/withAuth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageGrid: {
      height: '100%',
    },
  })
);

const AnimeListPage = () => {
  const classes = useStyles();
  const [fullHeight, setFullHeight] = useState<number>(
    window.innerWidth > 600 ? window.innerHeight - 100 : window.innerHeight - 92
  );

  useEffect(() => {
    const handleResize = () => {
      setFullHeight(
        window.innerWidth > 600
          ? window.innerHeight - 100
          : window.innerHeight - 92
      );
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ height: fullHeight }}>
      <Grid container spacing={3} className={classes.pageGrid}>
        <Grid item xs={12} className={classes.pageGrid}>
          <AnimeListTable />
        </Grid>
      </Grid>
    </div>
  );
};

export default (props: any, key: any) => withAuth()(AnimeListPage)(props);
