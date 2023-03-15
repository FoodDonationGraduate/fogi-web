// Essentials
import * as React from 'react';

// Components
import TopBar from 'components/layout/TopBar';
import LocationBar from 'components/guest/common/bars/LocationBar';
import Footer from 'components/guest/common/bars/Footer';
import ListTitle from './components/ListTitle';
import DonorList from './components/DonorList';

// Styling
import 'assets/css/Fogi.css';

const ProductListPage = () => {
  return (
    <>
      <div>
        <TopBar />
        <LocationBar />
      </div>
      <div className='bg'>
        <ListTitle title='Donor List'/>
        <DonorList />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default ProductListPage;
