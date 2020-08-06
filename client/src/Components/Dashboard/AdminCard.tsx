import {
  Card,
  CardContent,
  CardHeader,
  createStyles,
  Grid,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import React, { useState } from 'react';
import { CatalogDataExportButton } from '../CatalogDataExportButton';
import { FileRecordsExportButton } from '../FileRecordsExportButton';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      textAlign: 'center',
    },
    cardHeader: {
      padding: theme.spacing(3),
      paddingBottom: theme.spacing(1),
      color: blueGrey[700],
    },
    cardContent: {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
      height: 'calc(100% - 102px)',
    },
    gridList: {
      '& div': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      },
    },
  })
);

export const AdminCard = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <Card elevation={3} className={classes.card} style={{ height: '100%' }}>
      <CardHeader
        className={classes.cardHeader}
        title={<Typography variant="h5">Catalog Statistics & Tools</Typography>}
      />
      <CardContent className={classes.cardContent}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FileRecordsExportButton
              setLoading={setLoading}
              loading={loading}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <CatalogDataExportButton
              setLoading={setLoading}
              loading={loading}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
