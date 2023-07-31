// Essentials
import React from 'react';
import { Button, Card, Col, Row, Stack } from 'react-bootstrap';

// Assets
import {
  MdOutlinePhone, MdSocialDistance
} from 'react-icons/md';
import PlaceHolder from 'assets/images/avatar.png';

const VolunteerCard = ({
  request=undefined,
  volunteer,
  targetVolunteer,
  setTargetVolunteer
}) => {

  const isSelected = () => { return targetVolunteer ? (volunteer.email === targetVolunteer.email) : false; }
  
  const onSelect = () => {
    if (!setTargetVolunteer) return;
    if (isSelected()) setTargetVolunteer(null);
    else setTargetVolunteer(volunteer);
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
                      className='long-product-image-round'  alt='product-img'
                      src={
                        volunteer.avatar ?
                        `https://bachkhoi.online/static/${volunteer.avatar}`
                        :
                        PlaceHolder
                      }
                      width='96' height='96'
                    />
                    <Stack direction='horizontal' gap={4}>
                      <div className='ms-4'>
                        <h5 className='fw-bold'>
                          {volunteer.name}
                        </h5>
                        <div style={{ color: '#999' }}>
                          <MdOutlinePhone /> {volunteer.phone}
                        </div>
                        {volunteer.distance &&
                          <div style={{ color: '#999' }}>
                            <MdSocialDistance /> {volunteer.distance} km
                          </div>
                        }
                        
                      </div>
                      {/* {!request && 
                        <span className={size > 0 ? 'long-product-type' : 'long-product-type-sm'}>
                          Sẵn sàng
                        </span>
                      } */}
                    </Stack> 
                </Stack>
              </div>

              {!request && 
                <div className='ms-4'>
                  {(!targetVolunteer || volunteer.email !== targetVolunteer.email) ?
                    <Button className='fogi' variant='primary' onClick={onSelect}>
                      Chọn
                    </Button>
                    :
                    <Button variant='outline-danger' onClick={onSelect}>
                      Bỏ chọn
                    </Button>
                  }
                </div>
              }
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default VolunteerCard;
