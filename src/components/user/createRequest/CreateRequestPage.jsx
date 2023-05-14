// Essentials
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom'

// Components
import TopSection from 'components/layout/TopSection';
import Footer from 'components/layout/Footer';
import RequestInfoCard from './components/RequestInfoCard';
import ProductList from './components/ProductList';

// Style
import 'assets/css/user/order/Order.css';

const CreateRequestPage = () => {
  const currentRequest = useSelector(state => state.requestReducer.currentRequest);
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);

  return (
    <>
      <div>
        <TopSection />
      </div>
      <div className='bg pt-4'>
        <div className='pb-4'>
          <RequestInfoCard />
        </div>
        <div className='pb-4'>
          <ProductList />
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default CreateRequestPage;