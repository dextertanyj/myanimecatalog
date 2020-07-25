import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { ApolloError } from 'apollo-client';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { FileForm } from '../Forms/FileForm';
import { File } from '../gql/documents';
import { useDeleteFileMutation } from '../gql/queries';
import { ActionType } from '../utils/constants';
import { renderDuration, renderSource } from '../utils/enumRender';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { GenericError, NetworkError } from './ErrorSnackbars';

type Props = {
  file: File;
  editable: boolean;
  refetch: () => void;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableHeader: {
      'textAlign': 'left',
      '& div': {
        '& div': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        },
      },
    },
    tableContent: {
      'textAlign': 'center',
      '& div': {
        '& div': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        },
      },
    },
  })
);

export const FileInfoTable = (props: Props) => {
  const { file } = props;
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);

  const [deleteFileMutation] = useDeleteFileMutation({
    onError: (error: ApolloError) => {
      if (error.networkError) {
        NetworkError();
      } else if (error.graphQLErrors) {
        enqueueSnackbar(error.message.replace(`GraphQL error: `, ''), {
          key: 'delete-file-message',
          variant: 'warning',
        });
      } else {
        GenericError();
      }
    },
    onCompleted: () => {
      enqueueSnackbar(`Successfully deleted file record`, {
        key: `delete-file-message`,
      });
      props.refetch();
    },
  });

  const deleteFile = async () => {
    if (file.id) {
      await deleteFileMutation({
        variables: {
          where: {
            id: file.id,
          },
        },
      });
    } else {
    }
  };

  const filePath = file.path?.substring(0, file.path?.lastIndexOf('/'));
  const fileName = file.path?.substring(file.path?.lastIndexOf('/'));

  return (
    <Grid container spacing={3}>
      {props.editable && (
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs />
            <Grid item>
              <Button
                color="primary"
                startIcon={<EditOutlinedIcon />}
                variant="contained"
                disabled={!props.file.id}
                onClick={() => setShowForm(true)}
              >
                Edit
              </Button>
            </Grid>
            <Grid item>
              <Button
                color="secondary"
                startIcon={<DeleteOutlinedIcon />}
                variant="contained"
                disabled={!props.file.id}
                onClick={() => setShowDeleteDialog(true)}
              >
                Delete
              </Button>
            </Grid>
          </Grid>
        </Grid>
      )}

      <Grid item xs={12} className={classes.tableContent}>
        <Grid container spacing={3}>
          <Grid item xs={2}>
            <Typography>File Name</Typography>
          </Grid>
          <Grid item xs={4} wrap={'nowrap'}>
            <Typography>{fileName}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>File Path</Typography>
          </Grid>
          <Grid item xs={4} wrap={'nowrap'}>
            <Typography>{filePath}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>Codec</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>{file.codec}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>Checksum</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>{file.checksum}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>Source</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>{file.source && renderSource(file.source)}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>Size</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>{file.fileSize}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>Resolution</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>{file.resolution}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>Duration</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>
              {file.duration && renderDuration(file.duration)}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>Remarks</Typography>
          </Grid>
          <Grid item xs={6} wrap={'nowrap'}>
            <Typography>{file.remarks}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>Last Updated</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography>
              {moment(file.updatedAt || file.createdAt).format(
                'HH:mm   DD/MM/YYYY'
              )}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {showForm && props?.file?.id && (
        <FileForm
          open={showForm}
          action={ActionType.UPDATE}
          fileId={props.file.id}
          onSubmit={() => props.refetch()}
          onClose={() => setShowForm(false)}
        />
      )}
      {showDeleteDialog && (
        <DeleteConfirmDialog
          open={showDeleteDialog}
          title={`Delete ${file?.path?.split(/\//g).pop()} ?`}
          onClose={() => setShowDeleteDialog(false)}
          onSubmit={() => deleteFile()}
        />
      )}
    </Grid>
  );
};
