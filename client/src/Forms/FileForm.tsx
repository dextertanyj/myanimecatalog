import { ApolloError } from '@apollo/client';
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
import { Formik, FormikProps, FormikValues } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { GenericError, NetworkError } from '../Components/ErrorSnackbars';
import { FormLoading } from '../Components/Skeletons/FormLoading';
import {
  Source,
  useCreateFileMutation,
  useFileLazyQuery,
  useUpdateFileMutation,
} from '../gql/queries';
import { ActionType } from '../utils/constants';
import { renderSource } from '../utils/enumRender';
import { convertDuration, numberOrUndefined } from '../utils/form';

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
  episodeId?: string;
  fileId?: string;
  open: boolean;
  action: ActionType;
  onSubmit: () => void;
  onClose: () => void;
};

type FormValues = {
  path: string | undefined;
  remarks: string | undefined;
  hours: number | undefined;
  minutes: number | undefined;
  seconds: number | undefined;
  fileSize: number | undefined;
  source: Source | undefined;
  x_resolution: number | undefined;
  y_resolution: number | undefined;
  codec: string | undefined;
  checksum: string | undefined;
};

export const FileForm = (props: Props) => {
  const { action: actionType } = props;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);

  const [loadFile, { data: fileData, loading: loadingFile }] = useFileLazyQuery(
    {
      fetchPolicy: 'cache-and-network',
    }
  );

  useEffect(() => {
    if (props.open && props.fileId) {
      loadFile({
        variables: {
          where: {
            id: props.fileId,
          },
        },
      });
    }
  }, [props.fileId, props.open, loadFile]);

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [createFileMutation] = useCreateFileMutation({
    onError: (error: ApolloError) => {
      if (error.networkError) {
        NetworkError();
      } else if (error.graphQLErrors) {
        enqueueSnackbar(error.message.replace(`GraphQL error: `, ''), {
          key: 'file-form-message',
          variant: 'warning',
        });
      } else {
        GenericError();
      }
    },
    onCompleted: () => {
      enqueueSnackbar(`Successfully created file record`, {
        key: 'file-form-message',
      });
      props.onSubmit();
      props.onClose();
    },
  });

  const [updateFileMutation] = useUpdateFileMutation({
    onError: (error: ApolloError) => {
      if (error.networkError) {
        NetworkError();
      } else if (error.graphQLErrors) {
        enqueueSnackbar(error.message.replace(`GraphQL error: `, ''), {
          key: 'file-form-message',
          variant: 'warning',
        });
      } else {
        GenericError();
      }
    },
    onCompleted: () => {
      enqueueSnackbar(`Successfully updated file record`, {
        key: 'file-form-message',
      });
      props.onSubmit();
      props.onClose();
    },
  });

  const onSubmitCreate = async (values: FormikValues) => {
    if (props.episodeId) {
      let {
        path,
        hours,
        minutes,
        seconds,
        x_resolution,
        y_resolution,
        ...rest
      } = values;
      path = path.replace(/\\/g, '/');
      const duration = hours * 3600 + minutes * 60 + seconds;
      const resolution = `${x_resolution.toString()} × ${y_resolution.toString()}`;
      await createFileMutation({
        variables: {
          data: {
            path,
            duration,
            resolution,
            ...rest,
            episode: {
              connect: {
                id: props.episodeId,
              },
            },
          },
        },
      });
    } else {
      enqueueSnackbar(`Something went wrong. Please reload the page.`, {
        key: 'file-form-message',
      });
    }
  };

  const onSubmitUpdate = async (values: FormikValues) => {
    if (props.fileId) {
      let {
        path,
        hours,
        minutes,
        seconds,
        x_resolution,
        y_resolution,
        ...rest
      } = values;
      path = path.replace(/\\/g, '/');
      const duration = hours * 3600 + minutes * 60 + seconds;
      const resolution = `${x_resolution.toString()} × ${y_resolution.toString()}`;
      await updateFileMutation({
        variables: {
          where: { id: props.fileId },
          data: {
            path,
            duration,
            resolution,
            ...rest,
          },
        },
      });
    } else {
      enqueueSnackbar(`Something went wrong. Please reload the page.`, {
        key: 'file-form-message',
      });
    }
  };

  const initialFormValues: FormValues = {
    path:
      (actionType === ActionType.UPDATE && fileData?.file?.path) || undefined,
    fileSize:
      (actionType === ActionType.UPDATE && fileData?.file?.fileSize) ||
      undefined,
    hours: numberOrUndefined(
      actionType === ActionType.UPDATE &&
        convertDuration(fileData?.file?.duration)[0]
    ),
    minutes: numberOrUndefined(
      actionType === ActionType.UPDATE &&
        convertDuration(fileData?.file?.duration)[1]
    ),
    seconds: numberOrUndefined(
      actionType === ActionType.UPDATE &&
        convertDuration(fileData?.file?.duration)[2]
    ),
    x_resolution:
      (actionType === ActionType.UPDATE &&
        fileData?.file?.resolution &&
        Number.parseInt(fileData.file.resolution.split(' × ')[1])) ||
      undefined,
    y_resolution:
      (actionType === ActionType.UPDATE &&
        fileData?.file?.resolution &&
        Number.parseInt(fileData.file.resolution.split(' × ')[0])) ||
      undefined,
    codec:
      (actionType === ActionType.UPDATE && fileData?.file?.codec) || undefined,
    checksum:
      (actionType === ActionType.UPDATE && fileData?.file?.checksum) ||
      undefined,
    source:
      (actionType === ActionType.UPDATE && fileData?.file?.source) || undefined,
    remarks:
      (actionType === ActionType.UPDATE && fileData?.file?.remarks) ||
      undefined,
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      fullWidth={true}
      maxWidth={'lg'}
    >
      <DialogTitle key="DialogTitle">
        {props.action === ActionType.CREATE
          ? `Add A New File`
          : `Editing ${fileData?.file?.path?.split('/').pop()}`}
      </DialogTitle>
      <DialogContent>
        {loadingFile ? (
          <FormLoading />
        ) : (
          <Formik
            enableReinitialize={true}
            initialValues={initialFormValues}
            onSubmit={
              props.action === ActionType.CREATE
                ? onSubmitCreate
                : onSubmitUpdate
            }
            validationSchema={Yup.object({
              path: Yup.string().required(`Please enter the file path`),
              codec: Yup.string().required(`Please enter the video codec`),
              hours: Yup.number()
                .required(`Please input the duration`)
                .min(0, `Invalid duration`),
              minutes: Yup.number()
                .required(`Please input the duration`)
                .min(0, `Invalid duration`),
              seconds: Yup.number()
                .required(`Please input the duration`)
                .min(0, `Invalid duration`),
              fileSize: Yup.number()
                .required(`Please enter the file size`)
                .min(1, `Invalid file size`),
              source: Yup.string().required(`Please choose a source type`),
              x_resolution: Yup.number()
                .required(`Please enter the resolution`)
                .min(1, `Invalid resolution`),
              y_resolution: Yup.number()
                .required(`Please enter the resolution`)
                .min(1, `Invalid resolution`),
              checksum: Yup.string().required(`Please enter the checksum`),
            })}
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
                        id="path"
                        label="File Path"
                        name="path"
                        value={values.path || ''}
                        error={touched.path && !!errors.path}
                        helperText={touched.path && errors.path}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={classes.formItem}
                      />
                    </Grid>
                    <Grid item xs={4} md={2}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="hours"
                        label={innerWidth >= 600 ? 'Hours' : 'Hr'}
                        id="hours"
                        type="number"
                        value={values.hours || (values.hours === 0 ? 0 : '')}
                        error={touched.hours && !!errors.hours}
                        helperText={touched.hours && errors.hours}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={classes.formItem}
                      />
                    </Grid>
                    <Grid item xs={4} md={2}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="minutes"
                        label={innerWidth >= 600 ? 'Minutes' : 'Min'}
                        id="minutes"
                        type="number"
                        value={
                          values.minutes || (values.minutes === 0 ? 0 : '')
                        }
                        error={touched.minutes && !!errors.minutes}
                        helperText={touched.minutes && errors.minutes}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={classes.formItem}
                      />
                    </Grid>
                    <Grid item xs={4} md={2}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="seconds"
                        label={innerWidth >= 600 ? 'Seconds' : 'Sec'}
                        id="seconds"
                        type="number"
                        value={
                          values.seconds || (values.seconds === 0 ? 0 : '')
                        }
                        error={touched.seconds && !!errors.seconds}
                        helperText={touched.seconds && errors.seconds}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={classes.formItem}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="fileSize"
                        label="Size (Bytes)"
                        id="fileSize"
                        type="number"
                        value={
                          values.fileSize || (values.fileSize === 0 ? 0 : '')
                        }
                        error={touched.fileSize && !!errors.fileSize}
                        helperText={touched.fileSize && errors.fileSize}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={classes.formItem}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        name="source"
                        label="Source"
                        id="source"
                        value={values.source || ''}
                        InputLabelProps={{ shrink: !!values.source }}
                        error={touched.source && !!errors.source}
                        helperText={touched.source && errors.source}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={classes.formItem}
                      >
                        {Object.values(Source).map((value: Source) => {
                          return (
                            <MenuItem key={value} value={value}>
                              {renderSource(value)}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="x_resolution"
                        label="Resolution (Width)"
                        id="x_resolution"
                        type="number"
                        value={
                          values.x_resolution ||
                          (values.x_resolution === 0 ? 0 : '')
                        }
                        error={touched.x_resolution && !!errors.x_resolution}
                        helperText={touched.x_resolution && errors.x_resolution}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={classes.formItem}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="y_resolution"
                        label="Resolution (Height)"
                        id="y_resolution"
                        type="number"
                        value={
                          values.y_resolution ||
                          (values.y_resolution === 0 ? 0 : '')
                        }
                        error={touched.y_resolution && !!errors.y_resolution}
                        helperText={touched.y_resolution && errors.y_resolution}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={classes.formItem}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="codec"
                        label="Codec"
                        name="codec"
                        value={values.codec || ''}
                        error={touched.codec && !!errors.codec}
                        helperText={touched.codec && errors.codec}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={classes.formItem}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="checksum"
                        label="Checksum"
                        name="checksum"
                        value={values.checksum || ''}
                        error={touched.checksum && !!errors.checksum}
                        helperText={touched.checksum && errors.checksum}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={classes.formItem}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        multiline
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="remarks"
                        label="Remarks"
                        name="remarks"
                        value={values.remarks || ''}
                        error={touched.remarks && !!errors.remarks}
                        helperText={touched.remarks && errors.remarks}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={classes.formItem}
                      />
                    </Grid>
                  </Grid>
                  <DialogActions className={classes.dialogButtons}>
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
    </Dialog>
  );
};
