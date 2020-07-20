import { Button, Container, Dialog, DialogTitle, FormHelperText, Grid, IconButton, makeStyles, MenuItem, TextField, Theme } from '@material-ui/core';
import RemoveIcon from '@material-ui/icons/Remove';
import { DatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { FieldArray, Formik, FormikProps, FormikValues } from 'formik';
import { Moment } from 'moment';
import React, { ReactElement } from 'react';
import * as Yup from 'yup';
import { Type } from '../gql/documents';
import { Season, Status, useCreateSeriesMutation } from '../gql/queries';
import { Action_Type } from '../utils/constants';

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formTitle: {
    textAlign: "center"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  formArrayGrid: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  formItem: {
    marginTop: "0px",
    marginBottom: "0px",
  },
  submit: {
    margin: theme.spacing(0, 0, 2),
  },
}));

type Props = {
  seriesId?: string;
  open: boolean;
  action: Action_Type;
  onSubmit: () => void;
  onClose: () => void;
}

type Reference = {
  id: string | undefined, link: string | undefined, source: string | undefined
}

type AlternativeTitle = {
  id: string | undefined, title: string | undefined
}

type FormValues = {
  title: string;
  seasonNumber: number;
  episodeCount: number;
  status: Status;
  type: Type;
  releaseSeason: string;
  releaseYear: Moment;
  remarks: string;
  alternativeTitles: AlternativeTitle[];
  references: Reference[];
  prequel: string[];
  sequel: string[];
  sideStory: string[];
  mainStory: string[];
  related: string[];
}

export const SeriesForm = (props: Props): ReactElement => {
  const classes = useStyles();

  const [createSeriesMutation] = useCreateSeriesMutation({
    onCompleted: () => {
      props.onSubmit();
    }
  });

  const onSubmit = (values: FormikValues) => {
    const {alternativeTitles, references, seasonNumber, episodeCount, prequel, sequel, mainStory, sideStory, related, ...rest} = values;
    let alternativeTitlesFormatted = undefined;
    let referencesFormatted = undefined;
    if (alternativeTitles.length > 0) {
      alternativeTitlesFormatted = {
        create: alternativeTitles.filter((altTitle: AlternativeTitle) => !altTitle.id).map((altTitle: AlternativeTitle) => { return {title: altTitle.title} })
      }
    }
    if (references.length > 0) {
      referencesFormatted = {
        create: references.filter((reference: Reference) => !reference.id).map((reference: Reference) => { return { link: reference.link, source: reference.source } })
      }
    }

    createSeriesMutation({
      variables: {
        data: {
          alternativeTitles: alternativeTitlesFormatted,
          references: referencesFormatted,
          episodeCount: episodeCount === '' ? undefined : episodeCount,
          seasonNumber: seasonNumber === '' ? undefined : seasonNumber,
          ...rest,
        }
      }
    })
  }

  const initialFormValues: Partial<FormValues> = {
    title: undefined,
    seasonNumber: undefined,
    episodeCount: undefined,
    status: undefined,
    type: undefined,
    releaseSeason: undefined,
    releaseYear: undefined,
    remarks: undefined,
    alternativeTitles: [],
    references: [],
  }

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth={true} maxWidth={"lg"}>
      <DialogTitle key="DialogTitle">Add A New Series</DialogTitle>
      <Container>
        <Formik
          initialValues={initialFormValues}
          onSubmit={onSubmit}
          validationSchema={Yup.object({
            title: Yup.string().required(`Please enter a title`),
            releaseSeason: Yup.string().required(`Please select the release season`),
            releaseYear: Yup.date().required(`Please select the release year`),
            seasonNumber: Yup.number().min(0, `Season number should be positive`),
            episodeCount: Yup.number().required(`Please input the number of episodes`).min(0, `Number of episodes should be positive`),
            status: Yup.string().required(`Please select a status`),
            type: Yup.string().required(`Please select a type`),
          })}
        >
          {(props: FormikProps<Partial<FormValues>>) => {
            const {
              values,
              errors,
              touched,
              handleSubmit,
              handleChange,
              handleBlur,
              setFieldValue,
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
                      value={values.title || null}
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
                      name="seasonNumber"
                      label="Season Number"
                      id="seasonNumber"
                      type="number"
                      value={values.seasonNumber || null}
                      error={touched.seasonNumber && !!errors.seasonNumber}
                      helperText={touched.seasonNumber && errors.seasonNumber}
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
                      name="episodeCount"
                      label="Number of Episodes"
                      id="episodeCount"
                      type="number"
                      value={values.episodeCount || null}
                      error={touched.episodeCount && !!errors.episodeCount}
                      helperText={touched.episodeCount && errors.episodeCount}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={classes.formItem}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <TextField
                      select
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      name="releaseSeason"
                      label="Release Season"
                      id="releaseSeason"
                      value={values.releaseSeason || null}
                      error={touched.releaseSeason && !!errors.releaseSeason}
                      helperText={touched.releaseSeason && errors.releaseSeason}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={classes.formItem}
                    >
                      {Object.entries(Season).map((value: [string, Season]) => {
                        return <MenuItem key={value[1]} value={value[1]}>{value[0]}</MenuItem>
                      })}
                    </TextField>
                  </Grid>
                  <Grid item xs={3}>
                    <DatePicker
                      variant="inline"
                      fullWidth
                      inputVariant="outlined"
                      clearable
                      views={["year"]}
                      label="Release Year"
                      value={values?.releaseYear || null}
                      error={touched.releaseYear && !!errors.releaseYear}
                      helperText={touched.releaseYear && errors.releaseYear}
                      onChange={(date: MaterialUiPickersDate) => setFieldValue("releaseYear", date?.startOf("year") as Moment)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      select
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      name="type"
                      label="Type"
                      id="type"
                      value={values.type || null}
                      error={touched.type && !!errors.type}
                      helperText={touched.type && errors.type}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={classes.formItem}
                    >
                      {Object.entries(Type).map((value: [string, Type]) => {
                        return <MenuItem key={value[1]} value={value[1]}>{value[0]}</MenuItem>
                      })}
                      {
                        touched.type &&
                          <FormHelperText>{errors.type}</FormHelperText>
                      }
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      select
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      name="status"
                      label="Status"
                      id="status"
                      value={values.status || null}
                      error={touched.status && !!errors.status}
                      helperText={touched.status && errors.status}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={classes.formItem}
                    >
                      {Object.entries(Status).map((value: [string, Status]) => {
                        return <MenuItem key={value[1]} value={value[1]}>{value[0]}</MenuItem>
                      })}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <FieldArray
                      name="alternativeTitles"
                      render={arrayHelpers => 
                        <Grid container spacing={3}>
                          {values.alternativeTitles && values.alternativeTitles.length > 0 && 
                          <Grid item xs={12}>
                            {values.alternativeTitles.map((altTitle: {id: string | undefined, title: string | undefined}, index: number) => {
                              return (
                                <Grid container spacing={3}>
                                  <Grid item xs={11} key={`${index}-title`}>
                                    <TextField
                                      variant="outlined"
                                      margin="normal"
                                      fullWidth
                                      key={`alternativeTitles.${index}.title`}
                                      name={`alternativeTitles.${index}.title`}
                                      label="Alternative Title"
                                      id={`alternativeTitles.${index}.title`}
                                      value={altTitle.title || ''}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      className={classes.formItem}
                                    />
                                  </Grid>
                                  <Grid item xs={1} className={classes.formArrayGrid} alignContent="space-around" alignItems="center">
                                    <IconButton size="small" onClick={() => arrayHelpers.remove(index)}>
                                      <RemoveIcon />
                                    </IconButton>
                                  </Grid>
                                </Grid>
                              )
                            })}
                          </Grid>
                          }
                          <Grid item xs={12}>
                            <Button 
                              fullWidth 
                              variant="outlined"
                              color="primary" 
                              onClick={() => arrayHelpers.push({id: undefined, title: undefined})}>
                              Add an alternative title
                            </Button>
                          </Grid>
                        </Grid>
                      } />
                  </Grid>
                  <Grid item xs={12}>
                    <FieldArray
                      name="references"
                      render={arrayHelpers => 
                        <Grid container spacing={3}>
                          {values.references && values.references.length > 0 && 
                          <Grid item xs={12}>
                            {values.references.map((reference: {id: string | undefined, link: string | undefined, source: string | undefined}, index: number) => {
                              return (
                                <Grid container spacing={3}>
                                  <Grid item xs={6} key={`${index}-link`}>
                                    <TextField
                                      variant="outlined"
                                      margin="normal"
                                      fullWidth
                                      key={`references.${index}.link`}
                                      name={`references.${index}.link`}
                                      label="Link"
                                      type="url"
                                      id={`references.${index}.link`}
                                      value={reference.link || null}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      className={classes.formItem}
                                    />
                                  </Grid>
                                  <Grid item xs={5} key={`${index}-source`}>
                                    <TextField
                                      variant="outlined"
                                      margin="normal"
                                      fullWidth
                                      key={`references.${index}.source`}
                                      name={`references.${index}.source`}
                                      label="Source"
                                      id={`references.${index}.source`}
                                      value={reference.source || null}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      className={classes.formItem}
                                    />
                                  </Grid>
                                  <Grid item xs={1} className={classes.formArrayGrid} alignContent="space-around" alignItems="center">
                                    <IconButton size="small" onClick={() => arrayHelpers.remove(index)}>
                                      <RemoveIcon />
                                    </IconButton>
                                  </Grid>
                                </Grid>
                              )
                            })}
                          </Grid>
                          }
                          <Grid item xs={12}>
                            <Button 
                              fullWidth 
                              variant="outlined"
                              color="primary" 
                              onClick={() => arrayHelpers.push({id: undefined, title: undefined})}>
                              Add a reference
                            </Button>
                          </Grid>
                        </Grid>
                      } />
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
                      value={values.remarks || null}
                      error={touched.remarks && !!errors.remarks}
                      helperText={touched.remarks && errors.remarks}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={classes.formItem}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                    Create
                    </Button>

                  </Grid>
                </Grid>
              </form>
            );
          }}
        </Formik>
      </Container>      
    </Dialog>
  )
}