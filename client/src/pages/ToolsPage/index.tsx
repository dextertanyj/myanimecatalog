import {
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
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
  })
);

const ToolsPage = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Grid container spacing={3}>
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
