import {
  Button,
  CircularProgress,
  createStyles,
  makeStyles,
  Theme,
} from '@material-ui/core';
import { teal } from '@material-ui/core/colors';
import { saveAs } from 'file-saver';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useFileExportLazyQuery } from '../gql/queries';

type Props = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      position: 'relative',
    },
    buttonProgress: {
      color: teal[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -12,
      marginLeft: -12,
    },
  })
);

export const FileRecordsExportButton = (props: Props) => {
  const classes = useStyles();
  const { setLoading, loading: anyLoading } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [fileExportQuery] = useFileExportLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: (data) => {
      const content = data.files
        ?.map((file) => file?.path)
        .filter(Boolean)
        .reduce((previous, current) => {
          return previous + `"${current}",\r\n`;
        }, '');
      closeSnackbar('file-generation');
      if (content) {
        const file = new File([content], 'fileList.csv', {
          type: 'text/csv,charset=utf-8',
        });
        enqueueSnackbar(`Generated file.`, {
          key: 'file-generation-success',
          variant: 'success',
        });
        saveAs(file);
      } else {
        enqueueSnackbar(`Something went wrong. Please try again.`, {
          key: 'file-generation',
          variant: 'warning',
        });
      }
      setLoading(false);
    },
  });

  const handleClick = () => {
    setLoading(true);
    enqueueSnackbar(`Generating file... Please wait...`, {
      key: 'file-generation',
      autoHideDuration: null,
    });
    fileExportQuery();
  };

  return (
    <div className={classes.wrapper}>
      <Button
        onClick={() => handleClick()}
        disabled={anyLoading}
        variant="contained"
      >
        Export File List CSV
      </Button>
      {anyLoading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};
