import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  MenuItem,
  TextField,
  Theme,
} from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { ApolloError } from 'apollo-client';
import { Formik, FormikProps, FormikValues } from 'formik';
import { useSnackbar } from 'notistack';
import React, { ReactElement, useEffect, useState } from 'react';
import sha from 'sha.js';
import * as Yup from 'yup';
import { GenericError, NetworkError } from '../Components/ErrorSnackbars';
import { Role } from '../gql/documents';
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useUserLazyQuery,
} from '../gql/queries';
import { ActionType } from '../utils/constants';
import { renderRole } from '../utils/enumRender';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formTitle: {
    textAlign: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  formArrayGrid: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  formItem: {
    marginTop: '0px',
    marginBottom: '0px',
  },
  dialogButtons: {
    margin: theme.spacing(2, 0, 0),
  },
}));

type Props = {
  userId?: string;
  open: boolean;
  action: ActionType;
  onSubmit: () => void;
  onClose: () => void;
};

type FormValues = {
  username: string | undefined;
  name: string | undefined;
  password: string | undefined;
  passwordConfirm: string | undefined;
  role: Role | undefined;
};

export const UserForm = (props: Props): ReactElement => {
  const { action: actionType } = props;
  const classes = useStyles();
  const [showDelete, setShowDelete] = useState<boolean>(false);
  const { enqueueSnackbar } = useSnackbar();

  const [createUserMutation] = useCreateUserMutation({
    onError: (error: ApolloError) => {
      if (error.networkError) {
        NetworkError();
      } else if (error.graphQLErrors) {
        enqueueSnackbar(error.message.replace(`GraphQL error: `, ''), {
          key: 'user-form-message',
          variant: 'warning',
        });
      } else {
        GenericError();
      }
    },
    onCompleted: () => {
      enqueueSnackbar(`Successfully created user`, {
        key: 'user-form-message',
      });
      props.onSubmit();
      props.onClose();
    },
  });

  const [updateUserMutation] = useUpdateUserMutation({
    onError: (error: ApolloError) => {
      if (error.networkError) {
        NetworkError();
      } else if (error.graphQLErrors) {
        enqueueSnackbar(error.message.replace(`GraphQL error: `, ''), {
          key: 'user-form-message',
          variant: 'warning',
        });
      } else {
        GenericError();
      }
    },
    onCompleted: () => {
      enqueueSnackbar(`Successfully updated user`, {
        key: 'user-form-message',
      });
      props.onSubmit();
      props.onClose();
    },
  });

  const [deleteUserMutation] = useDeleteUserMutation({
    onError: (error: ApolloError) => {
      if (error.networkError) {
        NetworkError();
      } else if (error.graphQLErrors) {
        enqueueSnackbar(error.message.replace(`GraphQL error: `, ''), {
          key: 'user-form-message',
          variant: 'warning',
        });
      } else {
        GenericError();
      }
    },
    onCompleted: () => {
      enqueueSnackbar(`Successfully deleted user`, {
        key: 'user-form-message',
      });
      setShowDelete(false);
      props.onSubmit();
      props.onClose();
    },
  });

  const [
    loadUser,
    { data: userData, loading: loadingUser },
  ] = useUserLazyQuery();

  useEffect(() => {
    if (props.open && props.userId) {
      loadUser({
        variables: {
          where: {
            id: props.userId,
          },
        },
      });
    }
  }, [props.userId, props.open]);

  const onSubmitCreate = async (values: FormikValues) => {
    const password = sha('sha256').update(values.password).digest('hex');
    await createUserMutation({
      variables: {
        data: {
          name: values.name,
          username: values.username.toLowerCase().trim(),
          password,
          role: values.role,
          passwordAttempts: 0,
        },
      },
    });
  };

  const onSubmitUpdate = async (values: FormikValues) => {
    if (props.userId) {
      const password =
        values.password &&
        values.password.length > 0 &&
        values.passwordConfirm &&
        sha('sha256').update(values.password).digest('hex');
      await updateUserMutation({
        variables: {
          where: { id: props.userId },
          data: {
            name: values.name,
            username: values.username.toLowerCase().trim(),
            password: password || undefined,
            role: values.role,
            passwordAttempts: (password && 0) || undefined,
          },
        },
      });
    }
  };

  const onSubmitDelete = async () => {
    if (props.userId) {
      await deleteUserMutation({
        variables: {
          where: { id: props.userId },
        },
      });
    }
  };

  const initialFormValues: FormValues = {
    username:
      (actionType === ActionType.UPDATE && userData?.user?.username) ||
      undefined,
    name:
      (actionType === ActionType.UPDATE && userData?.user?.name) || undefined,
    password: undefined,
    passwordConfirm: undefined,
    role:
      (actionType === ActionType.UPDATE && userData?.user?.role) || undefined,
  };

  const createValidationSchema = Yup.object({
    username: Yup.string().required(`Please enter a username`),
    name: Yup.string().required(`Please enter a name`),
    password: Yup.string().required(`Please enter a password`),
    passwordConfirm: Yup.string().when('password', {
      is: (password) => !!password,
      then: Yup.string()
        .required(`Passwords do no match`)
        .oneOf([Yup.ref('password')], `Passwords do not match`),
    }),
    role: Yup.string().required(`Please select a role`),
  });

  const updateValidationSchema = Yup.object({
    username: Yup.string().required(`Please enter a username`),
    name: Yup.string().required(`Please enter a name`),
    password: Yup.string(),
    passwordConfirm: Yup.string().when('password', {
      is: (password) => !!password,
      then: Yup.string()
        .required(`Passwords do no match`)
        .oneOf([Yup.ref('password')], `Passwords do not match`),
    }),
    role: Yup.string().required(`Please select a role`),
  });

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      fullWidth={true}
      maxWidth={'lg'}
    >
      <DialogTitle key="DialogTitle">
        {props.action === ActionType.CREATE
          ? `Add A New User`
          : `Editing ${userData?.user?.name}`}
      </DialogTitle>
      <DialogContent>
        {loadingUser && !userData?.user ? (
          <Skeleton variant="rect" height={400} />
        ) : (
          <Formik
            enableReinitialize={true}
            initialValues={initialFormValues}
            onSubmit={
              props.action === ActionType.CREATE
                ? onSubmitCreate
                : onSubmitUpdate
            }
            validationSchema={
              props.action === ActionType.CREATE
                ? createValidationSchema
                : updateValidationSchema
            }
          >
            {(props: FormikProps<FormValues>) => {
              const {
                values,
                errors,
                touched,
                handleSubmit,
                handleChange,
                handleBlur,
                handleReset,
              } = props;
              return (
                <form className={classes.form} onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        value={values.username}
                        error={touched.username && !!errors.username}
                        helperText={touched.username && errors.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={classes.formItem}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        value={values.name}
                        error={touched.name && !!errors.name}
                        helperText={touched.name && errors.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={classes.formItem}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        select
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        name="role"
                        label="Access Level"
                        id="role"
                        value={values.role || null}
                        InputLabelProps={{ shrink: !!values.role }}
                        error={touched.role && !!errors.role}
                        helperText={touched.role && errors.role}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={classes.formItem}
                      >
                        {Object.values(Role).map((value: Role) => {
                          return (
                            <MenuItem key={value} value={value}>
                              {renderRole(value)}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password"
                        label={
                          actionType === ActionType.CREATE
                            ? 'Password'
                            : 'Reset Password'
                        }
                        type="password"
                        id="password"
                        error={touched.password && !!errors.password}
                        helperText={touched.password && errors.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={classes.formItem}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        disabled={!values.password}
                        name="passwordConfirm"
                        label="Confirm Password"
                        type="password"
                        id="passwordConfirm"
                        error={
                          touched.passwordConfirm && !!errors.passwordConfirm
                        }
                        helperText={
                          touched.passwordConfirm && errors.passwordConfirm
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={classes.formItem}
                      />
                    </Grid>
                  </Grid>
                  <DialogActions className={classes.dialogButtons}>
                    {actionType === ActionType.UPDATE && (
                      <Button
                        onClick={() => setShowDelete(true)}
                        color="secondary"
                      >
                        Delete
                      </Button>
                    )}
                    <Button onClick={handleReset}>Reset</Button>
                    <Button type="submit" color="primary">
                      {actionType === ActionType.CREATE ? 'Create' : 'Update'}
                    </Button>
                  </DialogActions>
                </form>
              );
            }}
          </Formik>
        )}
      </DialogContent>
      <Dialog
        open={showDelete}
        onClose={() => setShowDelete(false)}
        fullWidth={true}
        maxWidth={'md'}
      >
        <DialogTitle id="alert-dialog-title">{`Delete ${userData?.user?.name}?`}</DialogTitle>
        <DialogActions>
          <Button onClick={() => setShowDelete(false)}>Cancel</Button>
          <Button onClick={() => onSubmitDelete()} color="secondary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};
