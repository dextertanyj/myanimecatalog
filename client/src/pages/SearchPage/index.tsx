import {
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { withAuth } from "../../HOC/withAuth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

const SearchPage = () => {
  const classes = useStyles();
  return (
    <div>
      <Paper elevation={3} className={classes.paper}>
        <Typography>Search Page</Typography>
        Coming Soon...
      </Paper>
    </div>
  );
};

export default (props: any, key: any) => withAuth()(SearchPage)(props);
