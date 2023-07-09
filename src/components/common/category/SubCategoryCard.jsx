// Essentials
import * as React from 'react';
import { Card } from 'react-bootstrap';
import { EqualHeightElement } from 'react-equal-height';

// Asset
import PlaceHolder from 'assets/images/placeholder.jpg';

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
      <Card.Img
        className='category-logo mx-auto'
        src={
          subCategory.image_filename ? `https://bachkhoi.online/static/${subCategory.image_filename}`
          : PlaceHolder
        }
      />
      <Card.Body className='text-center'>
        <EqualHeightElement name="category-name">
          <Card.Title>{subCategory.name}</Card.Title>
          <div>{subCategory.stock} {subCategory.unit}</div>
        </EqualHeightElement>
      </Card.Body>
    </Card>
  );
};

export default SubCategoryCard;
