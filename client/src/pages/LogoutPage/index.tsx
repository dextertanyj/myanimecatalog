import {
  Container,
  createStyles,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import cookies from 'browser-cookies';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  })
);

export const LogoutPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    cookies.erase('MACLOGINID');
    closeSnackbar();
    enqueueSnackbar(`Successfully logged out`);
    history.push('/login');
  }, [history]);

  return (
    <Container>
      <Paper
        elevation={3}
        className={classes.paper}
        style={{ height: '500px' }}
      >
        <Typography variant="h4">Logging out...</Typography>
      </Paper>
    </Container>
  );
};
