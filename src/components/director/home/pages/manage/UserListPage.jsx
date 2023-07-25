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
  const dispatch = useDispatch(); const navigate = useNavigate();

  // Chip List - for Filter
  const [activeFromIdx, setActiveFromIdx] = useState(0);
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
  }, [activeFromIdx]);

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
      user_type: from,
      name_query: name ? name : '',
      email_query: email ? email : '',
      num_give_request_filter: JSON.stringify(numGiveRequest),
      num_take_request_filter: JSON.stringify(numTakeRequest),
      sum_kg_filter: JSON.stringify(sumKg),
      sum_item_filter: JSON.stringify(sumItem),
      being_reported_filter: JSON.stringify(numReport),
      // status_filter: status.value,
      // sorts: JSON.stringify(sortFields)
    };
    if (from === 'donor') { delete data.num_take_request_filter} else if (from === 'donee') {delete data.num_give_request_filter;}
    dispatch(retrieveAllUsers(
      data,
      { userInfo, userToken },
      navigate
    ));
  }, [name, email, from, numGiveRequest, numTakeRequest, sumKg, sumItem, numReport, sortFields, page
  ]);
  console.log(from)
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
        itemList={from === 'volunteer' ? allVolunteers.users : allUsers.users} total={allUsers.num_of_users}
        sortFields={sortFields} setSortFields={setSortFields}
        type='user'
      />
    </>
  );
};

export default RequestListPage;