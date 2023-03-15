// Essentials
import * as React from 'react';
import { useParams } from 'react-router-dom'

// Components
import TopBar from 'components/layout/TopBar';
import LocationBar from 'components/guest/common/bars/LocationBar';
import Footer from 'components/guest/common/bars/Footer';
import ListTitle from './components/ListTitle';
import CategoryProductList from './components/CategoryProductList';

// Styling
import 'assets/css/Fogi.css';

const ProductListPage = () => {
    const { name } = useParams()
    return (
        <>
        <div>
            <TopBar />
            <LocationBar />
        </div>
        <div className='bg'>
            <ListTitle title={name}/>
            <CategoryProductList />
        </div>
        <div>
            <Footer />
        </div>
        </>
    );
};

export default ProductListPage;
