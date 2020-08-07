import { ApolloError } from '@apollo/client';
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  makeStyles,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useHistory } from 'react-router-dom';
import sha from 'sha.js';
import * as Yup from 'yup';
import { GenericError, NetworkError } from '../../components/ErrorSnackbars';
import { useLoginMutation } from '../../gql/queries';
import { setLoginToken } from '../../utils/auth';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(3),
    width: theme.spacing(7),
    height: theme.spacing(7),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const LoginPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [loginMutation] = useLoginMutation({
    onError: (error: ApolloError) => {
      if (error.networkError) {
        NetworkError();
      } else if (error.graphQLErrors) {
        enqueueSnackbar(error.message.replace(`GraphQL error: `, ''), {
          key: 'login-error',
          variant: 'warning',
        });
      } else {
        GenericError();
      }
    },
    onCompleted: (data) => {
      if (data.login.user && data.login.token) {
        try {
          setLoginToken(data.login.token);
          closeSnackbar();
          enqueueSnackbar(`Successfully logged in`);
          history.push('/');
        } catch (error) {
          enqueueSnackbar(`Failed to login`);
        }
      } else {
        enqueueSnackbar(`Failed to login`);
      }
    },
  });

  const onSubmit = async (values: any) => {
    const password = sha('sha256').update(values.password).digest('hex');
    await loginMutation({
      variables: {
        data: {
          username: values.username.toLowerCase().trim(),
          password,
        },
      },
    });
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon fontSize="large" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Welcome
          </Typography>
          <Formik
            initialValues={{
              username: '',
              password: '',
            }}
            validationSchema={Yup.object({
              username: Yup.string().required(`Please enter your username`),
              password: Yup.string().required(`Please enter your password`),
            })}
            onSubmit={onSubmit}
          >
            {(props) => {
              const {
                errors,
                touched,
                handleSubmit,
                handleChange,
                handleBlur,
              } = props;
              return (
                <form className={classes.form} onSubmit={handleSubmit}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoFocus
                    error={touched.username && !!errors.username}
                    helperText={touched.username && errors.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Sign In
                  </Button>
                </form>
              );
            }}
          </Formik>
        </div>
      </Container>
    </div>
  );
};
