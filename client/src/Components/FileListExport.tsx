import { Button } from '@material-ui/core';
import { saveAs } from 'file-saver';
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { useFileExportLazyQuery } from '../gql/queries';

type Props = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
};

export const FileListExport = (props: Props) => {
  const { setLoading, loading: anyLoading } = props;
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [fileExportQuery, { loading }] = useFileExportLazyQuery({
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
          key: 'file-generation',
          variant: 'success',
        });
        saveAs(file);
      } else {
        enqueueSnackbar(`Something went wrong. Please try again.`, {
          key: 'file-generation',
          variant: 'warning',
        });
      }
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
    fileExportQuery();
  };

  return (
    <Button
      onClick={() => handleClick()}
      disabled={anyLoading}
      variant="contained"
    >
      Download File CSV
    </Button>
  );
};
