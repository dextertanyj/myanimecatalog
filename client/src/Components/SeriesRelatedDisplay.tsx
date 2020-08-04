import {
  Chip,
  createStyles,
  Grid,
  Link,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { ReactElement, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

type SeriesBasic = {
  id: string;
  title: string;
};

type Props = {
  title: string;
  seriesArray: SeriesBasic[] | undefined;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    chip: {
      margin: '3px',
      maxWidth: '100%',
    },
  })
);

export const SeriesRelatedDisplay = (props: Props): ReactElement => {
  const classes = useStyles();
  const history = useHistory();
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return !!props.seriesArray && props.seriesArray.length > 0 ? (
    <>
      <Grid item xs={4} sm={2} className={classes.title} zeroMinWidth>
        <Typography>{props.title}</Typography>
      </Grid>
      <Grid item xs={8} sm={10} zeroMinWidth>
        {props.seriesArray.map((series) =>
          innerWidth >= 960 ? (
            <Chip
              key={series?.id}
              label={series?.title}
              className={classes.chip}
              onClick={() => history.push(`/series/${series?.id}`)}
            />
          ) : (
            <Link
              href="#"
              onClick={() => history.push(`/series/${series?.id}`)}
            >
              <Typography>{series.title}</Typography>
            </Link>
          )
        )}
      </Grid>
    </>
  ) : (
    <></>
  );
};
