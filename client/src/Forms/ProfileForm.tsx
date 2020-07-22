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
import Skeleton from '@material-ui/lab/Skeleton';
import { ApolloError } from 'apollo-client';
import { Formik, FormikProps, FormikValues } from 'formik';
import React, { ReactElement, useEffect } from 'react';
import * as Yup from 'yup';
import { useUpdateUserMutation, useUserLazyQuery } from '../gql/queries';

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
  onSubmit: () => void;
  onClose: () => void;
};

type FormValues = {
  username: string | undefined;
  name: string | undefined;
};

export const ProfileForm = (props: Props): ReactElement => {
  const classes = useStyles();

  const [updateUserMutation] = useUpdateUserMutation({
    onCompleted: () => {
      props.onSubmit();
      props.onClose();
    },
    onError: (error: ApolloError) => {
      console.log(error);
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

  const onSubmit = async (values: FormikValues) => {
    await updateUserMutation({
      variables: {
        where: { id: props.userId },
        data: {
          name: values.name,
          username: values.username.toLowerCase().trim(),
        },
      },
    });
  };

  const initialFormValues: FormValues = {
    username: userData?.user?.username || undefined,
    name: userData?.user?.name || undefined,
  };

  const validationSchema = Yup.object({
    username: Yup.string().required(`Please enter a username`),
    name: Yup.string().required(`Please enter a name`),
  });

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      fullWidth={true}
      maxWidth={'md'}
    >
      <DialogTitle key="DialogTitle">Update Profile</DialogTitle>
      <DialogContent>
        {loadingUser && !userData?.user ? (
          <Skeleton variant="rect" height={400} />
        ) : (
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
                  </Grid>
                  <DialogActions>
                    <Button onClick={handleReset}>Reset</Button>
                    <Button type="submit" color="primary">
                      Update
                    </Button>
                  </DialogActions>
                </form>
              );
            }}
          </Formik>
        )}
      </DialogContent>
    </Dialog>
  );
};