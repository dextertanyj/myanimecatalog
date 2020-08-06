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

const processCodec = (files: File[]): { value: number; label: string }[] => {
  const codecMap = new Map<string, number>();
  files.forEach((file) => {
    if (file.codec) {
      const existing = codecMap.get(file.codec);
      if (existing) {
        codecMap.set(file.codec, existing + 1);
      } else {
        codecMap.set(file.codec, 1);
      }
    }
  });
  const intermediateArray: {
    key: string;
    count: number;
  }[] = [];
  for (const keyvalue of codecMap.entries()) {
    const key = keyvalue[0];
    const value = keyvalue[1];
    intermediateArray.push({
      key: key,
      count: value,
    });
  }
  const sortedArray = intermediateArray.sort((a, b) =>
    a.key.localeCompare(b.key)
  );
  return sortedArray.map((item) => {
    return { value: item.count, label: item.key };
  });
};

export const CodecChart = (props: Props) => {
  const { files } = props;
  const processed = processCodec(files);

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
