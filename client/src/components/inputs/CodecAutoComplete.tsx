import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import { useSuggestedCodecsQuery } from '../../gql/queries';

type Props<FormValues> = {
  fieldName: string;
  value: string;
  error: string | undefined;
  touched: boolean | undefined;
  setFieldValue: any;
  setTouched: any;
};

export const CodecAutoComplete = (props: Props<any>) => {
  const { data: options, loading } = useSuggestedCodecsQuery({
    fetchPolicy: 'cache-and-network',
  });

  return (
    <Autocomplete
      freeSolo
      id={props.fieldName}
      options={
        (options?.suggestedCodecs?.map((codec) => codec?.codec) || []) as any[]
      }
      loading={loading}
      value={props.value}
      onChange={(_event, value) => {
        props.setFieldValue(props.fieldName, value ?? '');
      }}
      onInputChange={(_event, value) => {
        props.setFieldValue(props.fieldName, value ?? '');
      }}
      onBlur={() => props.setTouched({ [props.fieldName]: true })}
      renderInput={(params) => (
        <TextField
          {...params}
          error={props.touched && !!props.error}
          helperText={props.touched && props.error}
          variant="outlined"
          label={'Codec'}
        />
      )}
    />
  );
};
