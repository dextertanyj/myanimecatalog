import { darken, fade, Grid } from '@material-ui/core';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { File } from '../../gql/documents';

type Props = {
  files: File[];
};

const barColor = [
  '#ace9dd',
  '#b5efce',
  '#b7dcf4',
  '#ddc6e7',
  '#b9c0c9',
  '#fbeba5',
  '#f6d3af',
  '#f8c3b9',
  '#fafcfc',
  '#dbe2e2',
  '#added4',
  '#b4e4c9',
  '#acd7e6',
  '#dbbde5',
  '#b5bdc4',
  '#fdddaa',
  '#f0c3a3',
  '#ebbab4',
  '#e8eaec',
  '#d3d9d9',
];

const processResolution = (
  files: File[]
): { value: number; label: string }[] => {
  const resolutionMap = new Map<string, number>();
  files.forEach((file) => {
    if (file.resolution) {
      const existing = resolutionMap.get(file.resolution);
      if (existing) {
        resolutionMap.set(file.resolution, existing + 1);
      } else {
        resolutionMap.set(file.resolution, 1);
      }
    }
  });
  const intermediateArray: {
    key: { x: number; y: number };
    count: number;
  }[] = [];
  for (const keyvalue of resolutionMap.entries()) {
    const key = keyvalue[0];
    const x_resolution = Number.parseInt(key.split(' × ')[0]);
    const y_resolution = Number.parseInt(key.split(' × ')[1]);
    const value = keyvalue[1];
    intermediateArray.push({
      key: { x: x_resolution, y: y_resolution },
      count: value,
    });
  }
  const sortedArray = intermediateArray.sort(
    (a, b) => a.key.x * a.key.y - b.key.x * b.key.y
  );
  return sortedArray.map((item) => {
    return { value: item.count, label: `${item.key.x} × ${item.key.y}` };
  });
};

export const ResolutionChart = (props: Props) => {
  const { files } = props;
  const processed = processResolution(files);

  const data = {
    datasets: [
      {
        barPercentage: 0.85,
        data: processed.map((valueLabel) => valueLabel.value),
        borderWidth: 1,
        backgroundColor: barColor.map((color) => fade(color, 0.8)),
        borderColor: barColor.map((color) => darken(color, 0.2)),
        hoverBackgroundColor: barColor.map((color) => fade(color, 0.5)),
        hoverBorderColor: barColor.map((color) => darken(color, 0.2)),
      },
    ],
    labels: processed.map((valueLabel) => valueLabel.label),
  };

  const options = {
    legend: false,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            precision: 0,
          },
        },
      ],
    },
  };
  return (
    <Grid item xs={11}>
      <Bar data={data} options={options} />
    </Grid>
  );
};
