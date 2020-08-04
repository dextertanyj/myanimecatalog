import {
  createStyles,
  Grid,
  Link,
  makeStyles,
  Paper,
  Tab,
  Tabs,
  Theme,
} from '@material-ui/core';
import { blueGrey, teal } from '@material-ui/core/colors';
import { ColumnApi, GridApi } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserProgress, WatchStatus } from '../gql/documents';
import { useMyProgressQuery } from '../gql/queries';
import { renderType } from '../utils/enumRender';
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

export const AnimeListTable = () => {
  const classes = useStyles();
  const history = useHistory();
  const [gridApi, setGridApi] = useState<
    | {
        api: GridApi;
        columnApi: ColumnApi;
      }
    | undefined
  >(undefined);
  const [selectedTab, setSelectedTab] = useState<number>(0);
  const [rowData, setRowData] = useState<UserProgress[]>([]);
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);
  const [filteredRowData, setFilteredRowData] = useState<UserProgress[]>([]);

  const { data } = useMyProgressQuery({
    fetchPolicy: 'cache-and-network',
    onCompleted: (data) => {
      const collated: UserProgress[] = [];
      data.myProgress?.forEach((item) => {
        const readOnlySeries = item?.series;
        const series = { ...readOnlySeries };
        const progress = { ...item, series: series };
        collated.push(progress);
      });
      setRowData(collated);
    },
  });

  const gridOptions = {
    enableCellTextSelection: true,
  };

  const linkRenderer = (params: { data: UserProgress }) => {
    return (
      <Link
        href="#"
        onClick={() => history.push(`/series/${params.data.series?.id}`)}
        style={{ color: teal[600] }}
      >
        {params.data.series?.title}
      </Link>
    );
  };

  const columnDefs = [
    {
      headerName: 'Title',
      field: 'series.title',
      flex: 1,
      filter: true,
      sortable: true,
      lockVisible: true,
      cellRendererFramework: linkRenderer,
      cellClassRules: {
        'completed': 'data.status === "COMPLETED"',
        'watching': 'data.status === "WATCHING"',
        'onhold': 'data.status === "ONHOLD"',
        'plan-to-watch': 'data.status === "PENDING"',
        'dropped': 'data.status === "DROPPED"',
      },
    },
    {
      headerName: 'Score',
      field: 'overall',
      valueGetter: (params: any) => {
        return params.data.overall ?? '—';
      },
      width: 120,
      sortable: true,
      lockVisible: true,
    },
    {
      headerName: 'Progress',
      field: 'completed',
      width: 120,
      cellRenderer: (params: { data: UserProgress }) => {
        if (params.data.completed === params.data.series?.episodeCount) {
          return `${params.data.completed}`;
        } else {
          return `${params.data.completed || '-'} / ${
            params.data.series?.episodeCount
          }`;
        }
      },
      sortable: true,
      lockVisible: true,
    },
    {
      headerName: 'Type',
      field: 'series.type',
      valueGetter: (params: any) => {
        return renderType(params.data.series.type);
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
      if (window.innerWidth >= 960) {
        columnApi.setColumnsVisible(
          ['overall', 'completed', 'series.type'],
          true
        );
      } else {
        columnApi.setColumnsVisible(
          ['overall', 'completed', 'series.type'],
          false
        );
      }
    },
    []
  );

  const hideColumnsMobile = useCallback(() => {
    if (gridApi?.columnApi) {
      if (window.innerWidth >= 960) {
        console.log(window.innerWidth);
        gridApi.columnApi.setColumnsVisible(
          ['overall', 'completed', 'series.type'],
          true
        );
      } else {
        console.log('test');
        gridApi.columnApi.setColumnsVisible(
          ['overall', 'completed', 'series.type'],
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
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTabChange = (_event: React.ChangeEvent<{}>, value: number) => {
    setSelectedTab(value);
  };

  useEffect(() => {
    switch (selectedTab) {
      case 0:
        setFilteredRowData(rowData);
        break;
      case 1:
        setFilteredRowData(
          rowData.filter((data) => data.status === WatchStatus.Watching)
        );
        break;
      case 2:
        setFilteredRowData(
          rowData.filter((data) => data.status === WatchStatus.Completed)
        );
        break;
      case 3:
        setFilteredRowData(
          rowData.filter((data) => data.status === WatchStatus.Onhold)
        );
        break;
      case 4:
        setFilteredRowData(
          rowData.filter((data) => data.status === WatchStatus.Dropped)
        );
        break;
      case 5:
        setFilteredRowData(
          rowData.filter((data) => data.status === WatchStatus.Pending)
        );
        break;
    }
  }, [selectedTab, rowData]);

  return (
    <div style={{ height: '100%' }}>
      <Paper elevation={3} className={classes.paper}>
        <Grid
          container
          direction={'column'}
          spacing={3}
          className={classes.mainGrid}
        >
          <Grid item spacing={0} style={{ paddingBottom: 12 }}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              centered={innerWidth >= 1366}
              style={{
                width:
                  innerWidth >= 1366
                    ? innerWidth - 316
                    : innerWidth >= 600
                    ? innerWidth - 152
                    : innerWidth - 96,
              }}
              variant={innerWidth >= 1366 ? 'standard' : 'scrollable'}
            >
              <Tab label="All Anime" />
              <Tab label="Currently Watching" />
              <Tab label="Completed" />
              <Tab label="On Hold" />
              <Tab label="Dropped" />
              <Tab label="Plan To Watch" />
            </Tabs>
          </Grid>
          <Grid item xs style={{ paddingTop: 0 }}>
            <div className="ag-theme-material" style={{ height: '100%' }}>
              <AgGridReact
                onGridReady={onGridReady}
                animateRows
                enableCellTextSelection
                gridOptions={gridOptions}
                frameworkComponents={linkRenderer}
                columnDefs={columnDefs}
                rowData={(filteredRowData as any[]) || []}
              />
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};
