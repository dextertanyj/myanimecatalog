import React from 'react';
import { useParams } from 'react-router-dom';
import { SeriesInfoTable } from '../../Components/SeriesInfoTable';
import { withAuth } from '../../HOC/withAuth';

const SeriesPage = () => {
  const { seriesId } = useParams();

  return (
    <div>
      <SeriesInfoTable seriesId={seriesId} key={seriesId} />
    </div>
  );
};

export default (props: any, key: any) => withAuth()(SeriesPage)(props);
