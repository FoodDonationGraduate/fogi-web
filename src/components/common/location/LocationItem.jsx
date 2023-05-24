// Essentials
import React from 'react';
import { Button, Col, Row, Stack } from 'react-bootstrap';

// Assets
import { MdOutlineAdd, MdOutlineLocationOn } from 'react-icons/md';

// Style
import 'assets/css/common/Location.css';

const LocationItem = ({
  isAdd=false,
  setState,
  item,
  setItem
}) => {

  const selectLocation = (id) => {
    console.log('select location with id: ' + id);
  };

  return (
    <>
      {isAdd ? 
        <div className='location-item location-item-add' onClick={() => setState(1)}>
          <Row>
            <Col>
              <Stack gap={2} direction='horizontal'>
                <MdOutlineAdd className='location-item-icon' />
                <header>Thêm Địa điểm</header>
              </Stack>
            </Col>
          </Row>
        </div>
        : 
        <div 
          className='location-item location-item-standard'
          onClick={() => selectLocation(item.id)}
        >
          <Row className='px-0'>
            <Col xs={9}>
              <Stack gap={2} direction='horizontal'>
                <MdOutlineLocationOn className='location-item-icon' />
                <Stack>
                  <header className='location-item-header'>
                    {item.name ? item.name : 'Tên địa điểm'}
                  </header>
                  <div className='location-item-paragraph'>
                    {item.address ? item.address : 'Địa chỉ'}
                  </div>
                </Stack>
              </Stack>
            </Col>
            <Col className='d-flex justify-content-end'>
              <Button variant='outline-dark' onClick={(event) => {
                setState(2);
                setItem(item)
              }}>
                Chỉnh sửa
              </Button>
            </Col>
          </Row>
        </div>
      }
    </>
  );
};

export default LocationItem;