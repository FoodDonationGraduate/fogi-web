// Essentials
import React from 'react';
import { useParams } from 'react-router-dom';


// Components
import RequestListPage from './list/RequestListPage';
import RequestDetailsPage from './details/RequestDetailsPage';

const RequestPage = () => {
  const { from, id } = useParams();

  return (
    <>
      {(!from || !id) ?
        <RequestListPage />
        :
        <RequestDetailsPage />
      }
    </>
  );
};

export default RequestPage;
