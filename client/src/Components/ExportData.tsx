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
import { Series } from '../gql/documents';
import { useExportDataLazyQuery } from '../gql/queries';
import { generateExcel } from '../utils/excel';

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

export const ExportData = (props: Props) => {
  const classes = useStyles();
  const { setLoading, loading: anyLoading } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [exportDataQuery] = useExportDataLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: async (data) => {
      const file = await generateExcel(data.allSeries as Series[]);
      closeSnackbar('file-generation');
      enqueueSnackbar(`Generated file.`, {
        key: 'file-generation-success',
        variant: 'success',
      });
      setLoading(false);
      saveAs(file, 'Exported Data.xlsx');
    },
  });

  const handleClick = async () => {
    setLoading(true);
    enqueueSnackbar(`Generating file... Please wait...`, {
      key: 'file-generation',
      autoHideDuration: null,
    });
    exportDataQuery();
  };

  return (
    <div className={classes.wrapper}>
      <Button
        onClick={() => handleClick()}
        disabled={anyLoading}
        variant="contained"
      >
        Export Data
      </Button>
      {anyLoading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};
