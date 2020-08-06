import { ApolloError } from '@apollo/client';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  makeStyles,
  MenuItem,
  TextField,
  Theme,
} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import {
  FieldArray,
  Formik,
  FormikErrors,
  FormikProps,
  FormikValues,
} from 'formik';
import moment, { Moment } from 'moment';
import { useSnackbar } from 'notistack';
import React, { ReactElement, useEffect, useState } from 'react';
import * as Yup from 'yup';
import { GenericError, NetworkError } from '../Components/ErrorSnackbars';
import { SourceAutoComplete } from '../Components/Inputs/SourceAutoComplete';
import { SeriesAutocomplete } from '../Components/SeriesAutocomplete';
import { FormLoading } from '../Components/Skeletons/FormLoading';
import { Series, Type } from '../gql/documents';
import {
  Season,
  Status,
  useAllSeriesQuery,
  useCreateSeriesMutation,
  useSeriesLazyQuery,
  useUpdateSeriesMutation,
} from '../gql/queries';
import { ActionType } from '../utils/constants';
import {
  renderSeasonInfo,
  renderStatus,
  renderType,
} from '../utils/enumRender';
import { arrayOrUndefined, seasonComparator } from '../utils/form';

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
  formArrayRemoveButtonContainer: {
    textAlign: 'center',
  },
  formArrayRemoveButton: {
    paddingTop: '16px',
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
  seriesId?: string;
  open: boolean;
  action: ActionType;
  onSubmit: () => void;
  onClose: () => void;
};

type Reference = {
  id: string | undefined;
  link: string | undefined;
  source: string | undefined;
};

type AlternativeTitle = {
  id: string | undefined;
  title: string | undefined;
};

type SeriesRelation = {
  id: string;
  title: string;
};

type FormValues = {
  title: string | undefined;
  seasonNumber: number | undefined;
  episodeCount: number | undefined;
  status: Status | undefined;
  type: Type | undefined;
  releaseSeason: string | undefined;
  releaseYear: Moment | undefined;
  remarks: string | undefined;
  alternativeTitles: AlternativeTitle[];
  references: Reference[];
  prequels: SeriesRelation[];
  sequels: SeriesRelation[];
  sideStories: SeriesRelation[];
  mainStories: SeriesRelation[];
  related: SeriesRelation[];
};

function updateSeriesRelations(
  originalArray: SeriesRelation[] | undefined | null,
  newArray: SeriesRelation[]
): {
  connect: { id: string }[] | undefined;
  disconnect: { id: string }[] | undefined;
} {
  if (newArray.length === 0) {
    return {
      connect: undefined,
      disconnect: arrayOrUndefined(
        originalArray?.map((series) => {
          return { id: series.id };
        })
      ),
    };
  } else if (!originalArray || originalArray.length === 0) {
    return {
      connect: arrayOrUndefined(
        newArray?.map((series) => {
          return { id: series.id };
        })
      ),
      disconnect: undefined,
    };
  } else {
    const connect = newArray
      .filter(
        (newSeries) =>
          !originalArray.find((series) => newSeries.id === series.id)
      )
      .map((series) => {
        return { id: series.id };
      });
    const disconnect = originalArray
      .filter(
        (series) => !newArray.find((newSeries) => newSeries.id === series.id)
      )
      .map((series) => {
        return { id: series.id };
      });
    return {
      connect: arrayOrUndefined(connect),
      disconnect: arrayOrUndefined(disconnect),
    };
  }
}

function updateRelatedSeries(
  originalRelated: SeriesRelation[],
  originalAlternatives: SeriesRelation[],
  newRelated: SeriesRelation[]
): {
  relatedSeries: {
    connect: { id: string }[] | undefined;
    disconnect: { id: string }[] | undefined;
  };
  relatedAlternatives: {
    connect: { id: string }[] | undefined;
    disconnect: { id: string }[] | undefined;
  };
} {
  if (newRelated.length === 0) {
    return {
      relatedAlternatives: {
        connect: undefined,
        disconnect: arrayOrUndefined(
          originalAlternatives.map((series) => {
            return { id: series.id };
          })
        ),
      },
      relatedSeries: {
        connect: undefined,
        disconnect: arrayOrUndefined(
          originalRelated.map((series) => {
            return { id: series.id };
          })
        ),
      },
    };
  } else {
    const connect = newRelated
      .filter(
        (series) =>
          !originalRelated.find((original) => original.id === series.id) &&
          !originalAlternatives.find((original) => original.id === series.id)
      )
      .map((series) => {
        return { id: series.id };
      });
    const disconnectSeries = originalRelated
      .filter((series) => !newRelated.find((value) => value.id === series.id))
      .map((series) => {
        return { id: series.id };
      });
    const disconnectAlternatives = originalAlternatives
      .filter((series) => !newRelated.find((value) => value.id === series.id))
      .map((series) => {
        return { id: series.id };
      });
    return {
      relatedAlternatives: {
        connect: undefined,
        disconnect: arrayOrUndefined(disconnectAlternatives),
      },
      relatedSeries: {
        connect: arrayOrUndefined(connect),
        disconnect: arrayOrUndefined(disconnectSeries),
      },
    };
  }
}

export const SeriesForm = (props: Props): ReactElement => {
  const { action: actionType } = props;
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const { data: seriesList, loading: loadingOptions } = useAllSeriesQuery({
    fetchPolicy: 'cache-and-network',
  });
  const [autoCompleteOptions, setAutoCompleteOptions] = useState<Series[]>([]);

  const [
    loadSeries,
    { data: seriesData, loading: loadingSeries },
  ] = useSeriesLazyQuery({
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (!!seriesList?.allSeries) {
      if (props.seriesId) {
        setAutoCompleteOptions(
          (seriesList.allSeries.filter(
            (series) => series?.id !== props.seriesId
          ) as Series[]) || []
        );
      } else {
        setAutoCompleteOptions(seriesList.allSeries as Series[]);
      }
    }
  }, [seriesList, props.seriesId]);

  useEffect(() => {
    if (props.open && props.seriesId) {
      loadSeries({
        variables: {
          where: {
            id: props.seriesId,
          },
        },
      });
    }
  }, [props.seriesId, props.open, loadSeries]);

  const [createSeriesMutation] = useCreateSeriesMutation({
    onError: (error: ApolloError) => {
      if (error.networkError) {
        NetworkError();
      } else if (error.graphQLErrors) {
        enqueueSnackbar(error.message.replace(`GraphQL error: `, ''), {
          key: 'series-form-message',
          variant: 'warning',
        });
      } else {
        GenericError();
      }
    },
    onCompleted: () => {
      enqueueSnackbar(`Successfully created series`, {
        key: 'series-form-message',
      });
      props.onSubmit();
      props.onClose();
    },
  });

  const [updateSeriesMutation] = useUpdateSeriesMutation({
    onError: (error: ApolloError) => {
      if (error.networkError) {
        NetworkError();
      } else if (error.graphQLErrors) {
        enqueueSnackbar(error.message.replace(`GraphQL error: `, ''), {
          key: 'series-form-message',
          variant: 'warning',
        });
      } else {
        GenericError();
      }
    },
    onCompleted: () => {
      enqueueSnackbar(`Successfully updated series`, {
        key: 'series-form-message',
      });
      props.onSubmit();
      props.onClose();
    },
  });

  const onSubmitCreate = (values: FormikValues) => {
    let {
      alternativeTitles,
      references,
      seasonNumber,
      episodeCount,
      prequels,
      sequels,
      mainStories,
      sideStories,
      related,
      ...rest
    } = values;
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
    references =
      references.length > 0
        ? {
            create: references
              .filter((reference: Reference) => !reference.id)
              .map((reference: Reference) => {
                return { link: reference.link, source: reference.source };
              }),
          }
        : undefined;
    prequels =
      prequels.length > 0
        ? {
            connect: prequels.map((series: Partial<Series>) => {
              return { id: series.id };
            }),
          }
        : undefined;
    sequels =
      sequels.length > 0
        ? {
            connect: sequels.map((series: Partial<Series>) => {
              return { id: series.id };
            }),
          }
        : undefined;
    mainStories =
      mainStories.length > 0
        ? {
            connect: mainStories.map((series: Partial<Series>) => {
              return { id: series.id };
            }),
          }
        : undefined;
    sideStories =
      sideStories.length > 0
        ? {
            connect: sideStories.map((series: Partial<Series>) => {
              return { id: series.id };
            }),
          }
        : undefined;
    related =
      related.length > 0
        ? {
            connect: related.map((series: Partial<Series>) => {
              return { id: series.id };
            }),
          }
        : undefined;

    createSeriesMutation({
      variables: {
        data: {
          alternativeTitles,
          references,
          prequels,
          sequels,
          mainStories,
          sideStories,
          relatedSeries: related,
          episodeCount: episodeCount === '' ? undefined : episodeCount,
          seasonNumber: seasonNumber === '' ? undefined : seasonNumber,
          ...rest,
        },
      },
    });
  };

  const onSubmitUpdate = (values: FormikValues) => {
    let {
      alternativeTitles,
      references,
      seasonNumber,
      episodeCount,
      prequels,
      sequels,
      mainStories,
      sideStories,
      related,
      ...rest
    } = values;
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
      delete: seriesData?.series?.alternativeTitles
        ? arrayOrUndefined(
            seriesData.series.alternativeTitles
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
    references = {
      create: arrayOrUndefined(
        references
          .filter((reference: Reference) => !reference.id)
          .map((reference: Reference) => {
            return { link: reference.link, source: reference.source };
          })
      ),
      update: arrayOrUndefined(
        references
          .filter((reference: Reference) => !!reference.id)
          .map((reference: Reference) => {
            return {
              where: { id: reference.id },
              data: { link: reference.link, source: reference.source },
            };
          })
      ),
      delete: seriesData?.series?.references
        ? arrayOrUndefined(
            seriesData.series.references
              .filter(
                (reference) =>
                  !references.find(
                    (newReference: Reference) =>
                      newReference?.id === reference?.id
                  )
              )
              .filter(Boolean)
              //@ts-ignore
              .map((reference: Reference) => {
                return {
                  id: reference.id,
                };
              })
          )
        : undefined,
    };
    prequels = updateSeriesRelations(
      seriesData?.series?.prequels as SeriesRelation[],
      prequels
    );
    sequels = updateSeriesRelations(
      seriesData?.series?.sequels as SeriesRelation[],
      sequels
    );
    mainStories = updateSeriesRelations(
      seriesData?.series?.mainStories as SeriesRelation[],
      mainStories
    );
    sideStories = updateSeriesRelations(
      seriesData?.series?.sideStories as SeriesRelation[],
      sideStories
    );
    const { relatedSeries, relatedAlternatives } = updateRelatedSeries(
      (seriesData?.series?.relatedSeries as SeriesRelation[]) || [],
      (seriesData?.series?.relatedAlternatives as SeriesRelation[]) || [],
      related
    );
    updateSeriesMutation({
      variables: {
        where: { id: props.seriesId || '' },
        data: {
          alternativeTitles,
          references,
          prequels,
          sequels,
          mainStories,
          sideStories,
          relatedSeries,
          relatedAlternatives,
          episodeCount: episodeCount === '' ? undefined : episodeCount,
          seasonNumber: seasonNumber === '' ? undefined : seasonNumber,
          ...rest,
        },
      },
    });
  };

  const initialFormValues: FormValues = {
    title:
      (actionType === ActionType.UPDATE && seriesData?.series?.title) ||
      undefined,
    seasonNumber:
      (actionType === ActionType.UPDATE && seriesData?.series?.seasonNumber) ||
      undefined,
    episodeCount:
      (actionType === ActionType.UPDATE && seriesData?.series?.episodeCount) ||
      undefined,
    status:
      (actionType === ActionType.UPDATE && seriesData?.series?.status) ||
      undefined,
    type:
      (actionType === ActionType.UPDATE && seriesData?.series?.type) ||
      undefined,
    releaseSeason:
      (actionType === ActionType.UPDATE && seriesData?.series?.releaseSeason) ||
      undefined,
    releaseYear:
      (actionType === ActionType.UPDATE &&
        moment(seriesData?.series?.releaseYear)) ||
      undefined,
    remarks:
      (actionType === ActionType.UPDATE && seriesData?.series?.remarks) ||
      undefined,
    alternativeTitles:
      (actionType === ActionType.UPDATE &&
        seriesData?.series?.alternativeTitles &&
        (Array.from(
          seriesData?.series?.alternativeTitles
        ) as AlternativeTitle[])) ||
      ([] as AlternativeTitle[]),
    references:
      (actionType === ActionType.UPDATE &&
        seriesData?.series?.references &&
        (Array.from(seriesData?.series?.references) as Reference[])) ||
      ([] as Reference[]),
    prequels:
      (actionType === ActionType.UPDATE &&
        seriesData?.series?.prequels &&
        (Array.from(seriesData?.series?.prequels) as SeriesRelation[])) ||
      [],
    sequels:
      (actionType === ActionType.UPDATE &&
        seriesData?.series?.sequels &&
        (Array.from(seriesData?.series?.sequels) as SeriesRelation[])) ||
      [],
    mainStories:
      (actionType === ActionType.UPDATE &&
        seriesData?.series?.mainStories &&
        (Array.from(seriesData?.series?.mainStories) as SeriesRelation[])) ||
      [],
    sideStories:
      (actionType === ActionType.UPDATE &&
        seriesData?.series?.sideStories &&
        (Array.from(seriesData?.series?.sideStories) as SeriesRelation[])) ||
      [],
    related:
      (actionType === ActionType.UPDATE &&
        ([
          ...(seriesData?.series?.relatedSeries || []),
          ...(seriesData?.series?.relatedAlternatives || []),
        ] as SeriesRelation[])) ||
      [],
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
          ? `Add A New Series`
          : `Editing ${seriesData?.series?.title}`}
      </DialogTitle>
      <DialogContent>
        {loadingSeries ? (
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
              releaseSeason: Yup.string().required(
                `Please select the release season`
              ),
              releaseYear: Yup.date().required(
                `Please select the release year`
              ),
              seasonNumber: Yup.number().min(
                0,
                `Season number should be positive`
              ),
              episodeCount: Yup.number()
                .required(`Please input the number of episodes`)
                .min(0, `Number of episodes should be positive`),
              status: Yup.string().required(`Please select a status`),
              type: Yup.string().required(`Please select a type`),
              alternativeTitles: Yup.array().of(
                Yup.object().shape({
                  title: Yup.string().required(`Please enter a title`),
                })
              ),
              references: Yup.array().of(
                Yup.object().shape({
                  link: Yup.string()
                    .required(`Please enter a link`)
                    .url(`Please enter a valid link`),
                  source: Yup.string().required(`Please enter the source name`),
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
                setFieldValue,
                setTouched,
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
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="seasonNumber"
                        label="Season Number"
                        id="seasonNumber"
                        type="number"
                        value={
                          values.seasonNumber ||
                          (values.seasonNumber === 0 ? 0 : '')
                        }
                        error={touched.seasonNumber && !!errors.seasonNumber}
                        helperText={touched.seasonNumber && errors.seasonNumber}
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
                        name="episodeCount"
                        label="Number of Episodes"
                        id="episodeCount"
                        type="number"
                        value={values.episodeCount || ''}
                        error={touched.episodeCount && !!errors.episodeCount}
                        helperText={touched.episodeCount && errors.episodeCount}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={classes.formItem}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <TextField
                        select
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        name="releaseSeason"
                        label="Release Season"
                        id="releaseSeason"
                        value={values.releaseSeason || ''}
                        InputLabelProps={{ shrink: !!values.releaseSeason }}
                        error={touched.releaseSeason && !!errors.releaseSeason}
                        helperText={
                          touched.releaseSeason && errors.releaseSeason
                        }
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={classes.formItem}
                      >
                        {Object.values(Season)
                          .sort(seasonComparator)
                          .map((value: Season) => {
                            return (
                              <MenuItem key={value} value={value}>
                                {renderSeasonInfo(value)}
                              </MenuItem>
                            );
                          })}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                      <KeyboardDatePicker
                        fullWidth
                        inputVariant="outlined"
                        clearable
                        views={['year']}
                        label="Release Year"
                        value={values?.releaseYear || null}
                        error={touched.releaseYear && !!errors.releaseYear}
                        helperText={touched.releaseYear && errors.releaseYear}
                        onChange={(date: MaterialUiPickersDate) =>
                          setFieldValue(
                            'releaseYear',
                            date?.startOf('year') as Moment
                          )
                        }
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        name="type"
                        label="Type"
                        id="type"
                        value={values.type || ''}
                        InputLabelProps={{ shrink: !!values.type }}
                        error={touched.type && !!errors.type}
                        helperText={touched.type && errors.type}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={classes.formItem}
                      >
                        {Object.values(Type).map((value: Type) => {
                          return (
                            <MenuItem key={value} value={value}>
                              {renderType(value)}
                            </MenuItem>
                          );
                        })}
                      </TextField>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        select
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        name="status"
                        label="Status"
                        id="status"
                        value={values.status || ''}
                        InputLabelProps={{ shrink: !!values.status }}
                        error={touched.status && !!errors.status}
                        helperText={touched.status && errors.status}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={classes.formItem}
                      >
                        {Object.values(Status).map((value: Status) => {
                          return (
                            <MenuItem key={value} value={value}>
                              {renderStatus(value)}
                            </MenuItem>
                          );
                        })}
                      </TextField>
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
                                        <React.Fragment key={index}>
                                          <Grid container spacing={3}>
                                            <Grid
                                              item
                                              xs={10}
                                              md={11}
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
                                              xs={2}
                                              md={1}
                                              className={
                                                classes.formArrayRemoveButtonContainer
                                              }
                                            >
                                              <IconButton
                                                size="small"
                                                onClick={() =>
                                                  arrayHelpers.remove(index)
                                                }
                                                className={
                                                  classes.formArrayRemoveButton
                                                }
                                              >
                                                <RemoveIcon />
                                              </IconButton>
                                            </Grid>
                                          </Grid>
                                        </React.Fragment>
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
                                    title: '',
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
                      <FieldArray
                        name="references"
                        render={(arrayHelpers) => (
                          <Grid container spacing={3}>
                            {values.references &&
                              values.references.length > 0 &&
                              values.references.map(
                                (
                                  reference: {
                                    id: string | undefined;
                                    link: string | undefined;
                                    source: string | undefined;
                                  },
                                  index: number
                                ) => {
                                  return (
                                    <React.Fragment key={index}>
                                      <Grid item xs={12}>
                                        <Grid container spacing={3}>
                                          <Grid
                                            item
                                            xs={12}
                                            md={6}
                                            key={`${index}-link`}
                                          >
                                            <TextField
                                              variant="outlined"
                                              margin="normal"
                                              fullWidth
                                              key={`references.${index}.link`}
                                              name={`references.${index}.link`}
                                              label="Link"
                                              type="url"
                                              id={`references.${index}.link`}
                                              error={
                                                !!touched?.references &&
                                                touched?.references[index]
                                                  ?.link &&
                                                !!Array.isArray(
                                                  errors?.references
                                                ) &&
                                                !!(errors.references[
                                                  index
                                                ] as FormikErrors<Reference>)
                                                  ?.link
                                              }
                                              helperText={
                                                !!touched?.references &&
                                                touched?.references[index]
                                                  ?.link &&
                                                !!Array.isArray(
                                                  errors?.references
                                                ) &&
                                                (errors.references[
                                                  index
                                                ] as FormikErrors<Reference>)
                                                  ?.link
                                              }
                                              value={reference.link || ''}
                                              onChange={handleChange}
                                              onBlur={handleBlur}
                                              className={classes.formItem}
                                            />
                                          </Grid>
                                          <Grid
                                            item
                                            xs={10}
                                            md={5}
                                            key={`${index}-source`}
                                          >
                                            <SourceAutoComplete
                                              fieldName={`references.${index}.source`}
                                              value={reference.source || ''}
                                              touched={
                                                !!touched?.references &&
                                                touched.references[index]
                                                  ?.source
                                              }
                                              error={
                                                !!Array.isArray(
                                                  errors?.references
                                                )
                                                  ? (errors.references[
                                                      index
                                                    ] as FormikErrors<
                                                      Reference
                                                    >)?.source
                                                  : undefined
                                              }
                                              setFieldValue={setFieldValue}
                                              setTouched={setTouched}
                                            />
                                          </Grid>
                                          <Grid
                                            item
                                            xs={2}
                                            md={1}
                                            className={
                                              classes.formArrayRemoveButtonContainer
                                            }
                                          >
                                            <IconButton
                                              size="small"
                                              onClick={() =>
                                                arrayHelpers.remove(index)
                                              }
                                              className={
                                                classes.formArrayRemoveButton
                                              }
                                            >
                                              <RemoveIcon />
                                            </IconButton>
                                          </Grid>
                                        </Grid>
                                      </Grid>
                                    </React.Fragment>
                                  );
                                }
                              )}
                            <Grid item xs={12}>
                              <Button
                                fullWidth
                                variant="outlined"
                                color="primary"
                                onClick={() =>
                                  arrayHelpers.push({
                                    id: undefined,
                                    link: '',
                                    source: '',
                                  })
                                }
                              >
                                Add a reference
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
                    <Grid item xs={12} md={6}>
                      <SeriesAutocomplete
                        fieldName={'prequels'}
                        label={'Prequels'}
                        errors={errors}
                        values={values.prequels || []}
                        setFieldValue={setFieldValue}
                        setTouched={setTouched}
                        loading={loadingOptions}
                        options={autoCompleteOptions}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SeriesAutocomplete
                        fieldName={'sequels'}
                        label={'Sequels'}
                        errors={errors}
                        values={values.sequels || []}
                        setFieldValue={setFieldValue}
                        setTouched={setTouched}
                        loading={loadingOptions}
                        options={autoCompleteOptions}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SeriesAutocomplete
                        fieldName={'mainStories'}
                        label={'Main Story'}
                        errors={errors}
                        values={values.mainStories || []}
                        setFieldValue={setFieldValue}
                        setTouched={setTouched}
                        loading={loadingOptions}
                        options={autoCompleteOptions}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <SeriesAutocomplete
                        fieldName={'sideStories'}
                        label={'Side Stories'}
                        errors={errors}
                        values={values.sideStories || []}
                        setFieldValue={setFieldValue}
                        setTouched={setTouched}
                        loading={loadingOptions}
                        options={autoCompleteOptions}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <SeriesAutocomplete
                        fieldName={'related'}
                        label={'Related'}
                        errors={errors}
                        values={values.related || []}
                        setFieldValue={setFieldValue}
                        setTouched={setTouched}
                        loading={loadingOptions}
                        options={autoCompleteOptions}
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
