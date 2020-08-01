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
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';
import { ColumnApi, GridApi } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useCallback, useState } from 'react';
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
    },
    tableHeader: {
      'color': blueGrey[700],
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
    valueGetter: (params: { data: User }) => {
      return !!params?.data?.passwordAttempts &&
        params.data.passwordAttempts > 10
        ? `Yes`
        : 'No';
    },
    width: 180,
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

  const onGridReady = useCallback((params: any) => {
    const { api, columnApi } = params;
    setGridApi({ api, columnApi });
  }, []);

  const onSelectionChanged = () => {
    if (gridApi !== undefined) {
      setSelectedRows(gridApi?.api?.getSelectedRows());
    }
  };

  return (
    <div>
      <Paper elevation={3} className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.tableHeader}>
            <Grid container spacing={3}>
              <Grid item xs>
                <Typography variant="h5">Users</Typography>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<AddOutlinedIcon />}
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setFormAction(ActionType.CREATE);
                    setShowForm(true);
                  }}
                >
                  Add New
                </Button>
              </Grid>
              <Grid item>
                <Button
                  startIcon={<PageviewOutlinedIcon />}
                  disabled={selectedRows.length !== 1}
                  variant="contained"
                  onClick={() => {
                    setFormAction(ActionType.UPDATE);
                    setShowForm(true);
                  }}
                >
                  Edit
                </Button>
              </Grid>
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
