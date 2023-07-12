// Essentials
import * as React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { EqualHeightElement } from 'react-equal-height';

// Asset
import PlaceHolder from 'assets/images/placeholder.jpg';

// Styling
import 'assets/css/common/Card.css';

const CategoryCard = ({
  category,
  user_type='donee'
}) => {
  const navigate = useNavigate();

  const toCategoryPage = () => { // for Donee
    navigate(`/category/${category.name}`);
  };

  return (
    <Card className='category-card' onClick={user_type === 'donee' ? toCategoryPage : () => {}}>
      <Card.Img
        className='category-logo mx-auto'
        src={
          category.image ?
          `https://bachkhoi.online/static/${category.image}`
          :
          PlaceHolder
        }
      />
      <Card.Body className='text-center'>
        <EqualHeightElement name="category-name">
          <Card.Title >{category.name}</Card.Title>
        </EqualHeightElement>
      </Card.Body>
    </Card>
  );
};

export default CategoryCard;
