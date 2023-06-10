// Essentials
import * as React from 'react';
import { useParams } from 'react-router-dom'

// Components
import TopSection from 'components/layout/TopSection';
import Footer from 'components/layout/Footer';
import ListTitle from './components/ListTitle';
import VolunteerProductList from './components/VolunteerProductList';
import InfoModal from 'components/layout/InfoModal';

// Styling
import 'assets/css/Fogi.css';

const ProductListPage = () => {
    const { name } = useParams()
    return (
        <>
        <div>
            <TopSection />
        </div>
        <div className='bg'>
            <VolunteerProductList />
        </div>
        <div>
            <Footer />
            <InfoModal />
        </div>
        </>
    );
};

export default ProductListPage;
