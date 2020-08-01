import {
  Button,
  ButtonGroup,
  createStyles,
  Grid,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';
import QueueOutlinedIcon from '@material-ui/icons/QueueOutlined';
import { ColumnApi, GridApi } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BatchEpisodeForm } from '../Forms/BatchEpisodeForm';
import { EpisodeForm } from '../Forms/EpisodeForm';
import { Episode } from '../gql/documents';
import { useEpisodesInSeriesQuery, useLoggedInQuery } from '../gql/queries';
import { writeAccess } from '../utils/auth';
import { ActionType } from '../utils/constants';

type Props = {
  seriesId: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(3),
      textAlign: 'center',
    },
    tableHeader: {
      marginBottom: '10px',
      textAlign: 'left',
      color: blueGrey[700],
    },
    tableHeaderItems: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    buttonGroup: {
      '& div': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      },
    },
  })
);

const columnDefs = [
  {
    headerName: 'Title',
    field: 'title',
    flex: 1,
    filter: true,
    sortable: true,
    lockVisible: true,
  },
  {
    headerName: 'Episode No.',
    field: 'episodeNumber',
    width: 120,
    sortable: true,
    lockVisible: true,
  },
  {
    headerName: 'Remarks',
    field: 'remarks',
    width: 360,
    sortable: true,
    lockVisible: true,
  },
];

export const EpisodesTable = (props: Props) => {
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
  const [showBatchForm, setShowBatchForm] = useState<boolean>(false);
  const [formAction, setFormAction] = useState<ActionType>(ActionType.CREATE);
  const [selectedRows, setSelectedRows] = useState<Episode[]>([]);

  const { data: rowData, refetch } = useEpisodesInSeriesQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      where: {
        id: props.seriesId,
      },
    },
  });

  const { data: AuthData } = useLoggedInQuery({
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

  const viewSelected = () => {
    if (selectedRows.length === 1 && selectedRows[0].id) {
      const seriesId = selectedRows[0].id;
      history.push(`/episode/${seriesId}`);
    }
  };

  return (
    <div>
      <Paper elevation={3} className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12} className={classes.tableHeader}>
            <Grid container spacing={3}>
              <Grid item xs className={classes.tableHeaderItems}>
                <Typography variant="h5">{`Episodes`}</Typography>
              </Grid>
              {AuthData?.loggedIn?.role &&
                writeAccess.includes(AuthData.loggedIn.role) && (
                  <>
                    <Grid item className={classes.buttonGroup}>
                      <ButtonGroup>
                        <Button
                          startIcon={<AddIcon />}
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            setFormAction(ActionType.CREATE);
                            setShowForm(true);
                          }}
                        >
                          Add New
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => setShowBatchForm(true)}
                        >
                          <QueueOutlinedIcon />
                        </Button>
                      </ButtonGroup>
                    </Grid>
                    <Grid item className={classes.tableHeaderItems}>
                      <Button
                        startIcon={<EditOutlinedIcon />}
                        variant="contained"
                        color="primary"
                        disabled={selectedRows.length !== 1}
                        onClick={() => {
                          setFormAction(ActionType.UPDATE);
                          setShowForm(true);
                        }}
                      >
                        Edit
                      </Button>
                    </Grid>
                  </>
                )}
              <Grid item className={classes.tableHeaderItems}>
                <Button
                  startIcon={<PageviewOutlinedIcon />}
                  disabled={selectedRows.length !== 1}
                  variant="contained"
                  onClick={() => {
                    viewSelected();
                  }}
                >
                  View
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
                rowData={(rowData?.episodesInSeries as any[]) || []}
              ></AgGridReact>
            </div>
          </Grid>
        </Grid>
      </Paper>
      {showForm && (
        <EpisodeForm
          episodeId={
            (selectedRows.length === 1 && selectedRows[0].id) || undefined
          }
          seriesId={props.seriesId}
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
      {showBatchForm && (
        <BatchEpisodeForm
          seriesId={props.seriesId}
          open={showBatchForm}
          onSubmit={() => {
            refetch();
          }}
          onClose={() => {
            setShowBatchForm(false);
          }}
        />
      )}
    </div>
  );
};
