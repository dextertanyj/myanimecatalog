import {
  Button,
  ButtonGroup,
  createStyles,
  Grid,
  Link,
  makeStyles,
  Paper,
  Theme,
  Typography,
} from '@material-ui/core';
import { blueGrey, teal } from '@material-ui/core/colors';
import AddIcon from '@material-ui/icons/Add';
import QueueOutlinedIcon from '@material-ui/icons/QueueOutlined';
import { ColumnApi, GridApi } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { BatchEpisodeForm } from '../Forms/BatchEpisodeForm';
import { EpisodeForm } from '../Forms/EpisodeForm';
import {
  Episode,
  useEpisodesInSeriesQuery,
  useLoggedInQuery,
} from '../gql/queries';
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
    tableTitle: {
      color: blueGrey[700],
      textAlign: 'left',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
  })
);

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
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  const [maxGridHeight, setMaxGridHeight] = useState<number>(
    window.innerWidth > 600
      ? window.innerHeight - 160
      : window.innerHeight - 152
  );

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

  const linkRenderer = (params: { data: Episode }) => {
    return (
      <Link
        href="#"
        onClick={() => history.push(`/episode/${params.data.id}`)}
        style={{ color: teal[600] }}
      >
        {params.data.title}
      </Link>
    );
  };

  const columnDefs = [
    {
      headerName: 'No.',
      field: 'episodeNumber',
      width: 75,
      sortable: true,
      lockVisible: true,
    },
    {
      headerName: 'Title',
      field: 'title',
      flex: 1,
      filter: true,
      sortable: true,
      lockVisible: true,
      cellRendererFramework: linkRenderer,
    },
    {
      headerName: 'Remarks',
      field: 'remarks',
      width: 360,
      sortable: true,
      lockVisible: true,
    },
  ];

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

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
      setMaxGridHeight(
        window.innerWidth > 600
          ? window.innerHeight - 160
          : window.innerHeight - 152
      );
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  return (
    <div>
      <Paper
        elevation={3}
        className={classes.paper}
        style={{
          height: maxGridHeight,
          maxHeight: innerWidth > 600 ? 560 : 676,
        }}
      >
        <Grid
          container
          direction={'column'}
          spacing={3}
          style={{ height: maxGridHeight - 48, maxHeight: 'calc(100% + 24px)' }}
        >
          <Grid container item spacing={3}>
            <Grid item xs={12} sm className={classes.tableTitle}>
              <Typography variant="h5">Episodes</Typography>
            </Grid>
            {AuthData?.loggedIn?.role &&
              writeAccess.includes(AuthData.loggedIn.role) && (
                <Grid item xs={12} sm={'auto'}>
                  <ButtonGroup style={{ width: '100%' }}>
                    <Button
                      startIcon={<AddIcon />}
                      variant="contained"
                      color="primary"
                      onClick={() => {
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
                rowData={(rowData?.episodesInSeries as any[]) || []}
              />
            </div>
          </Grid>
        </Grid>
      </Paper>
      {showForm && (
        <EpisodeForm
          seriesId={props.seriesId}
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
