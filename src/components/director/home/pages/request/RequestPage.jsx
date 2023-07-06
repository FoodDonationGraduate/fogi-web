// Essentials
import React, { useState } from 'react';

// Components
import RequestListPage from './list/RequestListPage';
import RequestDetailsPage from './details/RequestDetailsPage';

const RequestPage = () => {

  const [targetRequest, setTargetRequest] = useState(null);

  return (
    <>
      {!targetRequest ?
        <RequestListPage
          setTargetRequest={setTargetRequest}
        />
        :
        <RequestDetailsPage request={targetRequest} />
      }
    </>
  );
};

export default RequestPage;
