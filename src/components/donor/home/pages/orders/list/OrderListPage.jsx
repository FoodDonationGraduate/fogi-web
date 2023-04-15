// Essentials
import * as React from 'react';

// Components
import ListTitle from './components/ListTitle';
import OrderList from './components/OrderList';

const OrderListPage = () => {

  return (
    <>
      <div>
        <ListTitle />
        <OrderList />
      </div>
    </>
  );
};

export default OrderListPage;
