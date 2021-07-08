import { darken, alpha, Grid } from '@material-ui/core';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { File, Source } from '../../gql/documents';
import { renderSource } from '../../utils/enumRender';

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

const processSource = (files: File[]): { value: number; label: string }[] => {
  const sourceMap = new Map<Source, number>();
  files.forEach((file) => {
    if (file.source) {
      const existing = sourceMap.get(file.source);
      if (existing) {
        sourceMap.set(file.source, existing + 1);
      } else {
        sourceMap.set(file.source, 1);
      }
    }
  });
  const intermediateArray: {
    key: Source;
    count: number;
  }[] = [];
  for (const keyvalue of sourceMap.entries()) {
    const key = keyvalue[0];
    const value = keyvalue[1];
    intermediateArray.push({
      key: key,
      count: value,
    });
  }
  const orderedSources = [
    Source.Cd,
    Source.Dvd,
    Source.Tv,
    Source.Web,
    Source.Bluray,
  ];
  const sortedArray = intermediateArray.sort(
    (a, b) => orderedSources.indexOf(a.key) - orderedSources.indexOf(b.key)
  );
  return sortedArray.map((item) => {
    return { value: item.count, label: renderSource(item.key) };
  });
};

export const SourceChart = (props: Props) => {
  const { files } = props;
  const processed = processSource(files);

  const data = {
    datasets: [
      {
        barPercentage: 0.85,
        data: processed.map((valueLabel) => valueLabel.value),
        borderWidth: 1,
        backgroundColor: barColor.map((color) => alpha(color, 0.8)),
        borderColor: barColor.map((color) => darken(color, 0.2)),
        hoverBackgroundColor: barColor.map((color) => alpha(color, 0.5)),
        hoverBorderColor: barColor.map((color) => darken(color, 0.2)),
      },
    ],
    labels: processed.map((valueLabel) => valueLabel.label),
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          precision: 0,
        },
      },
    },
  };
  return (
    <Grid item xs={11}>
      <Bar type="bar" data={data} options={options} />
    </Grid>
  );
};
