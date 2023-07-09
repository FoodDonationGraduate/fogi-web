// Essentials
import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';

// Components
import TopSection from 'components/layout/TopSection';
import Footer from 'components/layout/Footer';
import OrderListTitle from './components/OrderListTitle';
import OrderList from './components/OrderList';
import ChipList from 'components/common/chip/ChipList';
import InfoModal from 'components/layout/InfoModal';

// Style
import 'assets/css/user/order/Order.css';

const OrderListPage = () => {
  // Chip List
  const [activeStatusIdx, setActiveStatusIdx] = useState(0);
  const statusList = ['pending', 'finding', 'receiving', 'shipping', 'success', 'canceled'];
  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'Chờ duyệt';
      case 'finding':
        return 'Đang tìm';
      case 'receiving':
        return 'Đang nhận';
      case 'shipping':
        return 'Đang giao';
      case 'canceled':
        return 'Đã hủy';
      default:
        return 'Thành công';
    }
  };
  const styleList = ['neutral', 'info', 'warning', 'warning', 'success', 'danger'];

  return (
    <>
      <div>
        <TopSection />
      </div>
      <div className='bg'>
        <div className='mb-4'>
          <OrderListTitle />
        </div>
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
        <div className='pb-4'>
          <OrderList currentStatus={statusList[activeStatusIdx]} />
        </div>
      </div>
      <div>
        <Footer />
        <InfoModal />
      </div>
    </>
  );
};

export default OrderListPage;