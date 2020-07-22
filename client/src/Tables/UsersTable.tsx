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
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';
import { ColumnApi, GridApi } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserForm } from '../Forms/UserForm';
import { User } from '../gql/documents';
import { useUsersQuery } from '../gql/queries';
import { ActionType } from '../utils/constants';
import { renderRole } from '../utils/enumRender';

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
      padding: theme.spacing(3),
      textAlign: 'center',
      color: theme.palette.text.secondary,
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
  },
  {
    headerName: 'Role',
    field: 'role',
    valueGetter: (params: { data: User }) => {
      return params?.data?.role && renderRole(params.data.role);
    },
    width: 180,
    sortable: true,
  },
  {
    headerName: 'Locked',
    valueGetter: (params: { data: User }) => {
      return !!params?.data?.passwordAttempts &&
        params.data.passwordAttempts > 10
        ? `Yes`
        : 'No';
    },
    width: 180,
    filter: true,
    sortable: true,
  },
];

export const UsersTable = () => {
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
  const [selectedRows, setSelectedRows] = useState<User[]>([]);

  const { data: rowData, refetch } = useUsersQuery();

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
          colId: 'username',
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

  return (
    <div>
      <Paper elevation={3} className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item>
            <Typography variant="h5">Users</Typography>
          </Grid>
          <Grid item xs />
          <Grid item className={classes.headerButton}>
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
          <Grid item className={classes.headerButton}>
            <Button
              startIcon={<PageviewOutlinedIcon />}
              disabled={selectedRows.length !== 1}
              variant="contained"
              size="small"
              onClick={() => {
                setFormAction(ActionType.UPDATE);
                setShowForm(true);
              }}
            >
              Edit
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
                onSelectionChanged={onSelectionChanged}
                onFirstDataRendered={onFirstDataRendered}
                gridOptions={gridOptions}
                columnDefs={columnDefs}
                rowData={(rowData?.users as any[]) || []}
              ></AgGridReact>
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