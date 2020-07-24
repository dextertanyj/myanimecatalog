import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import moment from 'moment';
import React, { useState } from 'react';
import { FileForm } from '../Forms/FileForm';
import { File } from '../gql/documents';
import { ActionType } from '../utils/constants';
import { renderDuration, renderSource } from '../utils/enumRender';

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
  const classes = useStyles();
  const [showForm, setShowForm] = useState<boolean>(false);

  return (
    <Grid container spacing={3}>
      {props.editable && (
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs />
            <Grid item>
              <Button
                color="primary"
                variant="contained"
                disabled={!props.file.id}
                onClick={() => setShowForm(true)}
              >
                Edit
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
          <Grid item xs={10}>
            <Typography noWrap>{file.path}</Typography>
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
          <Grid item xs={6}>
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
    </Grid>
  );
};
