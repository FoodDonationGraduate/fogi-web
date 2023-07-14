// Essentials
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import { EqualHeightElement } from 'react-equal-height';

// Asset
import PlaceHolder from 'assets/images/placeholder.jpg';

// Styling
import 'assets/css/common/Card.css';

const SubCategoryCard = ({
  subCategory
}) => {
  const navigate = useNavigate();
  const userInfo = useSelector(state => state.authenticationReducer.user);

  const onSelect = () => {
    navigate(`/${userInfo.user_type}/parent-food/${subCategory.id}`);
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
          <div>{subCategory.stock} {subCategory.unit === 'kg' ? 'Kg' : 'Cái'}</div>
        </EqualHeightElement>
      </Card.Body>
    </Card>
  );
};

export default SubCategoryCard;
