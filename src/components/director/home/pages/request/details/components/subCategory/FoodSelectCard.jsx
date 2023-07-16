// Essentials
import React, { useState } from 'react';
import { Button, Card, Col, Row, Stack, Form } from 'react-bootstrap';
import { getUnit } from 'utils/helpers/Food';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';
import { distanceTime } from 'utils/helpers/Time.jsx';

const FoodSelectCard = ({
  food,
  subCategory,
  foodList, setFoodList,
  isShowStock=false,
  childList, setChildList, oldChildList
}) => {
  let size = useResizer();

  const updateChild = (quantity) => {
    const idx = childList.children.map(c => c.child_id).indexOf(food.content.id);
    const list = childList.children;
    setChildList({ children:
      [
        ...list.slice(0, idx),
        {
          child_id: list[idx].child_id,
          parent_id: list[idx].parent_id,
          quantity
        },
        ...list.slice(idx + 1)
      ]
    });
  };

  // Foop List handling
  const isInFoodList = () => {
    return foodList.filter(f => f.content.id === food.content.id).length > 0;
  };
  const onSelect = () => {
    setFoodList([...foodList, { content: food.content, quantity: 1 }]);
    if (oldChildList.children.length > 0 && oldChildList.children.find(oc => oc.child_id == food.content.id)) {
      updateChild(1);
    } else
    setChildList({ children: [...childList.children, {
      parent_id: subCategory.id,
      child_id: food.content.id,
      quantity: 1
    }]});
  };
  const onDeselect = () => {
    setFoodList(foodList.filter(f => f.content.id != food.content.id));
    
    if (oldChildList.children.length > 0 && oldChildList.children.find(oc => oc.child_id == food.content.id)) {
      updateChild(0);
    } else
    setChildList({ children: childList.children.filter(f => f.child_id != food.content.id)});
  };
  const onChangeQuantity = (quantity) => {
    const idx = foodList.findIndex(f => f.content.id === food.content.id);
    setFoodList([
      ...foodList.slice(0, idx),
      {
        content: food.content,
        quantity: quantity
      },
      ...foodList.slice(idx + 1)
    ]);

    const child_idx = childList.children.findIndex(f => f.child_id === food.content.id);
    setChildList({ children: [
      ...childList.children.slice(0, child_idx),
      {
        parent_id: subCategory.id,
        child_id: food.content.id,
        quantity: quantity
      },
      ...childList.children.slice(child_idx + 1)
    ]});
  };

  const onUpdateQuantity = (amount) => {
    let newQuantity = Number(food.quantity) + amount;
    if (newQuantity < 1 || newQuantity > food.content.stock) return;
    onChangeQuantity(Number(food.quantity) + amount);
  };

  const onUpdateInput = (event) => {
    let newQuantity = Number(event.target.value);
    if (newQuantity < 1) onChangeQuantity(1);
    else if (newQuantity > food.content.stock) onChangeQuantity(food.content.stock);
    else onChangeQuantity(newQuantity);
  };

  return (
    <>
      <Row>
        <Col className='px-0'>
          <Card
            className='p-4'
            style={{ border: `${isInFoodList() ? '1px solid #82CD47': ''}` }}
          >
            <Row>
              <Col className='px-0' lg={6}>
                <Stack direction='horizontal'>
                  <img
                    className='long-product-image'
                    src={`https://bachkhoi.online/static/${food.content.image_filename}`} alt='product-img'
                    width='64' height='64'
                  />
                  <div className='ms-4'>
                    <h5 className='fw-bold'>
                      {food.content.name}
                    </h5>
                  </div>
                </Stack>
              </Col>

              <Col className='px-0'>
                <Row>
                  <Col className='ps-0' lg={4}>
                    {!isShowStock ?
                      <div>
                        <header className='long-product-label mb-2'>{`${food.content.unit === 'kg' ? 'Khối' : 'Số'} lượng (${getUnit(food.content.unit)})`}</header>
                        <Stack direction='horizontal'>
                          <Button
                            className='count-btn-left'
                            variant='outline-secondary'
                            onClick={() => onUpdateQuantity(-1)}
                            disabled={food.quantity <= 1}
                          >
                            -
                          </Button>
                          <Form.Group>
                            <Form.Control
                              className='count-input'
                              type='number'
                              value={Number(food.quantity).toString()}
                              style={{ textAlign: 'center' }}
                              onChange={(e) => onUpdateInput(e) }
                            />
                          </Form.Group>
                          <Button
                            className='count-btn-right'
                            variant='outline-secondary'
                            onClick={() => onUpdateQuantity(1)}
                            disabled={food.quantity >= food.stock}
                          >
                            +
                          </Button>
                        </Stack>
                        <small className='small-text'>Tồn kho: {food.content.stock}</small>
                      </div>
                      :
                      <>
                        <div className={`d-flex ${size < 3 ? 'ps-0' : ''} ${size < 2 ? 'mt-2' : ''}`} xs={12} md={6}>
                          <div>
                            <header className='long-product-label'>Tồn kho</header>
                            <h5 className='mt-2'>{food.content.stock} {getUnit(food.content.unit)}</h5>
                          </div>
                        </div>
                      </>
                    }
                  </Col>
                  <Col className={size < 3 ? 'px-0 mb-2' : ''} lg={4}>
                    <div className={`d-flex ${size < 3 ? 'ps-0' : ''} ${size < 2 ? 'mt-2' : ''}`} xs={12} md={6}>
                      <div>
                        <header className='long-product-label'>Còn</header>
                        <h5 className='mt-2'>{distanceTime(food.content.expired_time)}</h5>
                      </div>
                    </div>
                  </Col>
                  <Col className={`d-grid align-items-center pe-0 ${size < 3 ? 'ps-0' : ''}`} >
                    {!isInFoodList() ?
                      <Button className='fogi' variant='primary' onClick={onSelect}>
                        Chọn
                      </Button>
                      :
                      <Button variant='outline-danger' onClick={onDeselect}>
                        Bỏ chọn
                      </Button>
                    }
                  </Col>
                </Row>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default FoodSelectCard;
