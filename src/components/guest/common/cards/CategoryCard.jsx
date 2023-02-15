// Essentials
import * as React from 'react';
import { Card } from 'react-bootstrap';

// Styling
import './Card.css';

const CategoryCard = ({category}) => {
  return (
    <Card>
      <Card.Img className='category-logo mx-auto' src={category.img} />
      <Card.Body className='text-center'>
        <Card.Title className='mt-4'>{category.title}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default CategoryCard;
