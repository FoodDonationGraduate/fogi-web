// Essentials
import * as React from 'react';

// Components
import TopSection from 'components/layout/TopSection';
import Modal from 'components/layout/InfoModal'
import Footer from 'components/layout/Footer';
import AdBanner from './components/AdBanner';
import CategorySection from './components/CategorySection';
import ProductSection from './components/ProductSection';

// Styling
import 'assets/css/Fogi.css';

const ProductListPage = () => {
  return (
    <>
      <div>
        <TopSection />
      </div>
      <div className='bg py-4'>
        <AdBanner />
        <CategorySection />
        <ProductSection type={0} />
        <ProductSection type={1} />
      </div>
      <div>
        <Footer />
        <Modal />
      </div>
    </>
  );
};

export default ProductListPage;
