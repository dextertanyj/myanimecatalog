import {
  Chip,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { ReactElement } from 'react';
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
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    grid: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    chip: {
      margin: '3px',
    },
  })
);

export const SeriesRelatedDisplay = (props: Props): ReactElement => {
  const classes = useStyles();
  const history = useHistory();

  return !!props.seriesArray && props.seriesArray.length > 0 ? (
    <>
      <Grid item xs={2} className={classes.grid}>
        <Typography>{props.title}</Typography>
      </Grid>
      <Grid item xs={10}>
        {props.seriesArray.map((series) => (
          <Chip
            key={series?.id}
            label={series?.title}
            className={classes.chip}
            onClick={() => history.push(`/series/${series?.id}`)}
          />
        ))}
      </Grid>
    </>
  ) : (
    <></>
  );
};
