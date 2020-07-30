import {
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { ExportData } from '../../Components/ExportData';
import { FileListExport } from '../../Components/FileListExport';
import { Role } from '../../gql/documents';
import { withAuth } from '../../HOC/withAuth';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    tableHeader: {
      'marginBottom': '10px',
      'textAlign': 'left',
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

const ToolsPage = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={3} className={classes.paper}>
            <Grid container spacing={3}>
              <Grid item xs={12} className={classes.tableHeader}>
                <Grid container spacing={3}>
                  <Grid item>
                    <Typography variant="h5">Admin Tools</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <FileListExport setLoading={setLoading} loading={loading} />
              </Grid>
              <Grid item>
                <ExportData setLoading={setLoading} loading={loading} />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default (props: any, key: any) =>
  withAuth([Role.Admin])(ToolsPage)(props);
