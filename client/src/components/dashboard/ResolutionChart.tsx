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
  const resolutionMap = new Map<number, Map<number, number>>();
  files.forEach((file) => {
    if (file.resolutionHeight && file.resolutionWidth) {
      const existing = resolutionMap.get(file.resolutionWidth)?.get(file.resolutionHeight);
      if (existing) {
        resolutionMap.get(file.resolutionWidth)?.set(file.resolutionHeight, existing + 1);
      } else if (resolutionMap.has(file.resolutionWidth)) {
        const map = resolutionMap.get(file.resolutionWidth);
        map?.set(file.resolutionHeight, 1);
      } else {
        resolutionMap.set(
          file.resolutionWidth,
          new Map<number, number>([[file.resolutionHeight, 1]])
        );
      }
    }
  });
  const intermediateArray: {
    key: { width: number; height: number };
    count: number;
  }[] = [];
  for (const keyvalueWidth of resolutionMap.entries()) {
    const width = keyvalueWidth[0];
    const map = keyvalueWidth[1];
    for (const keyvalueHeight of map.entries()) {
      const height = keyvalueHeight[0];
      const count = keyvalueHeight[1];
      intermediateArray.push({
        key: { width: width, height: height },
        count: count,
      });
    }
  }
  const sortedArray = intermediateArray.sort(
    (a, b) => a.key.width * a.key.height - b.key.width * b.key.height
  );
  return sortedArray.map((item) => {
    return {
      value: item.count,
      label: `${item.key.width} × ${item.key.height}`,
    };
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
