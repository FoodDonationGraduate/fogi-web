// Essentials
import * as React from 'react';

// Components
import TopSection from 'components/layout/TopSection';
import Footer from 'components/layout/Footer';
import ListTitle from './components/ListTitle';
import AmootProductList from './components/AmootProductList';

// Styling
import 'assets/css/Fogi.css';

const ProductListPage = () => {
  return (
    <>
      <div>
        <TopSection />
      </div>
      <div className='bg'>
        <ListTitle title='Món ăn sắp hết hàng'/>
        <AmootProductList />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default ProductListPage;
