// Essentials
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// Constants
import RequestHeaders from 'utils/constants/headerList/RequestHeaders.json';

// Components
import Table from 'components/common/management/table/Table';

// Reducers
import { retrieveAllRequests } from 'components/redux/reducer/DirectorReducer';

const RequestListPage = () => {
  // Constants
  const allRequests = useSelector(state => state.directorReducer.allRequests);
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const dispatch = useDispatch(); const navigate = useNavigate();

  // Filters
  const [user, setUser] = useState(null);
  const [requestId, setRequestId] = useState('');

  // Pagination handling
  const REQUEST_COUNT = 16; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = (idx) => {
    setPage(idx);
  };

  // Get requests
  useEffect(() => { 
    var data = {
      limit: REQUEST_COUNT,
      offset: page * REQUEST_COUNT,
      request_from: 'donee',
      request_status: '',
      sort_field: 'created_time',
      sort_by: 'desc',
      id_query: requestId,
      delivery_type: '',
      user_email: user ? user.email : ''
    };

    dispatch(retrieveAllRequests(
      data,
      { userInfo, userToken },
      navigate
    ));
  }, [user, requestId]);

  return (
    <>
      <Table
        headerList={RequestHeaders.takeHeaders}
        filterList={[
          { state: user, setState: setUser, userType: 'donee' },
          { state: requestId, setState: setRequestId }
        ]}
        itemList={allRequests.requests}
        type='request'
      />
    </>
  );
};

export default RequestListPage;