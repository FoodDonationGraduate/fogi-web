// Essentials
import * as React from 'react';
import { Card } from 'react-bootstrap';
import { EqualHeightElement } from 'react-equal-height';

// Styling
import 'assets/css/common/Card.css';

const SubCategoryCard = ({
  subCategory,
  setTargetSubCategory
}) => {

  const onSelect = () => {
    setTargetSubCategory(subCategory);
  };

  return (
    <Card className='category-card' onClick={onSelect}>
      <Card.Img className='category-logo mx-auto' src={`https://bachkhoi.online/static/category_13_image`}/>
      <Card.Body className='text-center'>
        <EqualHeightElement name="category-name">
          <Card.Title>{subCategory.name}</Card.Title>
          <div>250 kg</div>
        </EqualHeightElement>
      </Card.Body>
    </Card>
  );
};

export default SubCategoryCard;
