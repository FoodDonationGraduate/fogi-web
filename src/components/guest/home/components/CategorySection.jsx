// Essentials
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';

// Components
import CategoryCard from 'components/guest/common/cards/CategoryCard';

// Styling
import 'assets/css/Fogi.css';

// Utility
import { useResizer } from 'utils/helpers/Resizer';

// Data
import { CATEGORY_DATA } from 'utils/constants/Category.jsx'

const CategorySection = () => {
  let size = useResizer();

  const [shownCategories, setShownCategories] = useState(CATEGORY_DATA.slice(0, 6));

  useEffect(() => {
    let length = 6;
    switch (size) {
      case 2: length = 4; break;
      case 3: length = 4; break;
    }
    setShownCategories(CATEGORY_DATA.slice(0, length));
  }, [size]);

  return (
    <div className='bg'>
      <Row className='pt-4'>
        <Col>
          <h2>Categories</h2>
        </Col>
      </Row>
      <Row className='py-3' xs={2} sm={3} md={4} xl={6}>
        {shownCategories.map((category) => (
          <Col className={size !== 3 && 'mb-4'}>
            <CategoryCard category={category} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col className='d-flex justify-content-center'>
          <Button variant='light'>View more</Button>
        </Col>
      </Row>
    </div>
  );
};

export default CategorySection;
