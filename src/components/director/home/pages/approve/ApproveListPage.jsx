// Essentials
import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

// Components
import ListTitle from './components/ListTitle';
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
  }, [activeStatusIdx]);

  return (
    <>
      <div>
        <ListTitle />
        <div className='my-4'>
          <Container>
            <Row>
              <ChipList
                activeStatusIdx={activeStatusIdx}
                setActiveStatusIdx={setActiveStatusIdx}
                statusList={statusList}
                getStatusLabel={getStatusLabel}
                styleList={styleList}
              />
            </Row>
          </Container>
        </div>
        <ApproveList />
      </div>
    </>
  );
};

export default ApproveListPage;
