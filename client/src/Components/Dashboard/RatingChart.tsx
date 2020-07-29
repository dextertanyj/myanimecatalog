import { fade } from '@material-ui/core';
import {
  blueGrey,
  brown,
  green,
  grey,
  indigo,
  lightBlue,
  lime,
  purple,
  red,
  teal,
} from '@material-ui/core/colors';
import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
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

const borderColor = [
  teal[600],
  green[600],
  lime[600],
  lightBlue[600],
  indigo[600],
  purple[600],
  red[600],
  brown[600],
  blueGrey[600],
  grey[600],
];

const backgroundColor = [
  teal[600],
  green[600],
  lime[600],
  lightBlue[600],
  indigo[600],
  purple[600],
  red[600],
  brown[600],
  blueGrey[600],
  grey[600],
];

const hoverBackgroundColor = [
  teal[400],
  green[400],
  lime[400],
  lightBlue[400],
  indigo[400],
  purple[400],
  red[400],
  brown[400],
  blueGrey[400],
  grey[400],
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
        backgroundColor: backgroundColor.map((color) => fade(color, 0.6)),
        borderColor: borderColor,
        hoverBackgroundColor: hoverBackgroundColor.map((color) =>
          fade(color, 0.6)
        ),
        hoverBorderColor: borderColor,
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
    legend: false,
    scales: {
      xAxes: [
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
    <div>
      <HorizontalBar data={data} options={options} />
    </div>
  );
};
