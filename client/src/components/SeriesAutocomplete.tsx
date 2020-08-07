import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import { Series } from '../gql/documents';

type Props<FormValues> = {
  fieldName: string;
  label: string;
  options: Partial<Series>[];
  values: Partial<Series>[];
  errors: FormValues;
  setFieldValue: any;
  setTouched: any;
  loading: boolean;
};

export const SeriesAutocomplete = (props: Props<any>) => {
  const options = props.options.map((option) => {
    return { id: option.id, title: option.title };
  });

  return (
    <Autocomplete
      multiple
      disableClearable
      id={props.fieldName}
      options={options}
      loading={props.loading}
      getOptionLabel={(option: Series) => option?.title || 'No title'}
      getOptionSelected={(option, value) => option?.id === value?.id}
      value={props.values}
      filterSelectedOptions
      onChange={(_event, values) =>
        props.setFieldValue(props.fieldName, values)
      }
      onBlur={() => props.setTouched({ [props.fieldName]: true })}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" label={props.label} />
      )}
    />
  );
};
