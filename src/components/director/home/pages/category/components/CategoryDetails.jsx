// Essentials
import React from 'react';
import { Col, Row } from 'react-bootstrap';

// Components
import BackButton from 'components/common/BackButton';

import CategoryInfoCard from './CategoryInfoCard';


const CategoryDetails = ({
  category,
  setTargetCategory
}) => {
  return (
    <>
      <Row>
        <Col className='px-0'>
          <Row className='mb-4'>
            <Col>
              <div className='mb-2'>
                <BackButton setTarget={setTargetCategory} />
              </div>
              <CategoryInfoCard
                category={category}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
};

export default CategoryDetails;
