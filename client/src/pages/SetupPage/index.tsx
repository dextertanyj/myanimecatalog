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
import { ApolloError } from 'apollo-client';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useHistory } from 'react-router-dom';
import sha from 'sha.js';
import * as Yup from 'yup';
import { GenericError, NetworkError } from '../../Components/ErrorSnackbars';
import {
  Role,
  useCreateInitialUserMutation,
  useUserCountQuery,
} from '../../gql/queries';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const SetupPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const { enqueueSnackbar } = useSnackbar();

  const { data: count } = useUserCountQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [createInitialUserMutation] = useCreateInitialUserMutation({
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
      if (data?.createInitialUser.id) {
        enqueueSnackbar(`Successfully created account`);
        enqueueSnackbar(`Please login with the account`);
        history.push('/login');
      } else {
        enqueueSnackbar(`Failed to login`);
      }
    },
  });

  const onSubmit = async (values: any) => {
    const password = sha('sha256').update(values.password).digest('hex');
    await createInitialUserMutation({
      variables: {
        data: {
          name: values.name,
          username: values.username.toLowerCase().trim(),
          password,
          role: Role.Admin,
          passwordAttempts: 0,
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
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Formik
            initialValues={{
              username: '',
              name: '',
              password: '',
              passwordConfirm: '',
            }}
            validationSchema={Yup.object({
              username: Yup.string().required(`Please enter a username`),
              name: Yup.string().required(`Please enter your name`),
              password: Yup.string().required('Please enter a password'),
              passwordConfirm: Yup.string()
                .oneOf(
                  [Yup.ref('password'), undefined],
                  `Passwords do not match`
                )
                .required('Please enter your password again'),
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
                    id="name"
                    label="Name"
                    name="name"
                    error={touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
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
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="passwordConfirm"
                    label="Confirm Password"
                    type="password"
                    id="passwordConfirm"
                    error={touched.passwordConfirm && !!errors.passwordConfirm}
                    helperText={
                      touched.passwordConfirm && errors.passwordConfirm
                    }
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    disabled={count?.userCount !== 0}
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
