// Essentials
import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

// Components
import ListTitle from 'components/common/ListTitle';
import ManageItemList from './components/ManageItemList';
import ManageDetails from './components/ManageDetails';
import ChipList from 'components/common/chip/ChipList';

// Redux
import { setTypeOfUser } from 'components/redux/reducer/DirectorReducer';

const ManageUserPage = () => {
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

  // Details
  const [targetUser, setTargetUser] = useState(null);

  return (
    <>
      <div>
        <Container>
          {!targetUser && 
            <>
              <ListTitle title={'Quản lý Người dùng'} />
              <Row className='my-4'>
                <ChipList
                  activeStatusIdx={activeStatusIdx}
                  setActiveStatusIdx={setActiveStatusIdx}
                  statusList={statusList}
                  getStatusLabel={getStatusLabel}
                  styleList={styleList}
                />
              </Row>
              <ManageItemList setTargetUser={setTargetUser} />
            </>
          }
          {targetUser &&
            <ManageDetails user={targetUser} />
          }
          
        </Container>
      </div>
    </>
  );
};

export default ManageUserPage;