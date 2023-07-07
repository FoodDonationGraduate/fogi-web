// Essentials
import React from 'react';
import { useSelector } from 'react-redux';


// Components
import RequestListPage from './list/RequestListPage';
import RequestDetailsPage from './details/RequestDetailsPage';

const RequestPage = () => {
  const currentRequest = useSelector(state => state.directorReducer.currentRequest);

  return (
    <>
      {!currentRequest ?
        <RequestListPage />
        :
        <RequestDetailsPage
          request={currentRequest}
        />
      }
    </>
  );
};

export default RequestPage;
