// Essentials
import * as React from 'react';

// Components
import TopBar from 'components/layout/TopBar';
import LocationBar from 'components/guest/common/bars/LocationBar';
import Footer from 'components/guest/common/bars/Footer';
import AdBanner from './components/AdBanner';
import CategorySection from './components/CategorySection';
import ProductSection from './components/ProductSection';
import DonorSection from './components/DonorSection';

// Styling
import 'assets/css/Fogi.css';

const ProductListPage = () => {
  return (
    <>
      <div>
        <TopBar />
        <LocationBar />
      </div>
      <div className='bg py-4'>
        <AdBanner />
        <CategorySection />
        <ProductSection />
        <DonorSection />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default ProductListPage;
