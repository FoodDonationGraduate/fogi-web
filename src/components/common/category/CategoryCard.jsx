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
  isDonee=true,
  setTargetCategory=null, // for Edit Category Modal
}) => {
  const navigate = useNavigate();

  const toCategoryPage = () => { // for Donee
    navigate(`/category/${category.name}`);
  };

  const editCategory = () => { // for Director
    if (!setTargetCategory) return;
    setTargetCategory(category);
  };

  return (
    <Card className='category-card' onClick={isDonee ? toCategoryPage : editCategory}>
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
