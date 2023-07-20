// Essentials
import React from 'react';
import { useParams } from 'react-router-dom';


// Components
import RequestListPage from './list/RequestListPage';
import RequestListForKeeper from './list/RequestListForKeeperPage';
import RequestDetailsPage from './details/RequestDetailsPage';
import { useSelector } from 'react-redux';

const RequestPage = () => {
  const { from, id } = useParams();
  const userInfo = useSelector(state => state.authenticationReducer.user);

  return (
    <>
      {(!from || !id) ?
          (userInfo.user_type === 'director') ?
            <RequestListPage /> :
            <RequestListForKeeper />
        :
        <RequestDetailsPage />
      }
    </>
  );
};

export default RequestPage;
