import { ApolloError } from '@apollo/client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import { Formik, FormikProps, FormikValues } from 'formik';
import { useSnackbar } from 'notistack';
import React, { ReactElement } from 'react';
import sha from 'sha.js';
import * as Yup from 'yup';
import { GenericError, NetworkError } from '../components/ErrorSnackbars';
import { useUpdateMeMutation } from '../gql/queries';

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
  userId: string;
  open: boolean;
  onSubmit?: () => void;
  onClose: () => void;
};

type FormValues = {
  currentPassword: string;
  password: string;
  passwordConfirm: string;
};

export const ChangePasswordForm = (props: Props): ReactElement => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [updateMeMutation] = useUpdateMeMutation({
    onError: (error: ApolloError) => {
      if (error.networkError) {
        NetworkError();
      } else if (error.graphQLErrors) {
        enqueueSnackbar(error.message.replace(`GraphQL error: `, ''), {
          key: 'change-password-message',
          variant: 'warning',
        });
      } else {
        GenericError();
      }
    },
    onCompleted: () => {
      enqueueSnackbar(`Successfully changed password`, {
        key: `change-password-message`,
      });
      props.onSubmit && props.onSubmit();
      props.onClose();
    },
  });

  const onSubmit = async (values: FormikValues) => {
    const currentPassword = sha('sha256')
      .update(values.currentPassword)
      .digest('hex');
    const password = sha('sha256').update(values.password).digest('hex');
    await updateMeMutation({
      variables: {
        data: {
          currentPassword,
          password,
          passwordAttempts: 0,
        },
      },
    });
  };

  const initialFormValues: FormValues = {
    currentPassword: '',
    password: '',
    passwordConfirm: '',
  };

  const validationSchema = Yup.object({
    currentPassword: Yup.string().required(
      `Please enter your current password`
    ),
    password: Yup.string().required(`Please enter a new password`),
    passwordConfirm: Yup.string().when('password', {
      is: (password) => !!password,
      then: Yup.string()
        .required(`Passwords do no match`)
        .oneOf([Yup.ref('password')], `Passwords do not match`),
    }),
  });

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      fullWidth={true}
      maxWidth={'md'}
    >
      <DialogTitle key="DialogTitle">Change Password</DialogTitle>
      <DialogContent>
        <Formik
          enableReinitialize={true}
          initialValues={initialFormValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
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
                      name="currentPassword"
                      label="Current Password"
                      type="password"
                      id="currentPassword"
                      error={
                        touched.currentPassword && !!errors.currentPassword
                      }
                      helperText={
                        touched.currentPassword && errors.currentPassword
                      }
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
                      name="password"
                      label="New Password"
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
                  <Button onClick={handleReset}>Reset</Button>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </DialogActions>
              </form>
            );
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
