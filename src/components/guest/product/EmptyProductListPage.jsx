// Essentials
import * as React from 'react';

// Components
import TopSection from 'components/layout/TopSection';
import Footer from 'components/layout/Footer';
import ListTitle from './components/ListTitle';
import EmptyProductBody from './components/EmptyProductBody'
import InfoModal from 'components/layout/InfoModal';

// Styling
import 'assets/css/Fogi.css';

const EmptyProductListPage = () => {
  return (
    <>
      <div>
        <TopSection />
      </div>
      <div className='bg pb-4'>
        <ListTitle title='<Search result here>'/>
        <EmptyProductBody/>
      </div>
      <div>
        <Footer />
        <InfoModal />
      </div>
    </>
  );
};

export default EmptyProductListPage;
