// Essentials
import * as React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { EqualHeightElement } from 'react-equal-height';

// Styling
import 'assets/css/common/Card.css';

const CategoryCard = ({
  category,
  isDonee=true,
  setTargetCategory=null, // for Edit Category Modal
  onShow=undefined
}) => {
  const navigate = useNavigate();

  const toCategoryPage = () => { // for Donee
    navigate(`/category/${category.name}`);
  };

  const editCategory = () => { // for Director
    if (!setTargetCategory) return;
    setTargetCategory(category);
    onShow();
  };

  return (
    <Card className='category-card' onClick={isDonee ? toCategoryPage : editCategory}>
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