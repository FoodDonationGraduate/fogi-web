// Essentials
import * as React from 'react';
import { useParams } from 'react-router-dom'

// Components
import TopSection from 'components/layout/TopSection';
import Footer from 'components/layout/Footer';
import ListTitle from './components/ListTitle';
import CategoryProductList from './components/CategoryProductList';
import InfoModal from 'components/layout/InfoModal';

// Styling
import 'assets/css/Fogi.css';
import ConfirmModal from 'components/layout/ConfirmModal';

const ProductListPage = () => {
    const { name } = useParams()
    return (
        <>
        <div>
            <TopSection />
        </div>
        <div className='bg'>
            <ListTitle title={name}/>
            <CategoryProductList />
        </div>
        <div>
            <Footer />
            <InfoModal />
            <ConfirmModal />
        </div>
        </>
    );
};

export default ProductListPage;
