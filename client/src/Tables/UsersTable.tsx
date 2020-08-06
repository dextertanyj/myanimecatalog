import {
  Button,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { ColumnApi, GridApi } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useCallback, useEffect, useState } from 'react';
import { UserForm } from '../Forms/UserForm';
import { User } from '../gql/documents';
import { useUsersQuery } from '../gql/queries';
import { ActionType } from '../utils/constants';
import { renderRole } from '../utils/enumRender';

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

const columnDefs = [
  { headerName: 'Name', field: 'name', flex: 1, sortable: true },
  {
    headerName: 'Username',
    field: 'username',
    width: 240,
    filter: true,
    sortable: true,
    lockVisible: true,
  },
  {
    headerName: 'Access Level',
    field: 'role',
    valueGetter: (params: { data: User }) => {
      return params?.data?.role && renderRole(params.data.role);
    },
    width: 180,
    sortable: true,
    lockVisible: true,
  },
  {
    headerName: 'Locked',
    field: 'locked',
    valueGetter: (params: { data: User }) => {
      return !!params?.data?.passwordAttempts &&
        params.data.passwordAttempts > 10
        ? `Yes`
        : 'No';
    },
    width: 120,
    filter: true,
    sortable: true,
    lockVisible: true,
  },
];

export const UsersTable = () => {
  const classes = useStyles();
  const [gridApi, setGridApi] = useState<
    | {
        api: GridApi;
        columnApi: ColumnApi;
      }
    | undefined
  >(undefined);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formAction, setFormAction] = useState<ActionType>(ActionType.CREATE);
  const [selectedRows, setSelectedRows] = useState<User[]>([]);

  const { data: rowData, refetch } = useUsersQuery({
    fetchPolicy: 'cache-and-network',
  });

  const gridOptions = {
    enableCellTextSelection: true,
  };

  const onGridReady = useCallback(
    (params: { api: GridApi; columnApi: ColumnApi }) => {
      const { api, columnApi } = params;
      setGridApi({ api, columnApi });
      if (window.innerWidth >= 960) {
        columnApi.setColumnsVisible(['username', 'role', 'locked'], true);
        columnApi.setColumnWidths([
          { key: 'username', newWidth: 240 },
          { key: 'role', newWidth: 180 },
        ]);
      } else if (window.innerWidth >= 600) {
        columnApi.setColumnsVisible(['locked'], false);
        columnApi.setColumnsVisible(['username', 'role'], true);
        columnApi.setColumnWidths([
          { key: 'username', newWidth: 160 },
          { key: 'role', newWidth: 140 },
        ]);
      } else {
        columnApi.setColumnsVisible(['username', 'role', 'locked'], false);
      }
    },
    []
  );

  const onSelectionChanged = () => {
    if (gridApi !== undefined) {
      setSelectedRows(gridApi?.api?.getSelectedRows());
    }
  };

  const hideColumnsMobile = useCallback(() => {
    if (gridApi?.columnApi) {
      if (window.innerWidth >= 960) {
        gridApi?.columnApi.setColumnsVisible(
          ['username', 'role', 'locked'],
          true
        );
        gridApi?.columnApi.setColumnWidths([
          { key: 'username', newWidth: 240 },
          { key: 'role', newWidth: 180 },
        ]);
      } else if (window.innerWidth >= 600) {
        gridApi?.columnApi.setColumnsVisible(['locked'], false);
        gridApi?.columnApi.setColumnsVisible(['username', 'role'], true);
        gridApi?.columnApi.setColumnWidths([
          { key: 'username', newWidth: 160 },
          { key: 'role', newWidth: 140 },
        ]);
      } else {
        gridApi?.columnApi.setColumnsVisible(
          ['username', 'role', 'locked'],
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
              <Typography variant="h5">Users</Typography>
            </Grid>
            <Grid item xs={6} sm={'auto'}>
              <Button
                fullWidth
                startIcon={<AddOutlinedIcon />}
                variant="contained"
                color="primary"
                onClick={() => {
                  setFormAction(ActionType.CREATE);
                  setShowForm(true);
                }}
              >
                Add
              </Button>
            </Grid>
            <Grid item xs={6} sm={'auto'}>
              <Button
                fullWidth
                startIcon={<EditOutlinedIcon />}
                disabled={selectedRows.length !== 1}
                variant="outlined"
                color="primary"
                onClick={() => {
                  setFormAction(ActionType.UPDATE);
                  setShowForm(true);
                }}
              >
                Edit
              </Button>
            </Grid>
          </Grid>
          <Grid item xs>
            <div className="ag-theme-material" style={{ height: '100%' }}>
              <AgGridReact
                onGridReady={onGridReady}
                animateRows
                enableCellTextSelection
                rowDeselection
                rowSelection="single"
                onSelectionChanged={onSelectionChanged}
                gridOptions={gridOptions}
                columnDefs={columnDefs}
                rowData={(rowData?.users as any[]) || []}
              />
            </div>
          </Grid>
        </Grid>
      </Paper>
      {showForm && (
        <UserForm
          userId={
            (selectedRows.length === 1 && selectedRows[0]?.id) || undefined
          }
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
