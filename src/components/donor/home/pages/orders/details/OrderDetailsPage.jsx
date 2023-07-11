// Essentials
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom';

// Components
import TopBarDonor from 'components/layout/TopBarOther';
import Footer from 'components/layout/Footer';
import OrderInfoCard from './components/OrderInfoCard';
import ProductList from './components/ProductList';
import { retrieveRequest } from 'components/redux/reducer/RequestReducer';
import NotFoundBody from 'components/common/PageNotFoundBody';
import InfoModal from 'components/layout/InfoModal';
import ConfirmModal from 'components/layout/ConfirmModal';

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <>
      <div>
        <TopBarDonor />
      </div>
      {Object.keys(currentRequest).length !== 0 && 
        <div className='bg'>
          <div className='py-4'>
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
        <InfoModal />
        <ConfirmModal />
      </div>
    </>
  );
};

export default OrderDetailsPage;