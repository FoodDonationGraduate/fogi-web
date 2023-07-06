// Essentials
import React, { useState } from 'react';
import { Button, Card, Col, Row, Stack, Form } from 'react-bootstrap';
import { getUnit } from 'utils/helpers/Food';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const FoodCard = ({
  food,
  foodList, setFoodList,
  isShowStock=false
}) => {
  let size = useResizer();

  // Foop List handling
  const isInFoodList = () => {
    return foodList.filter(f => f.content.id === food.content.id).length > 0;
  };
  const onSelect = () => {
    setFoodList([...foodList, { content: food.content, count: 1 }]);
  };
  const onDeselect = () => {
    setFoodList(foodList.filter(f => f.content.id != food.content.id));
  };
  const onChangeCount = (count) => {
    const idx = foodList.findIndex(f => f.content.id === food.content.id);
    setFoodList([
      ...foodList.slice(0, idx),
      {
        content: food.content,
        count: count
      },
      ...foodList.slice(idx + 1)
    ]);
  };

  const onUpdateCount = (amount) => {
    let newCount = Number(food.count) + amount;
    if (newCount < 1 || newCount > food.content.stock) return;
    onChangeCount(Number(food.count) + amount);
  };

  const onUpdateInput = (event) => {
    let newCount = Number(event.target.value);
    if (newCount < 1) onChangeCount(1);
    else if (newCount > food.content.stock) onChangeCount(food.content.stock);
    else onChangeCount(newCount);
  };

  return (
    <>
      <Row>
        <Col className='px-0'>
          <Card
            className='p-4'
            style={{ border: `${isInFoodList() ? '1px solid #82CD47': ''}` }}
          >
            <div className='d-flex justify-content-between align-items-center'>
              <div>
                <Stack direction='horizontal'>
                  <img
                    className='long-product-image'
                    src={`https://bachkhoi.online/static/${'category_13_image'}`} alt='product-img'
                    width='64' height='64'
                  />
                  <div className='ms-4'>
                    <h5 className='fw-bold'>
                      {food.content.name}
                    </h5>
                  </div>
                </Stack>
              </div>

              <div className={`d-flex justify-content-between align-items-center`}>
                {!isShowStock ?
                  <div>
                    <header className='long-product-label mb-2'>{`${food.content.unit === 'kg' ? 'Khối' : 'Số'} lượng (${getUnit(food.content.unit)})`}</header>
                    <Stack direction='horizontal'>
                      {size > 0 &&
                        <Button
                          className='count-btn-left'
                          variant='outline-secondary'
                          onClick={() => onUpdateCount(-1)}
                          disabled={food.count <= 1}
                        >
                          -
                        </Button>
                      }
                      <Form.Group>
                        <Form.Control
                          className='count-input'
                          type='number'
                          value={Number(food.count).toString()}
                          style={{ textAlign: 'center' }}
                          onChange={(e) => onUpdateInput(e) }
                        />
                      </Form.Group>
                      {size > 0 &&
                        <Button
                          className='count-btn-right'
                          variant='outline-secondary'
                          onClick={() => onUpdateCount(1)}
                          disabled={food.count >= food.stock}
                        >
                          +
                        </Button>
                      }
                    </Stack>
                    <small className='small-text'>Tồn kho: {food.content.stock}</small>
                  </div>
                  :
                  <>
                    <div className={`d-flex ${size < 3 && 'ps-0'} ${size < 2 && 'mt-2'}`} xs={12} md={6}>
                      <div>
                        <header className='long-product-label'>Tồn kho</header>
                        <h5 className='mt-2'>{food.content.stock} {getUnit(food.content.unit)}</h5>
                      </div>
                    </div>
                  </>
                }
                <div className='ms-4'>
                  {!isInFoodList() ?
                    <Button className='fogi' variant='primary' onClick={onSelect}>
                      Chọn
                    </Button>
                    :
                    <Button variant='outline-danger' onClick={onDeselect}>
                      Bỏ chọn
                    </Button>
                  }
                </div>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default FoodCard;
