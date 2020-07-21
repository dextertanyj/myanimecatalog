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
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import moment from 'moment';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SeriesForm } from '../Forms/SeriesForm';
import { Series } from '../gql/documents';
import { useAllSeriesQuery, useDeleteSeriesMutation } from '../gql/queries';
import { Action_Type } from '../utils/constants';
import { renderSeason, renderStatus, renderType } from '../utils/enumRender';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableHeader: {
      marginTop: '10px',
    },
    headerButton: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

const columnDefs = [
  { headerName: 'Title', field: 'title', flex: 1 },
  { headerName: 'Episodes', field: 'episodeCount', width: 120 },
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
  },
  {
    headerName: 'Status',
    valueGetter: (params: any) => {
      return renderStatus(params.data.status);
    },
    width: 180,
  },
  {
    headerName: 'Type',
    valueGetter: (params: any) => {
      return renderType(params.data.type);
    },
    width: 180,
  },
];

export const SeriesTable = () => {
  const classes = useStyles();
  const history = useHistory();
  const [gridApi, setGridApi] = useState<any>(undefined);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formAction, setFormAction] = useState<Action_Type>(Action_Type.CREATE);
  const [selectedRows, setSelectedRows] = useState<Series[]>([]);

  const { data: rowData, refetch } = useAllSeriesQuery();

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

  const onRowSelectionChanged = () => {
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
          <Grid item>
            <Typography variant="h5">All Series</Typography>
          </Grid>
          <Grid item xs />
          <Grid item className={classes.headerButton}>
            <Button
              startIcon={<AddIcon />}
              variant="contained"
              color="primary"
              size="small"
              onClick={() => {
                setFormAction(Action_Type.CREATE);
                setShowForm(true);
              }}
            >
              Add New
            </Button>
          </Grid>
          <Grid item className={classes.headerButton}>
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
          <Grid item className={classes.headerButton}>
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
          <Grid item xs={12} className={classes.tableHeader}>
            <div className="ag-theme-material" style={{ height: '500px' }}>
              <AgGridReact
                onGridReady={onGridReady}
                animateRows
                enableCellTextSelection
                rowDeselection
                rowSelection="single"
                onSelectionChanged={onRowSelectionChanged}
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
            setFormAction(Action_Type.CREATE);
          }}
          onClose={() => {
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
};
