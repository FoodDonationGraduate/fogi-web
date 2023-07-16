// Essentials
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Accordion, Button, Card, Col, Row, Stack } from 'react-bootstrap';
import { getUnit } from 'utils/helpers/Food';

// Assets
import { FaExclamationTriangle } from "react-icons/fa";

// Components
import FoodSelectCard from './FoodSelectCard';

import FoodSelectListModal from './FoodSelectListModal';

// Reducers
import { retrieveAllFood } from 'components/redux/reducer/DirectorReducer';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const SubCategoryCard = ({
  subCategory,
  subCategoryList, setSubCategoryList,
  childList, setChildList,
  isError, setIsError
}) => {
  let size = useResizer();

  // Selected Food handling
  const [foodList, setFoodList] = useState([]);
  const getTotalQuantity = () => {
    let total = 0;
    for (let i = 0; i < foodList.length; i++) {
      total += foodList[i].quantity;
    }
    return total;
  };
  useEffect(() => {
    if (getTotalQuantity() !== subCategory.quantity) setIsError(true);
    else setIsError(false);
  }, [foodList]);

  // Check food change
  const [modalTrigger, setModalTrigger] = useState(false);

  // Change SubCategory List
  const first = useRef(true); // prevent from firing upon initial render
  useEffect(() => {
    if (first.current) { first.current = false; return; }
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

  // Change foodList after auto-distribution
  useEffect(() => {
    setFoodList(subCategory.foodList);
  }, [subCategory]);

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
              <Col className='ps-0' xs={12} lg={6}>
                <Stack direction='horizontal'>
                  <img
                    className='long-product-image'
                    src={`https://bachkhoi.online/static/${subCategory.image_filename}`} alt='product-img'
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

              <Col lg={6} className={`${size > 0 ? 'd-flex justify-content-between align-items-center' : ''} ${size < 3 ? 'ps-0 py-3' : ''}`}>
                <div className={`d-flex ${size < 3 ? 'ps-0' : ''} ${size < 2 ? 'mt-2' : ''}`} xs={12} md={6}>
                  <div>
                    <header className='long-product-label'>{`${subCategory.unit === 'kg' ? 'Khối' : 'Số'} lượng (${getUnit(subCategory.unit)})`}</header>
                    <h5
                      className='mt-2'
                      style={{ color: `${getTotalQuantity() > subCategory.quantity ? '#bf1650' : 'black'}` }}
                    >
                      {getTotalQuantity()}/{subCategory.quantity}{' '}
                      {getTotalQuantity() > subCategory.quantity && <FaExclamationTriangle size={14} className='mb-1' />}
                    </h5>
                  </div>
                </div>

                <div className={`d-flex ${size < 3 ? 'ps-0' : ''} ${size < 2 ? 'mt-2' : ''}`}>
                  <Button className='fogi' variant='primary' onClick={() => {
                    setModalTrigger(true);
                    onSubShow();
                  }}>
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
                          subCategory={subCategory}
                          foodList={foodList} setFoodList={setFoodList}
                          childList={childList} setChildList={setChildList}
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
      <FoodSelectListModal
        subCategory={subCategory}
        foodList={foodList} setFoodList={setFoodList}
        childList={childList} setChildList={setChildList}
        modalTrigger={modalTrigger} setModalTrigger={setModalTrigger}
        subShow={subShow} onSubClose={onSubClose}
      />
    </>
  )
};

export default SubCategoryCard;
