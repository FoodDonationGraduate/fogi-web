// Essentials
import * as React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { EqualHeightElement } from 'react-equal-height';

// Styling
import './Card.css';

const CategoryCard = ({category}) => {
  const navigate = useNavigate();
  return (
    <Card className='category-card' onClick={() => navigate(`/category/${category.name}`)}>
      <Card.Img className='category-logo mx-auto' src={`https://bachkhoi.online/static/${category.image}`}/>
      <Card.Body className='text-center'>
        <EqualHeightElement name="category-name">
          <Card.Title >{category.name}</Card.Title>
        </EqualHeightElement>
      </Card.Body>
    </Card>
  );
};

export default CategoryCard;
