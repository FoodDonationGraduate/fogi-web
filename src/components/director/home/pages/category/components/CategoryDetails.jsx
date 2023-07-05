// Essentials
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { EqualHeight } from 'react-equal-height';

// Components
import BackButton from 'components/common/BackButton';
import ListTitle from 'components/common/ListTitle';
import SubCategoryCard from 'components/common/category/SubCategoryCard';

import CategoryInfoCard from './CategoryInfoCard';


const CategoryDetails = ({
  category,
  setTargetCategory,
  setTargetSubCategory,
  onShow,
  onSubShow
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
                setTargetCategory={setTargetCategory}
                setTargetSubCategory={setTargetSubCategory}
                onShow={onShow}
                onSubShow={onSubShow}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <ListTitle title={'Danh sách Thực phẩm lớn'} />
              <Row className='mb-2' xs={2} sm={3} md={4}>
                <EqualHeight>
                  {Array.from({ length: 14 }).map((_, idx) => (
                    <Col className='mb-4' key={idx}>
                      <SubCategoryCard
                        subCategory={{ name: 'Thực phẩm lớn' }}
                        setTargetSubCategory={setTargetSubCategory}
                        onSubShow={onSubShow}
                      />
                    </Col>
                  ))}
                </EqualHeight>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
};

export default CategoryDetails;
