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
import { retrieveAllRequests } from 'components/redux/reducer/DirectorReducer';

const RequestListPage = () => {
  // Constants
  const allRequests = useSelector(state => state.directorReducer.allRequests);
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
  const [numRequest, setNumRequest] = useState([]);
  const [sumKg, setSumKg] = useState([]);
  const [sumItem, setSumItem] = useState([]);
  const [numReport, setNumReport] = useState([]);
  const [status, setStatus] = useState({value: '', label: 'Tất cả'});

  // Sort Field
  const [sortFields, setSortFields] = useState([]);

  // Filters reset
  useEffect(() => {
    setFrom(fromList[activeFromIdx]);
    setSortFields([]);

    setName('')
    setEmail('');
    setNumRequest([]);
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
      user_name: name ? name : '',
      user_email: email ? email : '',
      num_request_filter: JSON.stringify(numRequest),
      sum_kg_filter: JSON.stringify(sumKg),
      sum_item_filter: JSON.stringify(sumItem),
      num_report_filter: JSON.stringify(numReport),
      status_filter: status.value,
      sorts: JSON.stringify(sortFields)
    };

    // dispatch(retrieveAllRequests(
    //   data,
    //   { userInfo, userToken },
    //   navigate
    // ));
  }, [name, email, from, numRequest, sumKg, sumItem, numReport, sortFields, page
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
          { state: numRequest, setState: setNumRequest },
          { state: sumKg, setState: setSumKg },
          { state: sumItem, setState: setSumItem },
          { state: numReport, setState: setNumReport },
          { state: status, setState: setStatus }
        ]}
        itemList={allRequests.requests}
        sortFields={sortFields} setSortFields={setSortFields}
        type='user'
      />
    </>
  );
};

export default RequestListPage;