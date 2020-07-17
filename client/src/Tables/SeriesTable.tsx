import { createStyles, makeStyles, Paper, Theme } from "@material-ui/core";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
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
];

export const SeriesTable = () => {
  const classes = useStyles();
  return (
    <div>
      <Paper elevation={3} className={classes.paper}>
        <div className="ag-grid-material" style={{ height: "500px" }}>
          <AgGridReact columnDefs={columnDefs} rowData={[]}></AgGridReact>
        </div>
      </Paper>
    </div>
  );
};
