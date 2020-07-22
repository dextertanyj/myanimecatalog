import { createStyles, Grid, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { Role } from '../../gql/documents';
import { withAuth } from '../../HOC/withAuth';
import { UsersTable } from '../../Tables/UsersTable';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

const UsersPage = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <UsersTable />
        </Grid>
      </Grid>
    </div>
  );
};

export default (props: any, key: any) =>
  withAuth([Role.Admin])(UsersPage)(props);
