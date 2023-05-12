// Essentials
import React from 'react';

// Components
import TopSection from 'components/layout/TopSection';
import Footer from 'components/layout/Footer';
import OrderListTitle from './components/OrderListTitle';
import OrderList from './components/OrderList';

// Style
import 'assets/css/user/order/Order.css';

const OrderListPage = () => {

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
          <OrderList />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default OrderListPage;