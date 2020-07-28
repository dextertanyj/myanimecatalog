import {
  blue,
  blueGrey,
  green,
  grey,
  lime,
  red,
} from '@material-ui/core/colors';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { UserProgress, WatchStatus } from '../../gql/documents';

type Props = {
  watchProgress: UserProgress[];
};

const breakdownWatchProgress = (allProgress: UserProgress[]) => {
  const completed = allProgress.filter(
    (progress) => progress.status === WatchStatus.Completed
  ).length;
  const watching = allProgress.filter(
    (progress) => progress.status === WatchStatus.Watching
  ).length;
  const onHold = allProgress.filter(
    (progress) => progress.status === WatchStatus.Onhold
  ).length;
  const dropped = allProgress.filter(
    (progress) => progress.status === WatchStatus.Dropped
  ).length;
  const pending = allProgress.filter(
    (progress) => progress.status === WatchStatus.Pending
  ).length;

  return {
    completed,
    watching,
    onHold,
    dropped,
    pending,
  };
};

export const OverviewDoughnut = (props: Props) => {
  const { watchProgress } = props;
  const processed = breakdownWatchProgress(watchProgress);
  const data = {
    datasets: [
      {
        data: [
          processed.completed,
          processed.watching,
          processed.onHold,
          processed.pending,
          processed.dropped,
          10,
        ],
        backgroundColor: [
          blue[500],
          green[500],
          lime[500],
          blueGrey[500],
          red[500],
          grey[500],
        ],
        hoverBackgroundColor: [
          blue[300],
          green[300],
          lime[300],
          blueGrey[300],
          red[300],
          grey[300],
        ],
      },
    ],
    labels: [
      'Completed',
      'Watching',
      'On Hold',
      'Plan To Watch',
      'Dropped',
      'No Status',
    ],
  };
  const options = {
    legend: {
      position: 'bottom',
      labels: {
        boxWidth: 30,
        fontSize: 14,
      },
    },
  };
  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};
