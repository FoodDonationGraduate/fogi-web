// Essentials
import * as React from 'react';
import { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';

const ProductImage = ({product}) => {
  
  return (
    <>
      <Carousel>
        {product.images.map((image) => (
          <Carousel.Item>
            <img
              className='d-block w-100'
              src={`https://bachkhoi.online/static/product/${image}`} />
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  )
};

export default ProductImage;
