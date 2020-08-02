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
import React, { useCallback, useEffect, useState } from 'react';
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
      marginBottom: '5px',
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

  const hideColumnsMobile = useCallback(() => {
    if (gridApi?.columnApi) {
      if (window.innerWidth >= 960) {
        gridApi.columnApi.setColumnsVisible(['remarks', 'episodeNumber'], true);
      } else if (window.innerWidth >= 600) {
        gridApi.columnApi.setColumnsVisible(['remarks'], false);
        gridApi.columnApi.setColumnsVisible(['episodeNumber'], true);
      } else {
        gridApi.columnApi.setColumnsVisible(
          ['remarks', 'episodeNumber'],
          false
        );
      }
    }
  }, [gridApi]);

  useEffect(() => {
    window.addEventListener('resize', hideColumnsMobile);
    return () => window.removeEventListener('resize', hideColumnsMobile);
  }, [hideColumnsMobile]);

  const gridOptions = {
    enableCellTextSelection: true,
  };

  const onGridReady = useCallback((params: any) => {
    const { api, columnApi } = params;
    setGridApi({ api, columnApi });
    if (window.innerWidth >= 960) {
    } else if (window.innerWidth >= 600) {
      columnApi.setColumnsVisible(['remarks'], false);
    } else {
      columnApi.setColumnsVisible(['remarks', 'episodeNumber'], false);
    }
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
        <Grid container spacing={3} className={classes.tableHeader}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm className={classes.tableTitle}>
                <Typography variant="h5">Episodes</Typography>
              </Grid>
              {AuthData?.loggedIn?.role &&
              writeAccess.includes(AuthData.loggedIn.role) ? (
                <>
                  <Grid item xs={12} sm={'auto'}>
                    <ButtonGroup style={{ width: '100%' }}>
                      <Button
                        startIcon={<AddIcon />}
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setFormAction(ActionType.CREATE);
                          setShowForm(true);
                        }}
                        style={{ width: '100%' }}
                      >
                        Add
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
                  <Grid item xs={6} sm={'auto'}>
                    <Button
                      fullWidth
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
                  <Grid item xs={6} sm={'auto'}>
                    <Button
                      fullWidth
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
                </>
              ) : (
                <Grid item xs={12} sm={'auto'}>
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
