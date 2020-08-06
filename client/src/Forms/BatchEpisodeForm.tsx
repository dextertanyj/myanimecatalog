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
  TextField,
  Theme,
} from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import {
  FieldArray,
  Formik,
  FormikErrors,
  FormikProps,
  FormikValues,
} from 'formik';
import { useSnackbar } from 'notistack';
import React from 'react';
import * as Yup from 'yup';
import { GenericError, NetworkError } from '../Components/ErrorSnackbars';
import { useBatchCreateEpisodeMutation } from '../gql/queries';

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
  seriesId: string;
  open: boolean;
  onSubmit: () => void;
  onClose: () => void;
};

type EpisodeSimple = {
  title: string;
  episodeNumber: number;
};

type FormValues = {
  episodes: EpisodeSimple[];
};

export const BatchEpisodeForm = (props: Props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [batchCreateEpisodeMutation] = useBatchCreateEpisodeMutation({
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
    onCompleted: (created) => {
      enqueueSnackbar(
        `Successfully created ${created.batchCreateEpisode.length} episode`,
        {
          key: 'episode-form-message',
        }
      );
      props.onSubmit();
      props.onClose();
    },
  });

  const onSubmit = (values: FormikValues) => {
    const data = values.episodes.map((value: EpisodeSimple) => {
      return {
        title: value.title,
        episodeNumber: value.episodeNumber,
        series: { connect: { id: props.seriesId } },
      };
    });
    batchCreateEpisodeMutation({
      variables: {
        data,
      },
    });
  };

  const initialFormValues: FormValues = {
    episodes: [{ title: '', episodeNumber: ('' as unknown) as number }],
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      fullWidth={true}
      maxWidth={'lg'}
    >
      <DialogTitle key="DialogTitle">Add New Episodes</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initialFormValues}
          onSubmit={onSubmit}
          validationSchema={Yup.object({
            episodes: Yup.array().of(
              Yup.object().shape({
                title: Yup.string().required(`Please enter a title`),
                episodeNumber: Yup.number()
                  .required(`Please enter an episode number`)
                  .min(0, `Invalid episode number`),
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
                  <Grid item xs={12}>
                    <FieldArray
                      name="episodes"
                      render={(arrayHelpers) => (
                        <Grid container spacing={3}>
                          {values.episodes &&
                            values.episodes.length > 0 &&
                            values.episodes.map(
                              (episode: EpisodeSimple, index: number) => {
                                return (
                                  <React.Fragment key={index}>
                                    <Grid item xs={12}>
                                      <Grid container spacing={2}>
                                        <Grid item xs={12} md={9}>
                                          <TextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            key={`episodes.${index}.title`}
                                            name={`episodes.${index}.title`}
                                            label="Title"
                                            error={
                                              !!touched?.episodes &&
                                              touched?.episodes[index]?.title &&
                                              !!Array.isArray(
                                                errors?.episodes
                                              ) &&
                                              !!(errors.episodes[
                                                index
                                              ] as FormikErrors<EpisodeSimple>)
                                                ?.title
                                            }
                                            helperText={
                                              !!touched?.episodes &&
                                              touched?.episodes[index]?.title &&
                                              !!Array.isArray(
                                                errors?.episodes
                                              ) &&
                                              (errors.episodes[
                                                index
                                              ] as FormikErrors<EpisodeSimple>)
                                                ?.title
                                            }
                                            id={`episodes.${index}.title`}
                                            value={episode.title || ''}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            className={classes.formItem}
                                          />
                                        </Grid>
                                        <Grid item xs={10} md={2}>
                                          <TextField
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            type="number"
                                            key={`episodes.${index}.episodeNumber`}
                                            name={`episodes.${index}.episodeNumber`}
                                            label="Episode No."
                                            error={
                                              !!touched?.episodes &&
                                              touched?.episodes[index]
                                                ?.episodeNumber &&
                                              !!Array.isArray(
                                                errors?.episodes
                                              ) &&
                                              !!(errors.episodes[
                                                index
                                              ] as FormikErrors<EpisodeSimple>)
                                                ?.episodeNumber
                                            }
                                            helperText={
                                              !!touched?.episodes &&
                                              touched?.episodes[index]
                                                ?.episodeNumber &&
                                              !!Array.isArray(
                                                errors?.episodes
                                              ) &&
                                              (errors.episodes[
                                                index
                                              ] as FormikErrors<EpisodeSimple>)
                                                ?.episodeNumber
                                            }
                                            id={`episodes.${index}.episodeNumber`}
                                            value={episode.episodeNumber}
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
                                  title: '',
                                  episodeNumber: ('' as unknown) as number,
                                })
                              }
                            >
                              Add an Episode
                            </Button>
                          </Grid>
                        </Grid>
                      )}
                    />
                  </Grid>
                </Grid>
                <DialogActions className={classes.dialogButtons}>
                  <Button onClick={handleReset}>Reset</Button>
                  <Button type="submit" color="primary">
                    Create
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
