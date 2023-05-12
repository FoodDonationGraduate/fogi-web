// Essentials
import React, { useState } from 'react';

// Components
import TopSection from 'components/layout/TopSection';
import Footer from 'components/layout/Footer';
import CartTitle from './components/CartTitle';
import ProductList from './components/ProductList';
import Modal from "components/layout/InfoModal.jsx";
import ConfirmModal from "components/layout/ConfirmModal.jsx";
import CreateRequestModal from './components/CreateRequestModal';

// Style
import 'assets/css/user/cart/Cart.css';

const CartPage = () => {
  // Create Request Modal
  const [show, setShow] = useState(false);
  const onClose = () => setShow(false);
  const onShow = () => setShow(true);

  return (
    <>
      <CreateRequestModal show={show} onClose={onClose} />

      <div>
        <TopSection />
      </div>
      <div className='bg'>
        <div className='mb-4'>
          <CartTitle onShow={onShow} />
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