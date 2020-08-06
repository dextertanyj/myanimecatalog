import { ApolloError } from '@apollo/client';
import {
  Container,
  createStyles,
  Grid,
  IconButton,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
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
      'color': blueGrey[700],
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
    iconButtonContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100%',
      padding: 0,
      minHeight: '36px',
    },
  })
);

export const FileInfo = (props: Props) => {
  const { file } = props;
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<boolean>(false);
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);

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

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filePath = file.path?.substring(0, file.path?.lastIndexOf('/'));
  const fileName = file.path?.substring(file.path?.lastIndexOf('/'));

  return (
    <>
      <Grid container spacing={3}>
        {props.editable && (
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs />
              <Grid item>
                <Container className={classes.iconButtonContainer}>
                  <IconButton
                    size="small"
                    color="primary"
                    disabled={!props.file.id}
                    onClick={() => setShowForm(true)}
                  >
                    <EditOutlinedIcon />
                  </IconButton>
                </Container>
              </Grid>
              <Grid item>
                <Container className={classes.iconButtonContainer}>
                  <IconButton
                    size="small"
                    color="secondary"
                    disabled={!props.file.id}
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <DeleteOutlinedIcon />
                  </IconButton>
                </Container>
              </Grid>
            </Grid>
          </Grid>
        )}

        <Grid item xs={12} className={classes.tableContent}>
          <Grid container spacing={3}>
            <Grid item xs={4} sm={2} md={2}>
              <Typography>File Name</Typography>
            </Grid>
            <Grid item xs={8} sm={10} md={4}>
              <Grid container spacing={3} wrap={'nowrap'}>
                <Grid item xs={12}>
                  <Typography style={{ wordWrap: 'break-word' }}>
                    {fileName}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4} sm={2} md={2}>
              <Typography>File Path</Typography>
            </Grid>
            <Grid item xs={8} sm={10} md={4}>
              <Grid container spacing={3} wrap={'nowrap'}>
                <Grid item xs={12}>
                  <Typography style={{ wordWrap: 'break-word' }}>
                    {filePath}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4} sm={2} md={2}>
              <Typography>Codec</Typography>
            </Grid>
            <Grid item xs={8} sm={4} md={2}>
              <Typography>{file.codec}</Typography>
            </Grid>
            <Grid item xs={4} sm={2} md={2}>
              <Typography>Checksum</Typography>
            </Grid>
            <Grid item xs={8} sm={4} md={2}>
              <Typography>{file.checksum}</Typography>
            </Grid>
            <Grid item xs={4} sm={2} md={2}>
              <Typography>Source</Typography>
            </Grid>
            <Grid item xs={8} sm={4} md={2}>
              <Typography>
                {file.source && renderSource(file.source)}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={2} md={2}>
              <Typography>Size</Typography>
            </Grid>
            <Grid item xs={8} sm={4} md={2}>
              <Typography>{file.fileSize}</Typography>
            </Grid>
            <Grid item xs={4} sm={2} md={2}>
              <Typography>Resolution</Typography>
            </Grid>
            <Grid item xs={8} sm={4} md={2}>
              <Typography>{file.resolution}</Typography>
            </Grid>
            <Grid item xs={4} sm={2} md={2}>
              <Typography>Duration</Typography>
            </Grid>
            <Grid item xs={8} sm={4} md={2}>
              <Typography>
                {file.duration && renderDuration(file.duration)}
              </Typography>
            </Grid>
            <Grid item xs={4} sm={2} md={2}>
              <Typography>Remarks</Typography>
            </Grid>
            <Grid item xs={8} sm={10} md={6}>
              <Grid container spacing={3} wrap={'nowrap'}>
                <Grid item xs={12}>
                  <Typography>{file.remarks}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4} sm={2} md={2}>
              <Typography>Last Updated</Typography>
            </Grid>
            <Grid item xs={8} sm={10} md={2}>
              <Typography>
                {moment(file.updatedAt || file.createdAt).format(
                  'HH:mm   DD/MM/YYYY'
                )}
              </Typography>
            </Grid>
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
    </>
  );
};
