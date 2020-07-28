import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  makeStyles,
  TextField,
  Theme,
} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import { ApolloError } from 'apollo-client';
import {
  FieldArray,
  Formik,
  FormikErrors,
  FormikProps,
  FormikValues,
} from 'formik';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { GenericError, NetworkError } from '../Components/ErrorSnackbars';
import { FormLoading } from '../Components/Skeletons/FormLoading';
import {
  useCreateEpisodeMutation,
  useEpisodeLazyQuery,
  useUpdateEpisodeMutation,
} from '../gql/queries';
import { ActionType } from '../utils/constants';

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
  seriesId?: string;
  open: boolean;
  action: ActionType;
  onSubmit: () => void;
  onClose: () => void;
};

type AlternativeTitle = {
  id: string | undefined;
  title: string | undefined;
};

type FormValues = {
  title: string | undefined;
  episodeNumber: number | undefined;
  remarks: string | undefined;
  alternativeTitles: AlternativeTitle[];
};

function arrayOrUndefined<T>(array: T[] | null | undefined): T[] | undefined {
  if (Array.isArray(array) && array.length > 0) {
    return array;
  } else {
    return undefined;
  }
}

export const EpisodeForm = (props: Props) => {
  const { action: actionType } = props;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [
    loadEpisode,
    { data: episodeData, loading: loadingEpisode },
  ] = useEpisodeLazyQuery({
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (props.open && props.episodeId) {
      loadEpisode({
        variables: {
          where: {
            id: props.episodeId,
          },
        },
      });
    }
  }, [props.seriesId, props.open, loadEpisode]);

  const [createEpisodeMutation] = useCreateEpisodeMutation({
    onError: (error: ApolloError) => {
      if (error.networkError) {
        NetworkError();
      } else if (error.graphQLErrors) {
        enqueueSnackbar(error.message.replace(`GraphQL error: `, ''), {
          key: 'episode-form-message',
          variant: 'warning',
        });
      } else {
        GenericError();
      }
    },
    onCompleted: () => {
      enqueueSnackbar(`Successfully created episode`, {
        key: 'episode-form-message',
      });
      props.onSubmit();
      props.onClose();
    },
  });

  const [updateEpisodeMutation] = useUpdateEpisodeMutation({
    onError: (error: ApolloError) => {
      if (error.networkError) {
        NetworkError();
      } else if (error.graphQLErrors) {
        enqueueSnackbar(error.message.replace(`GraphQL error: `, ''), {
          key: 'episode-form-message',
          variant: 'warning',
        });
      } else {
        GenericError();
      }
    },
    onCompleted: () => {
      enqueueSnackbar(`Successfully updated episode`, {
        key: 'episode-form-message',
      });
      props.onSubmit();
      props.onClose();
    },
  });

  const onSubmitCreate = (values: FormikValues) => {
    if (props.seriesId) {
      let { alternativeTitles, ...rest } = values;
      alternativeTitles =
        alternativeTitles.length > 0
          ? {
              create: alternativeTitles
                .filter((altTitle: AlternativeTitle) => !altTitle.id)
                .map((altTitle: AlternativeTitle) => {
                  return { title: altTitle.title };
                }),
            }
          : undefined;
      createEpisodeMutation({
        variables: {
          data: {
            alternativeTitles,
            ...rest,
            series: {
              connect: {
                id: props.seriesId,
              },
            },
          },
        },
      });
    } else {
      enqueueSnackbar(`Something went wrong. Please reload the page.`, {
        key: 'episode-form-message',
      });
    }
  };

  const onSubmitUpdate = async (values: FormikValues) => {
    let { alternativeTitles, ...rest } = values;
    alternativeTitles = {
      create: arrayOrUndefined(
        alternativeTitles
          .filter((altTitle: AlternativeTitle) => !altTitle.id)
          .map((altTitle: AlternativeTitle) => {
            return { title: altTitle.title };
          })
      ),
      update: arrayOrUndefined(
        alternativeTitles
          .filter((altTitle: AlternativeTitle) => !!altTitle.id)
          .map((altTitle: AlternativeTitle) => {
            return {
              where: { id: altTitle.id },
              data: { title: altTitle.title },
            };
          })
      ),
      delete: episodeData?.episode?.alternativeTitles
        ? arrayOrUndefined(
            episodeData.episode.alternativeTitles
              .filter(
                (altTitle) =>
                  !alternativeTitles.find(
                    (newTitle: AlternativeTitle) =>
                      newTitle?.id === altTitle?.id
                  )
              )
              .filter(Boolean)
              //@ts-ignore
              .map((altTitle: AlternativeTitle) => {
                return {
                  id: altTitle.id,
                };
              })
          )
        : undefined,
    };
    await updateEpisodeMutation({
      variables: {
        where: { id: props.episodeId || '' },
        data: {
          alternativeTitles,
          ...rest,
        },
      },
    });
  };

  const initialFormValues: FormValues = {
    title:
      (actionType === ActionType.UPDATE && episodeData?.episode?.title) ||
      undefined,
    episodeNumber:
      (actionType === ActionType.UPDATE &&
        episodeData?.episode?.episodeNumber) ||
      undefined,
    remarks:
      (actionType === ActionType.UPDATE && episodeData?.episode?.remarks) ||
      undefined,
    alternativeTitles:
      (actionType === ActionType.UPDATE &&
        episodeData?.episode?.alternativeTitles &&
        (Array.from(
          episodeData?.episode?.alternativeTitles
        ) as AlternativeTitle[])) ||
      ([] as AlternativeTitle[]),
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
          ? `Add A New Episode`
          : `Editing ${episodeData?.episode?.title}`}
      </DialogTitle>
      <DialogContent>
        {loadingEpisode ? (
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
              title: Yup.string().required(`Please enter a title`),
              episodeNumber: Yup.number()
                .required(`Please input the episode number`)
                .min(0, `Invalid episode number`),
              alternativeTitles: Yup.array().of(
                Yup.object().shape({
                  title: Yup.string().required(`Please enter a title`),
                })
              ),
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
                    <Grid item xs={9}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="title"
                        label="Title"
                        name="title"
                        value={values.title || ''}
                        error={touched.title && !!errors.title}
                        helperText={touched.title && errors.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={classes.formItem}
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="episodeNumber"
                        label="Episode Number"
                        id="episodeNumber"
                        type="number"
                        value={
                          values.episodeNumber ||
                          (values.episodeNumber === 0 ? 0 : null)
                        }
                        error={touched.episodeNumber && !!errors.episodeNumber}
                        helperText={
                          touched.episodeNumber && errors.episodeNumber
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={classes.formItem}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FieldArray
                        name="alternativeTitles"
                        render={(arrayHelpers) => (
                          <Grid container spacing={3}>
                            {values.alternativeTitles &&
                              values.alternativeTitles.length > 0 && (
                                <Grid item xs={12}>
                                  {values.alternativeTitles.map(
                                    (
                                      altTitle: {
                                        id: string | undefined;
                                        title: string | undefined;
                                      },
                                      index: number
                                    ) => {
                                      return (
                                        <Grid container spacing={3}>
                                          <Grid
                                            item
                                            xs={11}
                                            key={`${index}-title`}
                                          >
                                            <TextField
                                              variant="outlined"
                                              margin="normal"
                                              fullWidth
                                              key={`alternativeTitles.${index}.title`}
                                              name={`alternativeTitles.${index}.title`}
                                              label="Alternative Title"
                                              error={
                                                !!touched?.alternativeTitles &&
                                                touched?.alternativeTitles[
                                                  index
                                                ]?.title &&
                                                !!Array.isArray(
                                                  errors?.alternativeTitles
                                                ) &&
                                                !!(errors.alternativeTitles[
                                                  index
                                                ] as FormikErrors<
                                                  AlternativeTitle
                                                >)?.title
                                              }
                                              helperText={
                                                !!touched?.alternativeTitles &&
                                                touched?.alternativeTitles[
                                                  index
                                                ]?.title &&
                                                !!Array.isArray(
                                                  errors?.alternativeTitles
                                                ) &&
                                                (errors.alternativeTitles[
                                                  index
                                                ] as FormikErrors<
                                                  AlternativeTitle
                                                >)?.title
                                              }
                                              id={`alternativeTitles.${index}.title`}
                                              value={altTitle.title || ''}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              className={classes.formItem}
                                            />
                                          </Grid>
                                          <Grid
                                            item
                                            xs={1}
                                            className={classes.formArrayGrid}
                                            alignContent="space-around"
                                            alignItems="center"
                                          >
                                            <IconButton
                                              size="small"
                                              onClick={() =>
                                                arrayHelpers.remove(index)
                                              }
                                            >
                                              <RemoveIcon />
                                            </IconButton>
                                          </Grid>
                                        </Grid>
                                      );
                                    }
                                  )}
                                </Grid>
                              )}
                            <Grid item xs={12}>
                              <Button
                                fullWidth
                                variant="outlined"
                                color="primary"
                                onClick={() =>
                                  arrayHelpers.push({
                                    id: undefined,
                                    title: undefined,
                                  })
                                }
                              >
                                Add an alternative title
                              </Button>
                            </Grid>
                          </Grid>
                        )}
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
