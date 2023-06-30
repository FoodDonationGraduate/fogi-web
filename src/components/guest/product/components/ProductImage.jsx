// Essentials
import * as React from 'react';
import { Carousel } from 'react-bootstrap';

const ProductImage = ({product}) => {
  
  return (
    <>
      <Carousel>
        {product.images.map((image, idx) => (
          <Carousel.Item key={idx}>
            <img
              className='d-block w-100 rounded'
              src={`https://bachkhoi.online/static/${image}`} 
              alt='product img'
              style={{aspectRatio: '1/1', height: '30%'}}
/>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  )
};

export default ProductImage;
