// Essentials
import * as React from 'react';

// Components
import TopSection from 'components/layout/TopSection';
import Footer from 'components/guest/common/bars/Footer';
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
        <ListTitle title='Almost Out Of Stock Product List'/>
        <AmootProductList />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default ProductListPage;
