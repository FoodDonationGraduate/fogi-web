// Essentials
import React from 'react';

// Components
import TopSection from 'components/layout/TopSection';
import Footer from 'components/layout/Footer';
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
        <TopSection />
      </div>
      <div className='bg pt-4'>
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