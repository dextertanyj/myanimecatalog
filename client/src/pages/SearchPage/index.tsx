import {
  createStyles,
  Grid,
  Link,
  makeStyles,
  Paper,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import { blueGrey, teal } from '@material-ui/core/colors';
import { ColumnApi, GridApi } from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react';
import { debounce } from 'debounce';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuickSearchLazyQuery } from '../../gql/queries';
import { withAuth } from '../../utils/withAuth';

type Result = {
  title: string;
  id: string;
  type: 'Series' | 'Episode';
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pageGrid: {
      height: '100%',
    },
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

const gridOptions = {
  enableCellTextSelection: true,
};

const SearchPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const [fullHeight, setFullHeight] = useState<number>(
    window.innerWidth > 600 ? window.innerHeight - 100 : window.innerHeight - 92
  );
  const [contains, setContains] = useState<string>('');
  const [results, setResults] = useState<Result[]>([]);
  const [selectedRows, setSelectedRows] = useState<Result[]>([]);
  const [gridApi, setGridApi] = useState<
    | {
        api: GridApi;
        columnApi: ColumnApi;
      }
    | undefined
  >(undefined);

  const [searchQuery] = useQuickSearchLazyQuery({
    onCompleted: (searchPayload) => {
      const series = searchPayload.quickSearch?.series
        .filter((series) => series?.title && series.id)
        .map((series) => {
          return { title: series?.title, id: series?.id, type: 'Series' };
        });
      const episodes = searchPayload.quickSearch?.episodes
        .filter((episode) => episode?.title && episode.id)
        .map((episode) => {
          return { title: episode?.title, id: episode?.id, type: 'Episode' };
        });
      setResults([
        ...Array.from(series as Result[]),
        ...Array.from(episodes as Result[]),
      ]);
    },
  });

  const search = debounce((value: string) => {
    searchQuery({
      variables: {
        where: value,
      },
    });
  }, 500);

  const hideColumnsMobile = useCallback(() => {
    if (gridApi?.columnApi) {
      if (window.innerWidth >= 600) {
        gridApi.columnApi.setColumnWidth('type', 180);
      } else {
        gridApi.columnApi.setColumnWidth('type', 90);
      }
    }
  }, [gridApi]);

  useEffect(() => {
    const handleResize = () => {
      setFullHeight(
        window.innerWidth > 600
          ? window.innerHeight - 112
          : window.innerHeight - 104
      );
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', hideColumnsMobile);
    return () => window.removeEventListener('resize', hideColumnsMobile);
  }, [hideColumnsMobile]);

  useEffect(() => {
    if (contains.length > 2) {
      search(contains);
    } else if (contains.length === 0) {
      setResults([]);
    }
  }, [contains]);

  const linkRenderer = (params: {
    data: { title: string; id: string; type: 'Series' | 'Episode' };
  }) => {
    return (
      <Link
        href="#"
        onClick={() =>
          history.push(
            `/${params.data.type === 'Series' ? 'series' : 'episode'}/${
              params.data.id
            }`
          )
        }
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
      sortable: true,
      cellRendererFramework: linkRenderer,
    },
    {
      headerName: 'Type',
      field: 'type',
      width: 180,
      sortable: true,
    },
  ];

  const onGridReady = useCallback((params: any) => {
    const { api, columnApi } = params;
    setGridApi({ api, columnApi });
    if (window.innerWidth >= 600) {
      columnApi.setColumnWidth('type', 180);
    } else {
      columnApi.setColumnWidth('type', 90);
    }
  }, []);

  const onSelectionChanged = () => {
    if (gridApi !== undefined) {
      setSelectedRows(gridApi?.api?.getSelectedRows());
    }
  };

  const viewSelected = () => {
    if (selectedRows.length === 1) {
      const id = selectedRows[0].id;
      if (selectedRows[0].type === 'Episode') {
        history.push(`/episode/${id}`);
      } else {
        history.push(`/series/${id}`);
      }
    }
  };

  return (
    <div style={{ height: fullHeight }}>
      <Grid container spacing={3} className={classes.pageGrid}>
        <Grid item xs={12} className={classes.pageGrid}>
          <Paper elevation={3} className={classes.paper}>
            <Grid
              container
              direction={'column'}
              spacing={3}
              className={classes.mainGrid}
            >
              <Grid container item spacing={3}>
                <Grid item xs={12} className={classes.tableTitle}>
                  <Typography variant="h5">Quick Search</Typography>
                </Grid>
                <Grid item xs={12} container spacing={3}>
                  <Grid
                    item
                    xs={12}
                    sm={8}
                    md={4}
                    style={{ textAlign: 'left', paddingBottom: 0 }}
                  >
                    <TextField
                      variant="outlined"
                      value={contains}
                      placeholder={'Search'}
                      onChange={(event) => setContains(event.target.value)}
                      fullWidth
                    />
                  </Grid>
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
                    gridOptions={gridOptions}
                    columnDefs={columnDefs}
                    onSelectionChanged={onSelectionChanged}
                    rowData={(results as Result[]) || []}
                  />
                </div>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default (props: any, key: any) => withAuth()(SearchPage)(props);
