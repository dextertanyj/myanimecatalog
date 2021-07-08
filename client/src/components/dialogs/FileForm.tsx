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
import {
  Source,
  useCreateFileMutation,
  useFileLazyQuery,
  useUpdateFileMutation,
} from '../../gql/queries';
import { ActionType } from '../../utils/constants';
import { renderSource } from '../../utils/enumRender';
import { convertDuration, numberOrUndefined } from '../../utils/form';
import { GenericError, NetworkError } from '../ErrorSnackbars';
import { CodecAutoComplete } from '../inputs/CodecAutoComplete';
import { FormLoading } from '../skeletons/FormLoading';

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
  resolutionWidth: number | undefined;
  resolutionHeight: number | undefined;
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
      let { path, hours, minutes, seconds, ...rest } = values;
      path = path.replace(/\\/g, '/');
      const duration = hours * 3600 + minutes * 60 + seconds;
      await createFileMutation({
        variables: {
          data: {
            path,
            duration,
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
      let { path, hours, minutes, seconds, ...rest } = values;
      path = path.replace(/\\/g, '/');
      const duration = hours * 3600 + minutes * 60 + seconds;
      await updateFileMutation({
        variables: {
          where: { id: props.fileId },
          data: {
            path,
            duration,
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
    resolutionWidth: numberOrUndefined(
      actionType === ActionType.UPDATE && fileData?.file?.resolutionWidth
    ),
    resolutionHeight: numberOrUndefined(
      actionType === ActionType.UPDATE && fileData?.file?.resolutionHeight
    ),
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
              resolutionWidth: Yup.number()
                .required(`Please enter the resolution`)
                .min(1, `Invalid resolution`),
              resolutionHeight: Yup.number()
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
                setFieldValue,
                setTouched,
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
                        name="resolutionWidth"
                        label="Resolution (Width)"
                        id="resolutionWidth"
                        type="number"
                        value={
                          values.resolutionWidth ||
                          (values.resolutionWidth === 0 ? 0 : '')
                        }
                        error={
                          touched.resolutionWidth && !!errors.resolutionWidth
                        }
                        helperText={
                          touched.resolutionWidth && errors.resolutionWidth
                        }
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
                        name="resolutionHeight"
                        label="Resolution (Height)"
                        id="resolutionHeight"
                        type="number"
                        value={
                          values.resolutionHeight ||
                          (values.resolutionHeight === 0 ? 0 : '')
                        }
                        error={
                          touched.resolutionHeight && !!errors.resolutionHeight
                        }
                        helperText={
                          touched.resolutionHeight && errors.resolutionHeight
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={classes.formItem}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <CodecAutoComplete
                        fieldName="codec"
                        value={values.codec || ''}
                        touched={touched.codec}
                        error={errors.codec}
                        setFieldValue={setFieldValue}
                        setTouched={setTouched}
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
