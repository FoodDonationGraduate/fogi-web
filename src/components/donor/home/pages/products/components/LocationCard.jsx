// Essentials
import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux'

// Components
import LocationModal from 'components/common/location/LocationModal';

// Assets
import { FaMapMarkerAlt, FaEdit } from 'react-icons/fa';

// Styling
import 'assets/css/Fogi.css';

// Utility
import { useResizer } from 'utils/helpers/Resizer';

const LocationCard = () => {
  let size = useResizer();
  const [location, setLocation] = useState();
  const selectedAddress = useSelector(state => state.addressReducer.selectedAddress)

  useEffect(() => {
    if (Object.keys(selectedAddress).length !== 0) {
      setLocation(size < 3 ? (selectedAddress.address.substring(0, (size + 2) * 5) + '...') : selectedAddress.address)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size, selectedAddress]);

  // Location Modal
  const [show, setShow] = useState(false);
  const onClose = () => setShow(false);
  const onShow = () => setShow(true);
  
  return (
    <>
      <LocationModal show={show} onClose={onClose} />
      <Card className='long-product-item long-product-donor mb-4'>
        <Row>
          <Col>
            <h4 className='mb-0'>
              <FaMapMarkerAlt className='fogi me-4' style={{ color: '#82CD47' }} />
              {location}
              <Button className='ms-4' variant='outline-secondary' onClick={onShow}>
                {size < 3 && <FaEdit className='mb-1' />}
                {size >= 3 && 'Thay đổi'}
              </Button>
            </h4>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default LocationCard;