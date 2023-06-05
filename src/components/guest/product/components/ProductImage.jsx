// Essentials
import * as React from 'react';
import { Carousel } from 'react-bootstrap';

const ProductImage = ({product}) => {
  
  return (
    <>
      <Carousel>
        {product.images.map((image) => (
          <Carousel.Item>
            <img
              className='d-block w-100 rounded'
              src={`https://bachkhoi.online/static/${image}`} 
              alt='product image'
              style={{aspectRatio: '1/1'}}/>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  )
};

export default ProductImage;
