// Essentials
import React from 'react';

// Components
import TopSection from 'components/layout/TopSection';
import Footer from 'components/guest/common/bars/Footer';
import CartTitle from './components/CartTitle';
import CartInfoCard from './components/CartInfoCard';
import ProductList from './components/ProductList';
import Modal from "components/layout/InfoModal.jsx";
import ConfirmModal from "components/layout/ConfirmModal.jsx";
// Style
import 'assets/css/user/cart/Cart.css';

// Data
import { ORDER_DATA } from 'utils/constants/Order.jsx';

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
        {/* <div className='pb-4'>
          <CartInfoCard order={ORDER_DATA[0]} />
        </div> */}
        <div className='pb-4'>
          <ProductList />
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