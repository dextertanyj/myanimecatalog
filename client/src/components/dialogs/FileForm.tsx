import { ApolloError } from '@apollo/client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Hidden,
  makeStyles,
  MenuItem,
  Switch,
  TextField,
  Theme,
  Typography
} from '@material-ui/core';
import { Formik, FormikProps, FormikValues } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import {
  Source,
  useCreateFileMutation,
  useFileLazyQuery,
  useUpdateFileMutation
} from '../../gql/queries';
import { ActionType } from '../../utils/constants';
import { renderSource } from '../../utils/enumRender';
import { convertDuration, numberOrUndefined } from '../../utils/form';
import { FileFormValidationSchema } from '../../utils/validation';
import { GenericError, NetworkError } from '../ErrorSnackbars';
import { CodecAutoComplete } from '../inputs/CodecAutoComplete';
import { FileInfoPopulateField } from '../inputs/FileInfoPopulateFieldButton';
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

export type FormValues = {
  path: string | undefined;
  remarks: string | undefined;
  hours: number | undefined;
  minutes: number | undefined;
  seconds: number | undefined;
  size: number | undefined;
  source: Source | undefined;
  width: number | undefined;
  height: number | undefined;
  codec: string | undefined;
  checksum: string | undefined;
};

export const FileForm = (props: Props) => {
  const { action: actionType } = props;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  const [advancedTools, setAdvancedTools] = useState<boolean>(false);

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

  const toggleAdvancedTools = () => {
    setAdvancedTools(!advancedTools);
  };

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
        width,
        height,
        size,
        ...rest
      } = values;
      path = path.replace(/\\/g, '/');
      const fileSize = size;
      const duration = hours * 3600 + minutes * 60 + seconds;
      const resolutionWidth = width;
      const resolutionHeight = height;
      await createFileMutation({
        variables: {
          data: {
            path,
            duration,
            resolutionWidth,
            resolutionHeight,
            fileSize,
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
        width,
        height,
        size,
        ...rest
      } = values;
      path = path.replace(/\\/g, '/');
      const fileSize = size;
      const duration = hours * 3600 + minutes * 60 + seconds;
      const resolutionWidth = width;
      const resolutionHeight = height;
      await updateFileMutation({
        variables: {
          where: { id: props.fileId },
          data: {
            path,
            duration,
            resolutionWidth,
            resolutionHeight,
            fileSize,
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
    size:
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
    width: numberOrUndefined(
      actionType === ActionType.UPDATE && fileData?.file?.resolutionWidth
    ),
    height: numberOrUndefined(
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
      <DialogTitle disableTypography key="DialogTitle">
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6">
              {props.action === ActionType.CREATE
                ? `Add A New File`
                : `Editing ${fileData?.file?.path?.split('/').pop()}`}
            </Typography>
          </Grid>
          <Hidden smDown>
            <Grid item container sm={6} justify="flex-end">
              <FormControlLabel
                control={
                  <Switch
                    checked={advancedTools}
                    onChange={toggleAdvancedTools}
                    name="advancedToolToggle"
                    color="primary"
                  />
                }
                label="Advanced Tools"
                labelPlacement="start"
              />
            </Grid>
          </Hidden>
        </Grid>
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
            validationSchema={FileFormValidationSchema}
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
                        name="size"
                        label="Size (Bytes)"
                        id="size"
                        type="number"
                        value={values.size || (values.size === 0 ? 0 : '')}
                        error={touched.size && !!errors.size}
                        helperText={touched.size && errors.size}
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
                        name="width"
                        label="Resolution (Width)"
                        id="width"
                        type="number"
                        value={values.width || (values.width === 0 ? 0 : '')}
                        error={touched.width && !!errors.width}
                        helperText={touched.width && errors.width}
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
                        name="height"
                        label="Resolution (Height)"
                        id="height"
                        type="number"
                        value={values.height || (values.height === 0 ? 0 : '')}
                        error={touched.height && !!errors.height}
                        helperText={touched.height && errors.height}
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
                    {advancedTools && (
                      <FileInfoPopulateField
                        fields={[
                          'path',
                          'size',
                          'hours',
                          'minutes',
                          'seconds',
                          'width',
                          'height',
                          'codec',
                          'checksum',
                        ]}
                        setFieldValue={setFieldValue}
                        setTouched={setTouched}
                        values={values}
                      />
                    )}
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
