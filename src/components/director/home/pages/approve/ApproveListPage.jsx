// Essentials
import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

// Components
import ListTitle from 'components/common/ListTitle';
import ApproveList from './components/ApproveList';
import ChipList from 'components/common/chip/ChipList';

// Redux
import { setTypeOfUser } from 'components/redux/reducer/DirectorReducer';

const ApproveListPage = () => {
  const dispatch = useDispatch();

  // Chip List
  const [activeStatusIdx, setActiveStatusIdx] = useState(0);
  const statusList = ['donee', 'donor', 'volunteer'];
  const getStatusLabel = (status) => {
    switch (status) {
      case 'donee':
        return 'Người nhận';
      case 'donor':
        return 'Người cho';
      default:
        return 'Tình nguyện viên';
    }
  };
  const styleList = ['success', 'success', 'success'];

  useEffect(() => {
    dispatch(setTypeOfUser(statusList[activeStatusIdx]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStatusIdx]);

  return (
    <>
      <div>
        <Container>
          <ListTitle title={'Xét duyệt Người dùng'} />
          <Row className='my-4'>
            <ChipList
              activeStatusIdx={activeStatusIdx}
              setActiveStatusIdx={setActiveStatusIdx}
              statusList={statusList}
              getStatusLabel={getStatusLabel}
              styleList={styleList}
            />
          </Row>
          <ApproveList />
        </Container>
      </div>
    </>
  );
};

export default ApproveListPage;
