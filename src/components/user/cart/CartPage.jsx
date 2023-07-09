// Essentials
import React, { useState } from 'react';

// Components
import TopSection from 'components/layout/TopSection';
import Footer from 'components/layout/Footer';
import CartTitle from './components/CartTitle';
import ProductList from './components/ProductList';
import Modal from "components/layout/InfoModal.jsx";
import ConfirmModal from "components/layout/ConfirmModal.jsx";

// Style
import 'assets/css/user/cart/Cart.css';

const CartPage = () => {
  // Error handling
  const [isError, setIsError] = useState(false);

  return (
    <>
      <div>
        <TopSection />
      </div>
      <div className='bg'  style={{minHeight: '600px'}}>
        <div className='mb-4'>
          <CartTitle isError={isError} />
        </div>
        <div className='pb-4'>
          <ProductList setIsError={setIsError} />
        </div>
      </div>
      <div>
        <Footer />
        <Modal />
        <ConfirmModal />
      </div>
    </>
  );
};

export default CartPage;