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
  const [from, setFrom] = useState(['donor', '']);
  const [status, setStatus] = useState({ value: '', label: 'Tất cả' });
  const [numProduct, setNumProduct] = useState([]);
  const [sumKg, setSumKg] = useState([]);
  const [sumItem, setSumItem] = useState([]);
  const [distance, setDistance] = useState([]);
  const [director, setDirector] = useState(null);
  const [warehouseKeeper, setWarehouseKeeper] = useState(null);
  const [volunteer, setVolunteer] = useState(null);
  const [createdTime, setCreatedTime] = useState({ min: '', max: '' });
  const [updatedTime, setUpdatedTime] = useState({ min: '', max: '' });

  // Sort Field
  const [sortField, setSortField] = useState('created_time');

  // Filters reset
  useEffect(() => {
    setUser(null);
    setRequestId('');
    setStatus({ value: '', label: 'Tất cả' });
    setNumProduct([]);
    setSumKg([]);
    setSumItem([]);
    setDistance([]);
    setDirector(null);
    setWarehouseKeeper(null);
    setVolunteer(null);
    setCreatedTime({ min: '', max: '' });
    setUpdatedTime({ min: '', max: '' });
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
      user_email: user ? user.email : '',
      num_product_filter: JSON.stringify(numProduct),
      sum_kg_filter: JSON.stringify(sumKg),
      sum_item_filter: JSON.stringify(sumItem),
      distance_filter: JSON.stringify(distance),
      director_email: director ? director.email : '',
      keeper_email: warehouseKeeper ? warehouseKeeper.email : '',
      volunteer_email: volunteer ? volunteer.email : '',
      min_created_time: createdTime.min,
      max_created_time: createdTime.max,
      min_updated_time: updatedTime.min,
      max_updated_time: updatedTime.max
    };

    dispatch(retrieveAllRequests(
      data,
      { userInfo, userToken },
      navigate
    ));
  }, [user, requestId, from, status, numProduct, sumKg, sumItem, distance,
    director, warehouseKeeper, volunteer, createdTime, updatedTime
  ]);

  return (
    <>
      <Table
        headerList={from[0] === 'donee' ? RequestHeaders.takeHeaders : RequestHeaders.giveHeaders}
        filterList={[
          { state: user, setState: setUser },
          { state: requestId, setState: setRequestId },
          { state: from, setState: setFrom },
          { state: status, setState: setStatus },
          { state: numProduct, setState: setNumProduct },
          { state: sumKg, setState: setSumKg },
          { state: sumItem, setState: setSumItem },
          { state: director, setState: setDirector },
          { state: warehouseKeeper, setState: setWarehouseKeeper },
          { state: volunteer, setState: setVolunteer },
          { state: createdTime, setState: setCreatedTime },
          { state: updatedTime, setState: setUpdatedTime },
          { state: distance, setState: setDistance }
        ]}
        itemList={allRequests.requests}
        sortField={sortField} setSortField={setSortField}
        type='request'
      />
    </>
  );
};

export default RequestListPage;