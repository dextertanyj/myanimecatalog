import { useSnackbar } from 'notistack';

export const NetworkError = () => {
  const { enqueueSnackbar } = useSnackbar();
  enqueueSnackbar(`Unable to contact the server. Please try again.`, {
    key: 'network-error',
  });
};

export const GenericError = () => {
  const { enqueueSnackbar } = useSnackbar();
  enqueueSnackbar(`Request failed. Please refresh the page and try again.`, {
    key: 'generic-error',
  });
};

export const QueryError = () => {
  const { enqueueSnackbar } = useSnackbar();
  enqueueSnackbar(`Failed to fetch data. Please refresh the page.`, {
    key: 'query-error',
  });
};
