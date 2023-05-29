// Essentials
import * as React from 'react';

// Components
import TopSection from 'components/layout/TopSection';
import Footer from 'components/layout/Footer';
import ListTitle from './components/ListTitle';
import AmootProductList from './components/AmootProductList';
import InfoModal from 'components/layout/InfoModal';

// Styling
import 'assets/css/Fogi.css';

const ProductListPage = () => {
  return (
    <>
      <div>
        <TopSection />
      </div>
      <div className='bg'>
        <ListTitle title='Thực phẩm sắp hết hàng'/>
        <AmootProductList />
      </div>
      <div>
        <Footer />
        <InfoModal />
      </div>
    </>
  );
};

export default ProductListPage;
