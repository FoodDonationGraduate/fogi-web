// Essentials
import * as React from 'react';

// Components
import TopBar from 'components/guest/common/bars/TopBar';
import LocationBar from 'components/guest/common/bars/LocationBar';
import Footer from 'components/guest/common/bars/Footer';
import ProductSection from './components/ProductSection';
import DonorSection from './components/DonorSection';

// Styling
import 'assets/css/Fogi.css';

import exampleImage from 'assets/images/ProductImage.jpg'
import DonorLogo from 'assets/images/DonorLogo.jpg'
const exampleProduct = {
  title: "Salad",
  price: 10000,
  donorName: 'AP Store',
  donorLogo: DonorLogo,
  images: [exampleImage, exampleImage, exampleImage]
}

const ProductDetailsPage = () => {
  return (
    <>
      <div>
        <TopBar />
        <LocationBar />
      </div>
      <div className='bg'>
        <ProductSection product={exampleProduct} />
        <DonorSection product={exampleProduct} />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default ProductDetailsPage;
