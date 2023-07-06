// Essentials
import React, { useState, useEffect } from 'react';
import { Accordion, Button, Card, Col, Row, Stack } from 'react-bootstrap';
import { getUnit } from 'utils/helpers/Food';

// Assets
import { FaExclamationTriangle } from "react-icons/fa";

// Components
import FoodSelectCard from './FoodSelectCard';

import FoodListModal from './FoodSelectListModal';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const SubCategoryCard = ({
  subCategory,
  subCategoryList, setSubCategoryList
}) => {
  let size = useResizer();

  // Selected Food handling
  const [foodList, setFoodList] = useState(subCategory.foodList);
  const getTotalCount = () => {
    let total = 0;
    for (let i = 0; i < foodList.length; i++) {
      total += foodList[i].count;
    }
    return total;
  };

  // Change SubCategory List
  useEffect(() => {
    const idx = subCategoryList.findIndex(c => c.id === subCategory.id);
    setSubCategoryList([
      ...subCategoryList.slice(0, idx),
      {
        ...subCategory,
        foodList
      },
      ...subCategoryList.slice(idx + 1)
    ]);
  }, [foodList]);

  // Modal handling
  const [subShow, setSubShow] = useState(false);
  const onSubShow = () => setSubShow(true);
  const onSubClose = () => setSubShow(false);

  return (
    <>
      <Row>
        <Col className='px-0'>
          <Card className='long-product-item-static'>
            <Row xs={1} lg={2}>
              <Col className='ps-0' xs={12} lg={4}>
                <Stack direction='horizontal'>
                  <img
                    className='long-product-image'
                    src={`https://bachkhoi.online/static/${'category_13_image'}`} alt='product-img'
                    width='96' height='96'
                  />
                  <div className='ms-4'>
                    <h5 className='fw-bold'>
                      {subCategory.name}
                    </h5>
                    <span className={size > 0 ? 'long-product-type' : 'long-product-type-sm'}>
                      {subCategory.category_name}
                    </span>
                  </div>
                </Stack>
              </Col>

              <Col lg={8} className={`${size > 0 ? 'd-flex justify-content-between align-items-center' : ''} ${size < 3 ? 'ps-0 py-3' : ''}`}>
                <div className={`d-flex ${size < 3 ? 'ps-0' : ''} ${size < 2 ? 'mt-2' : ''}`} xs={12} md={6}>
                  <div>
                    <header className='long-product-label'>{`${subCategory.unit === 'kg' ? 'Khối' : 'Số'} lượng (${getUnit(subCategory.unit)})`}</header>
                    <h5
                      className='mt-2'
                      style={{ color: `${getTotalCount() > subCategory.count ? '#bf1650' : 'black'}` }}
                    >
                      {getTotalCount()}/{subCategory.count}{' '}
                      {getTotalCount() > subCategory.count && <FaExclamationTriangle size={14} className='mb-1' />}
                    </h5>
                  </div>
                </div>

                <div className={`d-flex ${size < 3 ? 'ps-0' : ''} ${size < 2 ? 'mt-2' : ''}`}>
                  <Button className='fogi' variant='primary' onClick={onSubShow}>
                    Chọn Thực phẩm
                  </Button>
                </div>
              </Col>
            </Row>
            {foodList.length > 0 &&
              <Accordion className='mt-3'>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    Danh sách Thực phẩm ({foodList.length})
                  </Accordion.Header>
                  <Accordion.Body>
                    {foodList.map((food,idx) => (
                      <div className={idx !== 0 ? 'mt-3' : ''} key={idx}>
                        <FoodSelectCard
                          food={food}
                          foodList={foodList} setFoodList={setFoodList}
                        />
                      </div>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            }
          </Card>
        </Col>
      </Row>
      <FoodListModal
        subCategory={subCategory}
        foodList={foodList} setFoodList={setFoodList}
        subShow={subShow} onSubClose={onSubClose}
      />
    </>
  )
};

export default SubCategoryCard;
