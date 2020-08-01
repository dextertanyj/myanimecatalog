import {
  Button,
  createStyles,
  Divider,
  Grid,
  List,
  ListItem,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import React, { useState } from 'react';
import { FileForm } from '../Forms/FileForm';
import { File } from '../gql/documents';
import { useFilesForEpisodeQuery, useLoggedInQuery } from '../gql/queries';
import { writeAccess } from '../utils/auth';
import { ActionType } from '../utils/constants';
import { FileInfo } from './FileInfo';
import { FileListSkeleton } from './Skeletons/FileListSkeleton';

type Props = {
  episodeId: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(3),
      textAlign: 'center',
    },
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
      '& div': {
        '& div': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        },
      },
    },
    listItem: {
      marginTop: '10px',
      marginBottom: '10px',
      paddingLeft: '12px',
      paddingRight: '12px',
    },
  })
);

export const FileList = (props: Props) => {
  const classes = useStyles();
  const [showForm, setShowForm] = useState<boolean>(false);

  const { data: AuthData } = useLoggedInQuery({
    fetchPolicy: 'cache-and-network',
  });

  const { data: files, refetch, loading } = useFilesForEpisodeQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: props.episodeId,
      },
    },
  });

  return (
    <div>
      {loading && !files?.filesForEpisode ? (
        <FileListSkeleton />
      ) : (
        <Paper elevation={3} className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12} className={classes.tableHeader}>
              <Grid container spacing={3}>
                <Grid item xs>
                  <Typography variant="h5">Files</Typography>
                </Grid>
                {AuthData?.loggedIn?.role &&
                  writeAccess.includes(AuthData.loggedIn.role) && (
                    <Grid item>
                      <Button
                        color="primary"
                        variant="contained"
                        startIcon={<AddOutlinedIcon />}
                        onClick={() => setShowForm(true)}
                      >
                        Add
                      </Button>
                    </Grid>
                  )}
              </Grid>
            </Grid>
            <List>
              {files?.filesForEpisode?.map((file, index) => (
                <>
                  <Divider />
                  <ListItem
                    className={classes.listItem}
                    key={`listItem-${index}`}
                  >
                    <FileInfo
                      file={file as File}
                      editable={
                        !!AuthData?.loggedIn?.role &&
                        writeAccess.includes(AuthData?.loggedIn?.role)
                      }
                      refetch={refetch}
                      key={file?.id ?? `file-${index}`}
                    />
                  </ListItem>
                </>
              ))}
            </List>
          </Grid>
        </Paper>
      )}
      {showForm && (
        <FileForm
          open={showForm}
          action={ActionType.CREATE}
          episodeId={props.episodeId}
          onSubmit={() => refetch()}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  );
};
