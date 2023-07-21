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
  const [user, setUser] = useState(null); // User type
  const [requestId, setRequestId] = useState(''); // Request ID
  const [from, setFrom] = useState(['donor', '']);
  const [status, setStatus] = useState({ value: '', label: 'Tất cả' });

  // Filters reset
  useEffect(() => {
    setUser(null);
    setRequestId('');
    setStatus({ value: '', label: 'Tất cả' });
  }, [from]);

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
      request_from: from[0],
      request_status: status.value,
      sort_field: 'created_time',
      sort_by: 'desc',
      id_query: requestId,
      delivery_type: from[1],
      user_email: user ? user.email : ''
    };

    dispatch(retrieveAllRequests(
      data,
      { userInfo, userToken },
      navigate
    ));
  }, [user, requestId, from, status]);

  return (
    <>
      <Table
        headerList={from[0] === 'donee' ? RequestHeaders.takeHeaders : RequestHeaders.giveHeaders}
        filterList={[
          { state: user, setState: setUser },
          { state: requestId, setState: setRequestId },
          { state: from, setState: setFrom },
          { state: status, setState: setStatus }
        ]}
        itemList={allRequests.requests}
        type='request'
      />
    </>
  );
};

export default RequestListPage;