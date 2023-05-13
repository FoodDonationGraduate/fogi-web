// Essentials
import React from 'react';

// Components
import TopBarDonor from 'components/layout/TopBarOther';
import Footer from 'components/layout/Footer';
import OrderDetailsTitle from './components/OrderDetailsTitle';
import OrderInfoCard from './components/OrderInfoCard';
import ProductList from './components/ProductList';

// Style
import 'assets/css/user/order/Order.css';

// Data
import { ORDER_DATA } from 'utils/constants/Order.jsx';

const OrderDetailsPage = () => {

  return (
    <>
      <div>
        <TopBarDonor />
      </div>
      <div className='bg'>
        <div className='mb-4'>
          <OrderDetailsTitle id={ORDER_DATA[0].id} />
        </div>
        <div className='pb-4'>
          <OrderInfoCard order={ORDER_DATA[0]} />
        </div>
        <div className='pb-4'>
          <ProductList />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default OrderDetailsPage;