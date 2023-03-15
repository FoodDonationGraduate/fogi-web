// Essentials
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { useParams } from 'react-router-dom'

// Components
import TopBar from 'components/layout/TopBar';
import LocationBar from 'components/guest/common/bars/LocationBar';
import Footer from 'components/guest/common/bars/Footer';
import ProductSection from './components/ProductSection';
import DonorSection from './components/DonorSection';
import { retrieveCurrentProduct } from 'components/redux/reducer/ProductReducer';

// Styling
import 'assets/css/Fogi.css';

// const exampleProduct = {
//   title: "Salad",
//   price: 10000,
//   donorName: 'AP Store',
//   donorLogo: DonorLogo,
//   images: [exampleImage, exampleImage, exampleImage]
// }

const ProductDetailsPage = () => {
  const product = useSelector(state => state.productReducer.currentProduct);
  const { id } = useParams();
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(retrieveCurrentProduct({id: id}, navigate))
  }, [id])
  console.log(product)
  return (
    <>
      <div>
        <TopBar />
        <LocationBar />
      </div>
      {Object.keys(product).length !== 0 && 
        <div className='bg'>
          <ProductSection product={product.product} />
          <DonorSection donor={product.product.donor} />
      </div>
      }
      <div>
        <Footer />
      </div>
    </>
  );
};

export default ProductDetailsPage;
