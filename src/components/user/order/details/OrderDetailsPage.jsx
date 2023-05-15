// Essentials
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom'

// Components
import TopSection from 'components/layout/TopSection';
import Footer from 'components/layout/Footer';
import OrderInfoCard from './components/OrderInfoCard';
import ProductList from './components/ProductList';
import { retrieveRequest } from 'components/redux/reducer/RequestReducer';
import NotFoundBody from 'components/common/PageNotFoundBody';

// Style
import 'assets/css/user/order/Order.css';

const OrderDetailsPage = () => {
  const currentRequest = useSelector(state => state.requestReducer.currentRequest)
  const userInfo = useSelector(state => state.authenticationReducer.user)
  const userToken = useSelector(state => state.authenticationReducer.token)
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  React.useEffect(()=>{
    dispatch(retrieveRequest({request_id: id}, {userInfo, userToken}, navigate));
  }, [id])
  return (
    <>
      <div>
        <TopSection />
      </div>
      {Object.keys(currentRequest).length !== 0 && 
        <div className='bg pt-4'>
          <div className='pb-4'>
            <OrderInfoCard order={currentRequest.request} />
          </div>
          <div className='pb-4'>
            <ProductList products={currentRequest.request.products}/>
          </div>
      </div>
      }
      {Object.keys(currentRequest).length === 0 && 
        <NotFoundBody/>
      }
      <div>
        <Footer />
      </div>
    </>
  );
};

export default OrderDetailsPage;