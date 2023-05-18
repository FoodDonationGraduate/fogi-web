// Essentials
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

// Components
import ListTitle from './components/ListTitle';
import OrderList from './components/OrderList';
import ChipList from 'components/common/chip/ChipList';

const OrderListPage = () => {
  // Chip List
  const [activeStatusIdx, setActiveStatusIdx] = useState(0);
  const statusList = ['pending', 'shipping', 'success', 'canceled'];
  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'Chờ duyệt';
      case 'shipping':
        return 'Đang giao';
      case 'canceled':
        return 'Đã hủy';
      default:
        return 'Thành công';
    }
  };
  return (
    <>
      <div>
        <ListTitle />
        <div className='my-4'>
          <Container>
            <ChipList
              activeStatusIdx={activeStatusIdx}
              setActiveStatusIdx={setActiveStatusIdx}
              statusList={statusList}
              getStatusLabel={getStatusLabel}
            />
          </Container>
        </div>
        <div className='pb-4'>
          <OrderList currentStatus={statusList[activeStatusIdx]} />
        </div>
      </div>
    </>
  );
};

export default OrderListPage;
