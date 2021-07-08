import { Button, Grid, makeStyles, TextField, Theme } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { ValidationError } from 'yup';
import { FileFormJsonSchema } from '../../utils/validation';

const useStyles = makeStyles((theme: Theme) => ({
  formItem: {
    marginTop: '0px',
    marginBottom: '0px',
  },
}));

type Props = {
  fields: string[];
  setFieldValue: any;
  values: any;
  setTouched: any;
};

export const FileInfoPopulateField = (props: Props) => {
  const classes = useStyles();
  const [jsonString, setJsonString] = useState<string>('');
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = () => {
    try {
      const jsonData = JSON.parse(jsonString);
      FileFormJsonSchema.validateSync(jsonData);
      for (let i = 0; i < props.fields.length; i++) {
        if (jsonData[props.fields[i]] !== undefined) {
          const insert = async () => {
            await props.setFieldValue(
              props.fields[i],
              jsonData[props.fields[i]],
              true
            );
            await props.setTouched({ [props.fields[i]]: true });
          };
          insert();
        }
      }
    } catch (error) {
      if (error instanceof SyntaxError) {
        enqueueSnackbar(error.message, {
          key: 'json-parse-message',
          variant: 'warning',
        });
      } else if (error instanceof ValidationError) {
        enqueueSnackbar(error.message, {
          key: 'json-validation-message',
          variant: 'warning',
        });
      }
    }
  };

  return (
    <>
      <Grid item xs={11}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          id="jsonData"
          label="JSON Data"
          name="jsonData"
          value={jsonString || ''}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setJsonString(event?.target?.value);
          }}
          className={classes.formItem}
        />
      </Grid>
      <Grid item xs={1}>
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          style={{ height: '100%' }}
          className={classes.formItem}
          onClick={handleClick}
        >
          Parse
        </Button>
      </Grid>
    </>
  );
};
