// Essentials
import React from 'react';
import { Button, Col, Row, Stack } from 'react-bootstrap';

// Assets
import { MdOutlineAdd, MdOutlineLocationOn } from 'react-icons/md';

// Style
import 'assets/css/common/Location.css';

const LocationItem = ({
  isAdd=false,
  setState
}) => {

  const selectLocation = () => {
    console.log('select location');
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
          onClick={selectLocation}
        >
          <Row className='px-0'>
            <Col xs={9}>
              <Stack gap={2} direction='horizontal'>
                <MdOutlineLocationOn className='location-item-icon' />
                <Stack>
                  <header className='location-item-header'>
                    Tên Địa điểm
                  </header>
                  <div className='location-item-paragraph'>
                    227 Nguyen Văn Cừ, P. 4, Q. 5, TP. Hồ Chí Minh
                  </div>
                </Stack>
              </Stack>
            </Col>
            <Col className='d-flex justify-content-end'>
              <Button variant='outline-dark' onClick={(event) => {
                setState(2);
                event.stopPropagation();
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