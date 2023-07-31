// Essentials
import * as React from 'react';
import { Card } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { EqualHeightElement } from 'react-equal-height';

// Asset
import PlaceHolder from 'assets/images/placeholder.jpg';

// Styling
import 'assets/css/common/Card.css';
import 'assets/css/common/Category.css';

const CategoryCard = ({
  category,
  user_type='donee'
}) => {
  const navigate = useNavigate();
  const userInfo = useSelector(state => state.authenticationReducer.user);

  const toCategoryPage = () => { // for Donee
    navigate(`/category/${category.id}`);
  };

  const toSubCategoryPage = () => { // for Director
    navigate(`/${userInfo.user_type}/category/${category.id}`);
  };

  return (
    <Card className='category-card' onClick={user_type === 'donee' ? toCategoryPage : toSubCategoryPage}>
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
        {/* {user_type === 'director' && <EditButton />}   */}
      </Card.Body>
    </Card>
  );
};

export default CategoryCard;
