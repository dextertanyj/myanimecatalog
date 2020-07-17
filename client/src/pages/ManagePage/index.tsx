import { createStyles, Grid, makeStyles, Theme } from "@material-ui/core";
import React from "react";
import { withAuth } from "../../HOC/withAuth";
import { SeriesTable } from "../../Tables/SeriesTable";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
  })
);

const ManagePage = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <SeriesTable />
        </Grid>
      </Grid>
    </div>
  );
};

export default (props: any, key: any) => withAuth()(ManagePage)(props);
