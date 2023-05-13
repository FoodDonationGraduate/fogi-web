// Essentials
import * as React from 'react';

// Components
import TopSection from 'components/layout/TopSection';
import Footer from 'components/layout/Footer';
import ListTitle from './components/ListTitle';
import NewProductList from './components/NewProductList';

// Styling
import 'assets/css/Fogi.css';

const ProductListPage = () => {
  return (
    <>
      <div>
        <TopSection />
      </div>
      <div className='bg'>
        <ListTitle title='Món ăn mới'/>
        <NewProductList />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default ProductListPage;
