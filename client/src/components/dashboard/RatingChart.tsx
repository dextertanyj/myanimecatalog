import { darken, alpha } from '@material-ui/core';
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { UserProgress } from '../../gql/documents';

type Props = {
  watchProgress: UserProgress[];
};

const breakdownRatings = (allProgress: UserProgress[]) => {
  const rated = allProgress
    .filter((progress) => !!progress.overall)
    .map((progress) => progress.overall) as number[];
  const zero = rated.filter((rating) => rating < 10).length;
  const one = rated.filter((rating) => 10 <= rating && rating < 20).length;
  const two = rated.filter((rating) => 20 <= rating && rating < 30).length;
  const three = rated.filter((rating) => 30 <= rating && rating < 40).length;
  const four = rated.filter((rating) => 40 <= rating && rating < 50).length;
  const five = rated.filter((rating) => 50 <= rating && rating < 60).length;
  const six = rated.filter((rating) => 60 <= rating && rating < 70).length;
  const seven = rated.filter((rating) => 70 <= rating && rating < 80).length;
  const eight = rated.filter((rating) => 80 <= rating && rating < 90).length;
  const nine = rated.filter((rating) => 90 <= rating && rating < 100).length;
  const ten = rated.filter((rating) => rating === 100).length;
  return [zero, one, two, three, four, five, six, seven, eight, nine, ten];
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
];

export const RatingChart = (props: Props) => {
  const { watchProgress } = props;
  const processed = breakdownRatings(watchProgress);

  const data = {
    datasets: [
      {
        barPercentage: 0.85,
        data: [
          processed[10],
          processed[9],
          processed[8],
          processed[7],
          processed[6],
          processed[5],
          processed[4],
          processed[3],
          processed[2],
          processed[1],
          processed[0],
        ],
        borderWidth: 1,
        backgroundColor: barColor.map((color) => alpha(color, 0.8)),
        borderColor: barColor.map((color) => darken(color, 0.2)),
        hoverBackgroundColor: barColor.map((color) => alpha(color, 0.5)),
        hoverBorderColor: barColor.map((color) => darken(color, 0.2)),
      },
    ],
    labels: [
      '100',
      '90-99',
      '80-89',
      '70-79',
      '60-69',
      '50-59',
      '40-49',
      '30-39',
      '20-29',
      '10-19',
      '0-9',
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    indexAxis: 'y',
    scales: {
      x: {
        ticks: {
          beginAtZero: true,
          precision: 0,
        },
      },
    },
  };
  return (
    <div>
      <Bar type="bar" data={data} options={options} />
    </div>
  );
};
