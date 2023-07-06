// Essentials
import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { EqualHeight } from 'react-equal-height';

// Components
import BackButton from 'components/common/BackButton';
import ListTitle from 'components/common/ListTitle';
import Pagination from 'components/common/pagination/Pagination';

import SubCategoryInfoCard from './SubCategoryInfoCard';
import FoodCard from '../../food/FoodCard';

const SubCategoryDetailsPage = ({
  subCategory,
  setTargetSubCategory,
  onSubShow
}) => {
  const FOOD_COUNT = 4;
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = async (idx) => {
    setPage(idx);
  };

  return (
    <>
      <Row>
        <Col className='px-0'>
          <Row className='mb-4'>
            <Col>
              <div className='mb-2'>
                <BackButton setTarget={setTargetSubCategory} />
              </div>
              <SubCategoryInfoCard
                subCategory={subCategory}
                setTargetSubCategory={setTargetSubCategory}
                onSubShow={onSubShow}
              />
            </Col>
          </Row>

          <Row>
            <Col className='ps-0'>
              <ListTitle title={'Danh sách Thực phẩm'} />
              <Row className='mb-2' xs={1}>
                <EqualHeight>
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <Col className='mb-3' key={idx}>
                      <FoodCard
                        food={{
                          name: 'Thực phẩm',
                          stock: 100,
                          unit: 'kg'
                        }}
                      />
                    </Col>
                  ))}
                  <div className='d-flex justify-content-center mt-4'>
                    <Pagination
                      pageCount={Math.ceil(14 / FOOD_COUNT)}
                      activeIdx={page}
                      onChangePage={onChangePage}
                    />
                  </div>
                </EqualHeight>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  )
};

export default SubCategoryDetailsPage;
