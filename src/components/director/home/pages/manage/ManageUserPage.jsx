// Essentials
import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';

// Components
import ListTitle from 'components/common/ListTitle';
import ChipList from 'components/common/chip/ChipList';

const ManageUserPage = () => {// Chip List
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

  return (
    <>
      <div>
        <Container>
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
        </Container>
      </div>
    </>
  );
};

export default ManageUserPage;
