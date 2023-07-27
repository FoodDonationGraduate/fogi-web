// Essentials
import React, { useState, useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// Constants
import ChipList from 'components/common/chip/ChipList';
import RequestHeaders from 'utils/constants/headerList/RequestHeaders.json';

// Components
import Table from 'components/common/management/table/Table';
import Title from 'components/common/management/common/Title';

// Reducers
import { retrieveAllRequests } from 'components/redux/reducer/DirectorReducer';

const RequestListPage = () => {
  // Constants
  const allRequests = useSelector(state => state.directorReducer.allRequests);
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const requestAttributes = JSON.parse(localStorage.getItem('requestAttributes'));
  const dispatch = useDispatch(); const navigate = useNavigate();

  // Chip List - for Filter
  const fromList = [['donor', ''], ['donee', 'delivery'], ['donee', 'pickup']];
  const getFromLabel = (from) => {
    switch (from[0]+'-'+from[1]) {
      case 'donor-':
        return 'Cho';
      case 'donee-delivery':
        return 'Nhận (Giao hàng)';
      case 'donee-pickup':
        return 'Nhận (Tại kho)';
      default:
        return 'Cho';
    }
  };
  const fromStyleList = ['success', 'success', 'success'];
  const [activeFromIdx, setActiveFromIdx] = useState((requestAttributes && requestAttributes.status) 
    ? (requestAttributes.status[0] === 'donor' ? 0 : (requestAttributes.status[1] === 'pickup' ? 2 : 1))
    : 0);
  // Filters
  const [from, setFrom] = useState(['donor', '']);
  const [user, setUser] = useState(null);
  const [requestId, setRequestId] = useState('');
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
  const [sortFields, setSortFields] = useState([]);

  // Filters reset
  useEffect(() => {
    setFrom(fromList[activeFromIdx]);
    setSortFields([]);

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
  }, [activeFromIdx]);

  // Pagination handling
  const REQUEST_COUNT = 16; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx

  // Get requests
  useEffect(() => { 
    var data = {
      limit: REQUEST_COUNT,
      offset: page * REQUEST_COUNT,
      request_from: from[0],
      request_status: status.value,
      id_query: requestId,
      delivery_type: from[1],
      user_email: user ? user.email : '',
      num_product_filter: JSON.stringify(numProduct),
      sum_kg_filter: JSON.stringify(sumKg),
      sum_item_filter: JSON.stringify(sumItem),
      distance_filter: JSON.stringify(distance),
      director_email: director ? director.email : '',
      warehouse_keeper_email: warehouseKeeper ? warehouseKeeper.email : '',
      volunteer_email: volunteer ? volunteer.email : '',
      min_created_time: createdTime.min,
      max_created_time: createdTime.max,
      min_updated_time: updatedTime.min,
      max_updated_time: updatedTime.max,
      sorts: JSON.stringify(sortFields)
    };

    dispatch(retrieveAllRequests(
      data,
      { userInfo, userToken },
      navigate
    ));
    localStorage.setItem('requestAttributes', JSON.stringify({
      status: from,
    }));
  }, [page, user, requestId, from, status, numProduct, sumKg, sumItem, distance,
    director, warehouseKeeper, volunteer, createdTime, updatedTime, sortFields
  ]);

  return (
    <>
      <Stack direction='horizontal' gap={2}>
        <Title title='Quản lý Yêu cầu' />
        <ChipList
          activeStatusIdx={activeFromIdx}
          setActiveStatusIdx={setActiveFromIdx}
          statusList={fromList}
          getStatusLabel={getFromLabel}
          styleList={fromStyleList}
        />
      </Stack>
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
        total={allRequests.total} pageCount={REQUEST_COUNT} page={page} setPage={setPage}
        sortFields={sortFields} setSortFields={setSortFields}
        type='request'
      />
    </>
  );
};

export default RequestListPage;