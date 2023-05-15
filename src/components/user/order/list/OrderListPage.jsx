// Essentials
import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

// Components
import TopSection from 'components/layout/TopSection';
import Footer from 'components/layout/Footer';
import OrderListTitle from './components/OrderListTitle';
import OrderList from './components/OrderList';

// Style
import 'assets/css/user/order/Order.css';

const OrderListPage = () => {
  // Chip List
  const [activeStatusIdx, setActiveStatusIdx] = useState(-1);
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
        <TopSection />
      </div>
      <div className='bg'>
        <div className='mb-4'>
          <OrderListTitle />
        </div>
        <div className='pb-4'>
          <OrderList
            activeStatusIdx={activeStatusIdx}
            setActiveStatusIdx={setActiveStatusIdx}
            statusList={statusList}
            getStatusLabel={getStatusLabel}
          />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default OrderListPage;