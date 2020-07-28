import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Input,
  makeStyles,
  MenuItem,
  Slider,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { ApolloError } from 'apollo-client';
import { Formik, FormikProps, FormikValues } from 'formik';
import { useSnackbar } from 'notistack';
import React, { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';
import { DeleteConfirmDialog } from '../Components/DeleteConfirmDialog';
import { GenericError, NetworkError } from '../Components/ErrorSnackbars';
import { FormLoading } from '../Components/Skeletons/FormLoading';
import { WatchStatus } from '../gql/documents';
import {
  useCreateUserProgressMutation,
  useDeleteUserProgressMutation,
  useMySeriesProgressLazyQuery,
  useSeriesLazyQuery,
  useUpdateUserProgressMutation,
} from '../gql/queries';
import { ActionType } from '../utils/constants';
import { renderWatchStatus } from '../utils/enumRender';

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
  sliderBox: {
    width: 42,
  },
}));

type Props = {
  progressId?: string;
  seriesId: string;
  open: boolean;
  action: ActionType;
  onSubmit: () => void;
  onClose: () => void;
};

type FormValues = {
  status: WatchStatus | undefined;
  completed: number | undefined | null;
  overall: number | undefined | null;
  execution: number | undefined | null;
  story: number | undefined | null;
  sound: number | undefined | null;
  art: number | undefined | null;
  character: number | undefined | null;
  appeal: number | undefined | null;
  remarks: string | undefined | null;
};

function calculateOverall(
  execution: number[] | number | undefined | null,
  story: number[] | number | undefined | null,
  sound: number[] | number | undefined | null,
  art: number[] | number | undefined | null,
  character: number[] | number | undefined | null,
  appeal: number[] | number | undefined | null
): number | undefined | null {
  if (
    (execution === undefined || execution === null) &&
    (story === undefined || story === null) &&
    (sound === undefined || sound === null) &&
    (art === undefined || art === null) &&
    (character === undefined || character === null) &&
    (appeal === undefined || appeal === null)
  ) {
    return null;
  } else {
    return Math.round(
      (((execution as number) || 0) +
        ((story as number) || 0) +
        ((sound as number) || 0) +
        ((art as number) || 0) +
        ((character as number) || 0) +
        ((appeal as number) || 0)) /
        6
    );
  }
}

export const UserProgressForm = (props: Props) => {
  const { action: actionType } = props;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  const [
    loadSeries,
    { data: seriesData, loading: loadingSeries },
  ] = useSeriesLazyQuery();

  const [
    loadProgress,
    { data: progressData, loading: loadingProgress },
  ] = useMySeriesProgressLazyQuery();

  useEffect(() => {
    if (props.open && props.progressId) {
      loadProgress({
        variables: {
          where: {
            id: props.seriesId,
          },
        },
      });
    }
    if (props.open) {
      loadSeries({
        variables: {
          where: {
            id: props.seriesId,
          },
        },
      });
    }
  }, [props.seriesId, props.open, loadProgress, loadSeries, props.progressId]);

  const [createUserProgressMutation] = useCreateUserProgressMutation({
    onError: (error: ApolloError) => {
      if (error.networkError) {
        NetworkError();
      } else if (error.graphQLErrors) {
        enqueueSnackbar(error.message.replace(`GraphQL error: `, ''), {
          key: 'progress-form-message',
          variant: 'warning',
        });
      } else {
        GenericError();
      }
    },
    onCompleted: () => {
      enqueueSnackbar(`Successfully created watch progress record`, {
        key: 'progress-form-message',
      });
      props.onSubmit();
      props.onClose();
    },
  });

  const [updateUserProgressMutation] = useUpdateUserProgressMutation({
    onError: (error: ApolloError) => {
      if (error.networkError) {
        NetworkError();
      } else if (error.graphQLErrors) {
        enqueueSnackbar(error.message.replace(`GraphQL error: `, ''), {
          key: 'progress-form-message',
          variant: 'warning',
        });
      } else {
        GenericError();
      }
    },
    onCompleted: () => {
      enqueueSnackbar(`Successfully updated watch progress record`, {
        key: 'progress-form-message',
      });
      props.onSubmit();
      props.onClose();
    },
  });

  const [deleteUserProgressMutation] = useDeleteUserProgressMutation({
    onError: (error: ApolloError) => {
      if (error.networkError) {
        NetworkError();
      } else if (error.graphQLErrors) {
        enqueueSnackbar(error.message.replace(`GraphQL error: `, ''), {
          key: 'progress-form-message',
          variant: 'warning',
        });
      } else {
        GenericError();
      }
    },
    onCompleted: () => {
      enqueueSnackbar(`Successfully removed watch progress record`, {
        key: 'progress-form-message',
      });
      props.onSubmit();
      props.onClose();
    },
  });

  const onSubmitCreate = (values: FormikValues) => {
    const { ...data } = values;
    createUserProgressMutation({
      variables: {
        data: {
          ...data,
          series: {
            connect: {
              id: props.seriesId,
            },
          },
        },
      },
    });
  };

  const onSubmitUpdate = async (values: FormikValues) => {
    let { ...data } = values;
    if (props.progressId) {
      await updateUserProgressMutation({
        variables: {
          where: { id: props.progressId },
          data: {
            ...data,
          },
        },
      });
    } else {
      enqueueSnackbar(`Something went wrong. Please reload the page.`, {
        key: 'progress-form-message',
      });
    }
  };

  const onDelete = async () => {
    if (props.progressId) {
      await deleteUserProgressMutation({
        variables: {
          where: { id: props.progressId },
        },
      });
    } else {
      enqueueSnackbar(`Something went wrong. Please reload the page.`, {
        key: 'progress-form-message',
      });
    }
  };

  const initialFormValues: FormValues = useMemo(() => {
    return {
      status:
        (actionType === ActionType.UPDATE &&
          progressData?.mySeriesProgress?.status) ||
        undefined,
      completed:
        actionType === ActionType.UPDATE
          ? progressData?.mySeriesProgress?.completed ?? undefined
          : undefined,
      overall:
        actionType === ActionType.UPDATE
          ? progressData?.mySeriesProgress?.overall ?? undefined
          : undefined,
      execution:
        actionType === ActionType.UPDATE
          ? progressData?.mySeriesProgress?.execution ?? undefined
          : undefined,
      story:
        actionType === ActionType.UPDATE
          ? progressData?.mySeriesProgress?.story ?? undefined
          : undefined,
      sound:
        actionType === ActionType.UPDATE
          ? progressData?.mySeriesProgress?.sound ?? undefined
          : undefined,
      art:
        actionType === ActionType.UPDATE
          ? progressData?.mySeriesProgress?.art ?? undefined
          : undefined,
      character:
        actionType === ActionType.UPDATE
          ? progressData?.mySeriesProgress?.character ?? undefined
          : undefined,
      appeal:
        actionType === ActionType.UPDATE
          ? progressData?.mySeriesProgress?.appeal ?? undefined
          : undefined,
      remarks:
        (actionType === ActionType.UPDATE &&
          progressData?.mySeriesProgress?.remarks) ||
        undefined,
    };
  }, [actionType, progressData]);

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      fullWidth={true}
      maxWidth={'lg'}
    >
      <DialogTitle key="DialogTitle">Update Your Watch Progress</DialogTitle>
      <DialogContent>
        {loadingProgress || loadingSeries ? (
          <FormLoading />
        ) : (
          <Formik
            enableReinitialize={true}
            validateOnChange={false}
            initialValues={initialFormValues}
            onSubmit={
              props.action === ActionType.CREATE
                ? onSubmitCreate
                : onSubmitUpdate
            }
            validationSchema={Yup.object({
              status: Yup.string().required(`Please select a watch status`),
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
                setValues,
              } = props;
              return (
                <form className={classes.form} onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <TextField
                        select
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        name="status"
                        label="Watch Status"
                        id="status"
                        value={values.status || null}
                        InputLabelProps={{ shrink: !!values.status }}
                        error={touched.status && !!errors.status}
                        helperText={touched.status && errors.status}
                        onChange={(event) => {
                          if (event.target.value === WatchStatus.Pending) {
                            setValues(
                              {
                                appeal: null,
                                art: null,
                                character: null,
                                completed: null,
                                execution: null,
                                overall: null,
                                sound: null,
                                story: null,
                                remarks: values.remarks,
                                status: WatchStatus.Pending,
                              },
                              false
                            );
                          } else if (
                            event.target.value === WatchStatus.Completed
                          ) {
                            setFieldValue(
                              'completed',
                              seriesData?.series?.episodeCount || 0,
                              false
                            );
                            handleChange(event);
                          } else {
                            handleChange(event);
                          }
                        }}
                        onBlur={handleBlur}
                        className={classes.formItem}
                      >
                        {Object.values(WatchStatus).map(
                          (value: WatchStatus) => {
                            return (
                              <MenuItem key={value} value={value}>
                                {renderWatchStatus(value)}
                              </MenuItem>
                            );
                          }
                        )}
                      </TextField>
                    </Grid>
                    <Grid item xs={6} className={classes.formArrayGrid}>
                      <Grid container spacing={3} alignItems="center">
                        <Grid item xs={2}>
                          <Typography gutterBottom>Episodes: </Typography>
                        </Grid>
                        <Grid item xs>
                          <Slider
                            disabled={
                              !values.status ||
                              values.status === WatchStatus.Pending
                            }
                            value={values.completed || 0}
                            onChange={(_event, newValue) => {
                              setFieldValue('completed', newValue);
                            }}
                            min={0}
                            max={seriesData?.series?.episodeCount || 0}
                          />
                        </Grid>
                        <Grid item>
                          <Input
                            name="completed"
                            id="completed"
                            className={classes.sliderBox}
                            value={values.completed || 0}
                            margin="dense"
                            disabled={
                              !values.status ||
                              values.status === WatchStatus.Pending
                            }
                            onChange={handleChange}
                            onBlur={handleBlur}
                            inputProps={{
                              step: 1,
                              min: 0,
                              max: seriesData?.series?.episodeCount,
                              type: 'number',
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={3} alignItems="center">
                        <Grid item xs={2}>
                          <Typography gutterBottom>Story: </Typography>
                        </Grid>
                        <Grid item xs>
                          <Slider
                            disabled={
                              !values.status ||
                              values.status === WatchStatus.Pending
                            }
                            value={values.story || 0}
                            onChange={(_event, newValue) => {
                              setFieldValue(
                                'overall',
                                calculateOverall(
                                  values.execution,
                                  newValue,
                                  values.sound,
                                  values.art,
                                  values.character,
                                  values.appeal
                                )
                              );
                              setFieldValue('story', newValue);
                            }}
                            min={0}
                            max={100}
                          />
                        </Grid>
                        <Grid item>
                          <Input
                            name="story"
                            id="story"
                            className={classes.sliderBox}
                            value={values.story || 0}
                            margin="dense"
                            disabled={
                              !values.status ||
                              values.status === WatchStatus.Pending
                            }
                            onChange={(event) => {
                              setFieldValue(
                                'overall',
                                calculateOverall(
                                  values.execution,
                                  Number.parseInt(event.target.value),
                                  values.sound,
                                  values.art,
                                  values.character,
                                  values.appeal
                                )
                              );
                              handleChange(event);
                            }}
                            onBlur={handleBlur}
                            inputProps={{
                              step: 1,
                              min: 0,
                              max: 100,
                              type: 'number',
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={3} alignItems="center">
                        <Grid item xs={2}>
                          <Typography gutterBottom>Execution: </Typography>
                        </Grid>
                        <Grid item xs>
                          <Slider
                            disabled={
                              !values.status ||
                              values.status === WatchStatus.Pending
                            }
                            value={values.execution || 0}
                            onChange={(_event, newValue) => {
                              setFieldValue(
                                'overall',
                                calculateOverall(
                                  newValue,
                                  values.story,
                                  values.sound,
                                  values.art,
                                  values.character,
                                  values.appeal
                                )
                              );
                              setFieldValue('execution', newValue);
                            }}
                            min={0}
                            max={100}
                          />
                        </Grid>
                        <Grid item>
                          <Input
                            name="execution"
                            id="execution"
                            className={classes.sliderBox}
                            value={values.execution || 0}
                            margin="dense"
                            disabled={
                              !values.status ||
                              values.status === WatchStatus.Pending
                            }
                            onChange={(event) => {
                              setFieldValue(
                                'overall',
                                calculateOverall(
                                  Number.parseInt(event.target.value),
                                  values.story,
                                  values.sound,
                                  values.art,
                                  values.character,
                                  values.appeal
                                )
                              );
                              handleChange(event);
                            }}
                            onBlur={handleBlur}
                            inputProps={{
                              step: 1,
                              min: 0,
                              max: 100,
                              type: 'number',
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={3} alignItems="center">
                        <Grid item xs={2}>
                          <Typography gutterBottom>Appeal: </Typography>
                        </Grid>
                        <Grid item xs>
                          <Slider
                            disabled={
                              !values.status ||
                              values.status === WatchStatus.Pending
                            }
                            value={values.appeal || 0}
                            onChange={(_event, newValue) => {
                              setFieldValue(
                                'overall',
                                calculateOverall(
                                  values.execution,
                                  values.story,
                                  values.sound,
                                  values.art,
                                  values.character,
                                  newValue
                                )
                              );
                              setFieldValue('appeal', newValue);
                            }}
                            min={0}
                            max={100}
                          />
                        </Grid>
                        <Grid item>
                          <Input
                            name="appeal"
                            id="appeal"
                            className={classes.sliderBox}
                            value={values.appeal || 0}
                            margin="dense"
                            onChange={(event) => {
                              setFieldValue(
                                'overall',
                                calculateOverall(
                                  values.execution,
                                  values.story,
                                  values.sound,
                                  values.art,
                                  values.character,
                                  Number.parseInt(event.target.value)
                                )
                              );
                              handleChange(event);
                            }}
                            onBlur={handleBlur}
                            disabled={
                              !values.status ||
                              values.status === WatchStatus.Pending
                            }
                            inputProps={{
                              step: 1,
                              min: 0,
                              max: 100,
                              type: 'number',
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={3} alignItems="center">
                        <Grid item xs={2}>
                          <Typography gutterBottom>Character: </Typography>
                        </Grid>
                        <Grid item xs>
                          <Slider
                            disabled={
                              !values.status ||
                              values.status === WatchStatus.Pending
                            }
                            value={values.character || 0}
                            onChange={(_event, newValue) => {
                              setFieldValue(
                                'overall',
                                calculateOverall(
                                  values.execution,
                                  values.story,
                                  values.sound,
                                  values.art,
                                  newValue,
                                  values.appeal
                                )
                              );
                              setFieldValue('character', newValue);
                            }}
                            min={0}
                            max={100}
                          />
                        </Grid>
                        <Grid item>
                          <Input
                            name="character"
                            id="character"
                            className={classes.sliderBox}
                            value={values.character || 0}
                            margin="dense"
                            disabled={
                              !values.status ||
                              values.status === WatchStatus.Pending
                            }
                            onChange={(event) => {
                              setFieldValue(
                                'overall',
                                calculateOverall(
                                  values.execution,
                                  values.story,
                                  values.sound,
                                  values.art,
                                  Number.parseInt(event.target.value),
                                  values.appeal
                                )
                              );
                              handleChange(event);
                            }}
                            onBlur={handleBlur}
                            inputProps={{
                              step: 1,
                              min: 0,
                              max: 100,
                              type: 'number',
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={3} alignItems="center">
                        <Grid item xs={2}>
                          <Typography gutterBottom>Art: </Typography>
                        </Grid>
                        <Grid item xs>
                          <Slider
                            disabled={
                              !values.status ||
                              values.status === WatchStatus.Pending
                            }
                            value={values.art || 0}
                            onChange={(_event, newValue) => {
                              setFieldValue(
                                'overall',
                                calculateOverall(
                                  values.execution,
                                  values.story,
                                  values.sound,
                                  newValue,
                                  values.character,
                                  values.appeal
                                )
                              );
                              setFieldValue('art', newValue);
                            }}
                            min={0}
                            max={100}
                          />
                        </Grid>
                        <Grid item>
                          <Input
                            name="art"
                            id="art"
                            className={classes.sliderBox}
                            value={values.art || 0}
                            margin="dense"
                            disabled={
                              !values.status ||
                              values.status === WatchStatus.Pending
                            }
                            onChange={(event) => {
                              setFieldValue(
                                'overall',
                                calculateOverall(
                                  values.execution,
                                  values.story,
                                  values.sound,
                                  Number.parseInt(event.target.value),
                                  values.character,
                                  values.appeal
                                )
                              );
                              handleChange(event);
                            }}
                            onBlur={handleBlur}
                            inputProps={{
                              step: 1,
                              min: 0,
                              max: 100,
                              type: 'number',
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid container spacing={3} alignItems="center">
                        <Grid item xs={2}>
                          <Typography gutterBottom>Music: </Typography>
                        </Grid>
                        <Grid item xs>
                          <Slider
                            disabled={
                              !values.status ||
                              values.status === WatchStatus.Pending
                            }
                            value={values.sound || 0}
                            onChange={(_event, newValue) => {
                              setFieldValue(
                                'overall',
                                calculateOverall(
                                  values.execution,
                                  values.story,
                                  newValue,
                                  values.art,
                                  values.character,
                                  values.appeal
                                )
                              );
                              setFieldValue('sound', newValue);
                            }}
                            min={0}
                            max={100}
                          />
                        </Grid>
                        <Grid item>
                          <Input
                            name="sound"
                            id="sound"
                            className={classes.sliderBox}
                            value={values.sound || 0}
                            margin="dense"
                            disabled={
                              !values.status ||
                              values.status === WatchStatus.Pending
                            }
                            onChange={(event) => {
                              setFieldValue(
                                'overall',
                                calculateOverall(
                                  values.execution,
                                  values.story,
                                  Number.parseInt(event.target.value),
                                  values.art,
                                  values.character,
                                  values.appeal
                                )
                              );
                              handleChange(event);
                            }}
                            onBlur={handleBlur}
                            inputProps={{
                              step: 1,
                              min: 0,
                              max: 100,
                              type: 'number',
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={3} alignItems="center">
                        <Grid item xs={1}>
                          <Typography gutterBottom>Overall: </Typography>
                        </Grid>
                        <Grid item xs>
                          <Slider
                            disabled
                            value={values.overall || 0}
                            min={0}
                            max={100}
                          />
                        </Grid>
                        <Grid item>
                          <Input
                            name="overall"
                            id="overall"
                            disabled
                            className={classes.sliderBox}
                            value={values.overall || 0}
                            margin="dense"
                            inputProps={{
                              step: 1,
                              min: 0,
                              max: 100,
                              type: 'number',
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        multiline
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="remarks"
                        label="Comments"
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
                    {actionType === ActionType.UPDATE && (
                      <Button
                        onClick={() => setShowDeleteDialog(true)}
                        color="secondary"
                      >
                        Delete
                      </Button>
                    )}
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
      <DeleteConfirmDialog
        open={showDeleteDialog}
        title={`Delete Watch Progress Record?`}
        onClose={() => setShowDeleteDialog(false)}
        onSubmit={() => onDelete()}
      />
    </Dialog>
  );
};
