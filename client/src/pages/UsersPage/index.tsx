import {
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Role } from "../../gql/documents";
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

const UsersPage = () => {
  const classes = useStyles();
  return (
    <div>
      <Paper elevation={3} className={classes.paper}>
        <Typography>Users Page</Typography>
        Coming Soon...
      </Paper>
    </div>
  );
};

export default (props: any, key: any) =>
  withAuth([Role.Admin])(UsersPage)(props);
