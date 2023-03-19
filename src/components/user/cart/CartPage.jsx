// Essentials
import React from 'react';

// Components
import TopSection from 'components/layout/TopSection';
import Footer from 'components/guest/common/bars/Footer';
import CartTitle from './components/CartTitle';
import OrderInfoCard from './components/OrderInfoCard';
import ProductList from './components/ProductList';

// Style
import 'assets/css/user/cart/CartPage.css';

const CartPage = () => {

  return (
    <>
      <div>
        <TopSection />
      </div>
      <div className='bg'>
        <div className='mb-4'>
          <CartTitle />
        </div>
        <div className='pb-4'>
          <OrderInfoCard />
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

export default CartPage;