import {
  Button,
  createStyles,
  Grid,
  Link,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import { blueGrey, teal } from '@material-ui/core/colors';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import { ColumnApi, GridApi } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SeriesForm } from '../Forms/SeriesForm';
import { Series } from '../gql/documents';
import { useAllSeriesQuery, useLoggedInQuery } from '../gql/queries';
import { writeAccess } from '../utils/auth';
import { ActionType } from '../utils/constants';
import { renderSeason, renderStatus, renderType } from '../utils/enumRender';
import './progress.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(3),
      textAlign: 'center',
      height: 'calc(100% - 36px)',
    },
    mainGrid: {
      height: 'calc(100% + 24px)',
    },
    tableTitle: {
      color: blueGrey[700],
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  })
);

const seasonComparator = (date1: string, date2: string): number => {
  if (!date1 && !date2) {
    return 0;
  } else if (!date1) {
    return -1;
  } else if (!date2) {
    return 1;
  }
  const season1 = date1.split(' ')[0];
  const year1 = date1.split(' ')[1];
  const season2 = date2.split(' ')[0];
  const year2 = date2.split(' ')[1];
  if (Number.parseInt(year2) - Number.parseInt(year1) > 0) {
    return -1;
  } else {
    const seasonOrder = ['Winter', 'Spring', 'Summer', 'Fall'];
    return seasonOrder.indexOf(season1) - seasonOrder.indexOf(season2);
  }
};

export const SeriesTable = () => {
  const classes = useStyles();
  const history = useHistory();
  const [gridApi, setGridApi] = useState<
    | {
        api: GridApi;
        columnApi: ColumnApi;
      }
    | undefined
  >(undefined);
  const [showForm, setShowForm] = useState<boolean>(false);

  const { data: rowData, refetch } = useAllSeriesQuery({
    fetchPolicy: 'cache-and-network',
  });

  const { data: AuthData } = useLoggedInQuery({
    fetchPolicy: 'cache-and-network',
  });

  const gridOptions = {
    enableCellTextSelection: true,
  };

  const linkRenderer = (params: { data: Series }) => {
    return (
      <Link
        href="#"
        onClick={() => history.push(`/series/${params.data.id}`)}
        style={{ color: teal[600] }}
      >
        {params.data.title}
      </Link>
    );
  };

  const columnDefs = [
    {
      headerName: 'Title',
      field: 'title',
      flex: 1,
      filter: true,
      sortable: true,
      lockVisible: true,
      cellRendererFramework: linkRenderer,
      cellClassRules: {
        'completed': 'data.currentStatus === "COMPLETED"',
        'watching': 'data.currentStatus === "WATCHING"',
        'onhold': 'data.currentStatus === "ONHOLD"',
        'plan-to-watch': 'data.currentStatus === "PENDING"',
        'dropped': 'data.currentStatus === "DROPPED"',
      },
    },
    {
      headerName: 'Season',
      field: 'seasonNumber',
      width: 120,
      sortable: true,
      lockVisible: true,
    },
    {
      headerName: 'Episodes',
      field: 'episodeCount',
      width: 120,
      sortable: true,
      lockVisible: true,
    },
    {
      headerName: 'Release Season',
      field: 'releaseSeason',
      valueGetter: (params: { data: Series }) => {
        return params.data.releaseSeason && params.data.releaseYear
          ? `${renderSeason(params.data.releaseSeason)} ${moment(
              params.data.releaseYear
            ).format('YYYY')}`
          : '';
      },
      width: 180,
      filter: true,
      sortable: true,
      comparator: seasonComparator,
      sortingOrder: ['asc', 'desc'],
      lockVisible: true,
    },
    {
      headerName: 'Status',
      field: 'status',
      valueGetter: (params: any) => {
        return renderStatus(params.data.status);
      },
      width: 180,
      filter: true,
      sortable: true,
      lockVisible: true,
    },
    {
      headerName: 'Type',
      field: 'type',
      valueGetter: (params: any) => {
        return renderType(params.data.type);
      },
      width: 180,
      filter: true,
      sortable: true,
      lockVisible: true,
    },
  ];

  const onGridReady = useCallback(
    (params: { api: GridApi; columnApi: ColumnApi }) => {
      const { api, columnApi } = params;
      setGridApi({ api, columnApi });
      if (window.innerWidth >= 1280) {
        columnApi.setColumnsVisible(
          [
            'seasonNumber, episodeCount',
            'releaseSeason',
            'status',
            'type',
            'currentStatus',
          ],
          true
        );
        columnApi.setColumnWidths([
          { key: 'seasonNumber', newWidth: 120 },
          { key: 'episodeCount', newWidth: 120 },
          { key: 'releaseSeason', newWidth: 180 },
          { key: 'status', newWidth: 180 },
          { key: 'type', newWidth: 180 },
        ]);
      } else if (window.innerWidth >= 960) {
        columnApi.setColumnsVisible(
          ['seasonNumber', 'episodeCount', 'status', 'type'],
          true
        );
        columnApi.setColumnsVisible(['releaseSeason'], false);
        columnApi.setColumnWidths([
          { key: 'seasonNumber', newWidth: 100 },
          { key: 'episodeCount', newWidth: 100 },
          { key: 'status', newWidth: 150 },
          { key: 'type', newWidth: 150 },
        ]);
      } else if (window.innerWidth >= 600) {
        columnApi.setColumnsVisible(['status', 'type'], true);
        columnApi.setColumnsVisible(
          ['seasonNumber', 'episodeCount', 'releaseSeason'],
          false
        );
        columnApi.setColumnWidths([
          { key: 'status', newWidth: 150 },
          { key: 'type', newWidth: 150 },
        ]);
      } else {
        columnApi.setColumnsVisible(
          [
            'seasonNumber',
            'episodeCount',
            'releaseSeason',
            'status',
            'type',
            'currentStatus',
          ],
          false
        );
      }
    },
    []
  );

  const hideColumnsMobile = useCallback(() => {
    if (gridApi?.columnApi) {
      if (window.innerWidth >= 1280) {
        gridApi.columnApi.setColumnsVisible(
          ['seasonNumber, episodeCount', 'releaseSeason', 'status', 'type'],
          true
        );
        gridApi.columnApi.setColumnWidths([
          { key: 'seasonNumber', newWidth: 120 },
          { key: 'episodeCount', newWidth: 120 },
          { key: 'releaseSeason', newWidth: 180 },
          { key: 'status', newWidth: 180 },
          { key: 'type', newWidth: 180 },
        ]);
      } else if (window.innerWidth >= 960) {
        gridApi.columnApi.setColumnsVisible(
          ['seasonNumber', 'episodeCount', 'status', 'type'],
          true
        );
        gridApi.columnApi.setColumnsVisible(['releaseSeason'], false);
        gridApi.columnApi.setColumnWidths([
          { key: 'seasonNumber', newWidth: 100 },
          { key: 'episodeCount', newWidth: 100 },
          { key: 'status', newWidth: 150 },
          { key: 'type', newWidth: 150 },
        ]);
      } else if (window.innerWidth >= 600) {
        gridApi.columnApi.setColumnsVisible(['status', 'type'], true);
        gridApi.columnApi.setColumnsVisible(
          ['seasonNumber', 'episodeCount', 'releaseSeason'],
          false
        );
        gridApi.columnApi.setColumnWidths([
          { key: 'status', newWidth: 150 },
          { key: 'type', newWidth: 150 },
        ]);
      } else {
        gridApi.columnApi.setColumnsVisible(
          ['seasonNumber', 'episodeCount', 'releaseSeason', 'status', 'type'],
          false
        );
      }
    }
  }, [gridApi]);

  useEffect(() => {
    window.addEventListener('resize', hideColumnsMobile);
    return () => window.removeEventListener('resize', hideColumnsMobile);
  }, [hideColumnsMobile]);

  return (
    <div style={{ height: '100%' }}>
      <Paper elevation={3} className={classes.paper}>
        <Grid
          container
          direction={'column'}
          spacing={3}
          className={classes.mainGrid}
        >
          <Grid container item spacing={3}>
            <Grid item xs={12} sm className={classes.tableTitle}>
              <Typography variant="h5">Catalog</Typography>
            </Grid>
            {AuthData?.loggedIn?.role &&
              writeAccess.includes(AuthData.loggedIn.role) && (
                <Grid item xs={12} sm={'auto'}>
                  <Button
                    fullWidth
                    startIcon={<AddOutlinedIcon />}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setShowForm(true);
                    }}
                  >
                    Add
                  </Button>
                </Grid>
              )}
          </Grid>
          <Grid item xs>
            <div className="ag-theme-material" style={{ height: '100%' }}>
              <AgGridReact
                onGridReady={onGridReady}
                animateRows
                enableCellTextSelection
                gridOptions={gridOptions}
                columnDefs={columnDefs}
                rowData={(rowData?.allSeries?.slice() as any[]) || []}
              />
            </div>
          </Grid>
        </Grid>
      </Paper>
      {showForm && (
        <SeriesForm
          open={showForm}
          action={ActionType.CREATE}
          onSubmit={() => {
            refetch();
          }}
          onClose={() => {
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
};
