// Essentials
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom'

// Components
import TopSection from 'components/layout/TopSection';
import Footer from 'components/layout/Footer';
import ProductSection from './components/ProductSection';
import { retrieveCurrentProduct } from 'components/redux/reducer/ProductReducer';
import EmptyProductBody from './components/EmptyProductBody';
import ProductSimilar from './components/ProductSimilar';
import InfoModal from 'components/layout/InfoModal';

// Styling
import 'assets/css/Fogi.css';

const ProductDetailsPage = () => {
  const product = useSelector(state => state.productReducer.currentProduct);
  const { id } = useParams();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(retrieveCurrentProduct({id: id}, navigate))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <>
      <div>
        <TopSection />
      </div>
        {(Object.keys(product).length !== 0 && Object.keys(product.product).length !== 0) &&
          <div className='bg'>
            <ProductSection product={product.product} />
            <ProductSimilar product={product.product} />
          </div>
        }
        {Object.keys(product).length === 0 && 
          <EmptyProductBody/>
        }
      <div>
        <Footer />
        <InfoModal />
      </div>
    </>
  );
};

export default ProductDetailsPage;
