// Essentials
import React from 'react';

// Components
import TopSection from 'components/layout/TopSection';
import Footer from 'components/layout/Footer';
import CategoryProductList from './components/CategoryProductList';
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
            <CategoryProductList />
            <div>
                <Footer />
                <InfoModal />
                <ConfirmModal />
            </div>
        </>
    );
};

export default ProductListPage;
