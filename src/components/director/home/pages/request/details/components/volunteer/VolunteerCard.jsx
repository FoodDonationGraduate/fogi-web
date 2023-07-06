// Essentials
import React from 'react';
import { Button, Card, Col, Row, Stack } from 'react-bootstrap';

// Assets
import {
  MdOutlinePhone
} from 'react-icons/md';

// Utility
import { useResizer } from 'utils/helpers/Resizer.jsx';

const VolunteerCard = ({
  volunteer,
  targetVolunteer,
  setTargetVolunteer
}) => {
  let size = useResizer();

  const isSelected = () => { return volunteer.email === targetVolunteer; }
  
  const onSelect = () => {
    if (isSelected()) setTargetVolunteer(null);
    else  setTargetVolunteer(volunteer.email);
  };

  return (
    <>
      <Row>
        <Col className='px-0'>
          <Card
            className='long-product-item-static'
            style={{ boxShadow: `${isSelected() ? '0 0 8px #82CD47': ''}` }}
          >
            <div className='d-flex justify-content-between align-items-center'>
              <div>
                <Stack direction='horizontal'>
                    <img
                      className='long-product-image-round'
                      src={`https://bachkhoi.online/static/${volunteer.image}`} alt='product-img'
                      width='96' height='96'
                    />
                    <Stack direction='horizontal' gap={4}>
                      <div className='ms-4'>
                        <h5 className='fw-bold'>
                          {volunteer.name}
                        </h5>
                        <small style={{ color: '#999' }}>
                          <MdOutlinePhone /> {volunteer.phone}
                        </small>
                    </div>
                    <span className={size > 0 ? 'long-product-type' : 'long-product-type-sm'}>
                      Sẵn sàng
                    </span>
                  </Stack> 
                </Stack>
              </div>

              <div className='ms-4'>
                {volunteer.email !== targetVolunteer ?
                  <Button className='fogi' variant='primary' onClick={onSelect}>
                    Chọn
                  </Button>
                  :
                  <Button variant='outline-danger' onClick={onSelect}>
                    Bỏ chọn
                  </Button>
                }
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default VolunteerCard;
