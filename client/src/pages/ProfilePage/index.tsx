import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import React, { useState } from 'react';
import { ChangePasswordForm } from '../../Forms/ChangePasswordForm';
import { ProfileForm } from '../../Forms/ProfileForm';
import { useLoggedInQuery } from '../../gql/queries';
import { withAuth } from '../../HOC/withAuth';
import { renderRole } from '../../utils/enumRender';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(3),
    },
    gridTitle: {
      color: blueGrey[700],
      textAlign: 'left',
    },
    gridItem: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    gridButton: {
      textAlign: 'right',
    },
  })
);

const ProfilePage = () => {
  const classes = useStyles();
  const [showProfileForm, setShowProfileForm] = useState<boolean>(false);
  const [showChangePasswordForm, setShowChangePasswordForm] = useState<boolean>(
    false
  );

  const { data, refetch } = useLoggedInQuery({
    fetchPolicy: 'cache-and-network',
  });

  return (
    <div className={classes.root}>
      <Paper elevation={3} className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs className={classes.gridTitle}>
                <Typography variant="h5">Profile</Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" onClick={() => refetch()}>
                  Refresh
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setShowProfileForm(true)}
                >
                  Edit
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.gridItem}>
            <Typography variant="h6">{data?.loggedIn?.name}</Typography>
          </Grid>
          <Grid item xs={1} className={classes.gridItem}>
            <Typography>Username</Typography>
          </Grid>
          <Grid item xs={11} className={classes.gridItem}>
            <Typography>{data?.loggedIn?.username}</Typography>
          </Grid>
          <Grid item xs={1} className={classes.gridItem}>
            <Typography>Access Level</Typography>
          </Grid>
          <Grid item xs={11} className={classes.gridItem}>
            <Typography>
              {data?.loggedIn?.role && renderRole(data?.loggedIn?.role)}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowChangePasswordForm(true)}
            >
              Change Password
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <ProfileForm
        userId={data?.loggedIn?.id || ''}
        open={showProfileForm}
        onSubmit={() => refetch()}
        onClose={() => setShowProfileForm(false)}
      />
      <ChangePasswordForm
        userId={data?.loggedIn?.id || ''}
        open={showChangePasswordForm}
        onClose={() => setShowChangePasswordForm(false)}
      />
    </div>
  );
};

export default (props: any, key: any) => withAuth()(ProfilePage)(props);
