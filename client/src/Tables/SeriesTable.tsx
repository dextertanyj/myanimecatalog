import { Button, createStyles, Grid, makeStyles, Paper, Theme, Typography } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react";
import React, { useEffect, useState } from "react";
import { SeriesForm } from "../Forms/SeriesForm";
import { useAllSeriesQuery } from "../gql/queries";
import { Action_Type } from "../utils/constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableHeader: {
      marginTop: "10px",
    },
    headerButton: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

const columnDefs = [
  { headerName: "Title", field: "title" },
  { headerName: "Episodes", field: "episodeCount" },
  { headerName: "Release Date", field: "release" },
  { headerName: "Status", field: "status" },
  { headerName: "Type", field: "type" }
];

export const SeriesTable = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formAction, setFormAction] = useState<Action_Type>(Action_Type.CREATE)

  const gridOptions = {
    enableCellTextSelection: true
  }

  const classes = useStyles();

  const { data: rowData, refetch } = useAllSeriesQuery();

  useEffect(() => {
    console.log(rowData);
  }, [rowData]);

  return (
    <div>
      <Paper elevation={3} className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item>
            <Typography variant="h4">
              All Series
            </Typography>
          </Grid>
          <Grid item xs />
          <Grid item alignContent="space-around" alignItems="center" className={classes.headerButton}>
            <Button startIcon={<AddIcon />} variant="contained" color="primary" onClick={() => { setFormAction(Action_Type.CREATE); setShowForm(true); }}>Add New</Button>
          </Grid>
          <Grid item xs={12} className={classes.tableHeader}>
            <div className="ag-theme-material" style={{ height: "500px" }}>
              <AgGridReact
                animateRows
                gridOptions={gridOptions}
                columnDefs={columnDefs}
                rowData={rowData?.allSeries as any[] || []}
              ></AgGridReact>
            </div>
          </Grid>
        </Grid>
      </Paper>
      <SeriesForm open={showForm} action={formAction} onSubmit={() => { refetch(); setFormAction(Action_Type.CREATE) }} onClose={() => setShowForm(false)} />
    </div>
  );
};
