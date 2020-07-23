import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';
import { ColumnApi, GridApi } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SeriesForm } from '../Forms/SeriesForm';
import { Series } from '../gql/documents';
import {
  useAllSeriesQuery,
  useDeleteSeriesMutation,
  useLoggedInQuery,
} from '../gql/queries';
import { writeAccess } from '../utils/auth';
import { ActionType } from '../utils/constants';
import { renderSeason, renderStatus, renderType } from '../utils/enumRender';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(3),
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

const columnDefs = [
  {
    headerName: 'Title',
    field: 'title',
    flex: 1,
    filter: true,
    sortable: true,
  },
  { headerName: 'Season', field: 'seasonNumber', width: 120, sortable: true },
  { headerName: 'Episodes', field: 'episodeCount', width: 120, sortable: true },
  {
    headerName: 'Release Season',
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
  },
  {
    headerName: 'Status',
    valueGetter: (params: any) => {
      return renderStatus(params.data.status);
    },
    width: 180,
    filter: true,
    sortable: true,
  },
  {
    headerName: 'Type',
    valueGetter: (params: any) => {
      return renderType(params.data.type);
    },
    width: 180,
    filter: true,
    sortable: true,
  },
];

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
  const [formAction, setFormAction] = useState<ActionType>(ActionType.CREATE);
  const [selectedRows, setSelectedRows] = useState<Series[]>([]);

  const { data: rowData, loading, refetch } = useAllSeriesQuery({
    fetchPolicy: 'cache-and-network',
  });

  const { data: AuthData } = useLoggedInQuery({
    fetchPolicy: 'cache-and-network',
  });

  const [deleteSeriesMutation] = useDeleteSeriesMutation({
    onCompleted: () => {
      refetch();
      setSelectedRows([]);
    },
  });

  const gridOptions = {
    enableCellTextSelection: true,
  };

  const onGridReady = useCallback((params: any) => {
    const { api, columnApi } = params;
    setGridApi({ api, columnApi });
  }, []);

  const onFirstDataRendered = () => {
    if (gridApi?.api) {
      gridApi.api.setSortModel([
        {
          colId: 'title',
          sort: 'asc',
        },
      ]);
    }
  };
  const onSelectionChanged = () => {
    if (gridApi !== undefined) {
      setSelectedRows(gridApi?.api?.getSelectedRows());
    }
  };

  const viewSelected = () => {
    if (selectedRows.length === 1 && selectedRows[0].id) {
      const seriesId = selectedRows[0].id;
      history.push(`/series/${seriesId}`);
    }
  };

  const deleteSelected = () => {
    if (selectedRows.length === 1 && selectedRows[0].id) {
      const seriesId = selectedRows[0].id;
      deleteSeriesMutation({
        variables: {
          where: {
            id: seriesId,
          },
        },
      });
    }
  };

  return (
    <div>
      <Paper elevation={3} className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.tableHeader}>
            <Grid container spacing={3}>
              <Grid item xs>
                <Typography variant="h5">All Series</Typography>
              </Grid>
              {AuthData?.loggedIn?.role &&
                writeAccess.includes(AuthData.loggedIn.role) && (
                  <Grid item>
                    <Button
                      startIcon={<AddIcon />}
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => {
                        setFormAction(ActionType.CREATE);
                        setShowForm(true);
                      }}
                    >
                      Add New
                    </Button>
                  </Grid>
                )}
              <Grid item>
                <Button
                  startIcon={<PageviewOutlinedIcon />}
                  disabled={selectedRows.length !== 1}
                  variant="contained"
                  size="small"
                  onClick={() => {
                    viewSelected();
                  }}
                >
                  View
                </Button>
              </Grid>
              {AuthData?.loggedIn?.role &&
                writeAccess.includes(AuthData.loggedIn.role) && (
                  <Grid item>
                    <Button
                      startIcon={<DeleteIcon />}
                      disabled={selectedRows.length !== 1}
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => {
                        deleteSelected();
                      }}
                    >
                      Delete
                    </Button>
                  </Grid>
                )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div className="ag-theme-material" style={{ height: '500px' }}>
              <AgGridReact
                onGridReady={onGridReady}
                animateRows
                enableCellTextSelection
                rowDeselection
                rowSelection="single"
                onSelectionChanged={onSelectionChanged}
                onFirstDataRendered={onFirstDataRendered}
                gridOptions={gridOptions}
                columnDefs={columnDefs}
                rowData={(rowData?.allSeries as any[]) || []}
              ></AgGridReact>
            </div>
          </Grid>
        </Grid>
      </Paper>
      {showForm && (
        <SeriesForm
          open={showForm}
          action={formAction}
          onSubmit={() => {
            refetch();
            setFormAction(ActionType.CREATE);
          }}
          onClose={() => {
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
};
