import { Button } from '@material-ui/core';
import { saveAs } from 'file-saver';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { Series } from '../gql/documents';
import { useExportDataLazyQuery } from '../gql/queries';
import { generateExcel } from '../utils/excel';

type Props = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
};

export const ExportData = (props: Props) => {
  const { setLoading, loading: anyLoading } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [exportDataQuery, { loading }] = useExportDataLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: async (data) => {
      const file = await generateExcel(data.allSeries as Series[]);
      closeSnackbar('file-generation');
      enqueueSnackbar(`Generated file.`, {
        key: 'file-generation',
        variant: 'success',
      });
      saveAs(file, 'Exported Data.xlsx');
    },
  });

  useEffect(() => {
    setLoading(loading);
  }, [loading, setLoading]);

  const handleClick = () => {
    enqueueSnackbar(`Generating file... Please wait...`, {
      key: 'file-generation',
      autoHideDuration: null,
    });
    exportDataQuery();
  };

  return (
    <Button
      onClick={() => handleClick()}
      disabled={anyLoading}
      variant="contained"
    >
      Export Data
    </Button>
  );
};
