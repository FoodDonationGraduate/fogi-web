// Essentials
import * as React from 'react';

// Components
import TopSection from 'components/layout/TopSection';
import Footer from 'components/layout/Footer';
import ListTitle from './components/ListTitle';
import ProductList from './components/ProductList';
import InfoModal from 'components/layout/InfoModal';

// Styling
import 'assets/css/Fogi.css';
import ConfirmModal from 'components/layout/ConfirmModal';

const ProductListPage = () => {
  return (
    <>
      <div>
        <TopSection />
      </div>
      <div className='bg'>
        <ListTitle title='Kết quả tìm kiếm'/>
        <ProductList />
      </div>
      <div>
        <Footer />
        <InfoModal />
        <ConfirmModal />
      </div>
    </>
  );
};

export default ProductListPage;
