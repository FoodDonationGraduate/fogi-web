// Essentials
import React, { useState, useEffect } from 'react';
import { Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// Constants
import UserHeaders from 'utils/constants/headerList/UserHeaders.json';

// Components
import Table from 'components/common/management/table/Table';
import Title from 'components/common/management/common/Title';
import ChipList from 'components/common/chip/ChipList';

// Reducers
import { retrieveAllUsers } from 'components/redux/reducer/DirectorReducer';

const RequestListPage = () => {
  // Constants
  const allUsers = useSelector(state => state.directorReducer.allUsers);
  const allVolunteers = useSelector(state => state.directorReducer.allVolunteers);
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const usersAttributes = JSON.parse(localStorage.getItem('usersAttributes'));
  const dispatch = useDispatch(); const navigate = useNavigate();

  // Chip List - for Filter
  const fromList = ['donee', 'donor', 'volunteer'];
  const getFromLabel = (from) => {
    switch (from) {
        case 'donee':
        return 'Người nhận';
        case 'donor':
        return 'Người quyên góp';
        default:
        return 'Tình nguyện viên';
    }
  };
  const fromStyleList = ['success', 'success', 'success'];
  const [activeFromIdx, setActiveFromIdx] = useState((usersAttributes && usersAttributes.status) 
  ? (usersAttributes.status === 'donee' ? 0 : (usersAttributes.status === 'donor' ? 1 : 2))
  : 0);
  // Filters
  const [from, setFrom] = useState('donee');
  const [name, setName ] = useState('');
  const [email, setEmail] = useState('');
  const [numGiveRequest, setNumGiveRequest] = useState([]);
  const [numTakeRequest, setNumTakeRequest] = useState([]);
  const [sumKg, setSumKg] = useState([]);
  const [sumItem, setSumItem] = useState([]);
  const [numReport, setNumReport] = useState([]);
  const [status, setStatus] = useState({value: '', label: 'Tất cả'});

  // Sort Field
  const [sortFields, setSortFields] = useState([]);

  // Filters reset
  useEffect(() => {
    console.log(activeFromIdx)
    setFrom(fromList[activeFromIdx]);
    setSortFields([]);

    setName('')
    setEmail('');
    setNumGiveRequest([]);
    setNumTakeRequest([]);
    setSumKg([]);
    setSumItem([]);
    setNumReport([]);
    setStatus({ value: '', label: 'Tất cả' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFromIdx]);

  // Pagination handling
  const REQUEST_COUNT = 16; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx

  // Get requests
  useEffect(() => { 
    var data = {
      limit: REQUEST_COUNT,
      offset: page * REQUEST_COUNT,
      user_type: from,
      name_query: name ? name : '',
      email_query: email ? email : '',
      num_give_request_filter: JSON.stringify(numGiveRequest),
      num_take_request_filter: JSON.stringify(numTakeRequest),
      sum_kg_filter: JSON.stringify(sumKg),
      sum_item_filter: JSON.stringify(sumItem),
      being_reported_filter: JSON.stringify(numReport),
      account_status_filter: JSON.stringify([status.value]),
      sorts: JSON.stringify(sortFields)
    };
    if (from === 'donor') { delete data.num_take_request_filter} else if (from === 'donee') {delete data.num_give_request_filter;}
    dispatch(retrieveAllUsers(
      data,
      { userInfo, userToken },
      navigate
    ));
    localStorage.setItem('usersAttributes', JSON.stringify({
      status: from,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, email, from, numGiveRequest, numTakeRequest, sumKg, sumItem, numReport, sortFields, page, status
  ]);
  return (
    <>
      <Stack direction='horizontal' gap={2}>
        <Title title='Quản lý Người dùng' />
        <ChipList
          activeStatusIdx={activeFromIdx}
          setActiveStatusIdx={setActiveFromIdx}
          statusList={fromList}
          getStatusLabel={getFromLabel}
          styleList={fromStyleList}
        />
      </Stack>
      <Table
        headerList={[UserHeaders.DoneeHeaders, UserHeaders.DonorHeaders, UserHeaders.VolunteerHeaders][activeFromIdx]}
        filterList={[
          { state: from, setState: setFrom },
          { state: name, setState: setName },
          { state: email, setState: setEmail },
          { state: numGiveRequest, setState: setNumGiveRequest },
          { state: numTakeRequest, setState: setNumTakeRequest },
          { state: sumKg, setState: setSumKg },
          { state: sumItem, setState: setSumItem },
          { state: numReport, setState: setNumReport },
          { state: status, setState: setStatus }
        ]}
        itemList={from === 'volunteer' ? allVolunteers.users : allUsers.users} 
        total={allUsers.num_of_users} pageCount={REQUEST_COUNT} page={page} setPage={setPage}
        sortFields={sortFields} setSortFields={setSortFields}
        type='user'
      />
    </>

  );
};

export default RequestListPage;