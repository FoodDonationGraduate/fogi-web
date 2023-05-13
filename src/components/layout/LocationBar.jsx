// Essentials
import React, { useState, useEffect } from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';

// Assets
import { FaMapMarkerAlt, FaEdit } from 'react-icons/fa';

// Styling
import 'assets/css/Fogi.css';

// Utility
import { useResizer } from 'utils/helpers/Resizer';

const LocationBar = () => {
  let size = useResizer();
  const exampleLocation = '227 Nguyễn Văn Cừ, P. 4, Q. 5, TP. Hồ Chí Minh'; // temporary
  const [location, setLocation] = useState(exampleLocation)

  useEffect(() => {
    if (size < 2) setLocation(exampleLocation.substring(0, (size + 2) * 5) + '...');
    else setLocation(exampleLocation);
  }, [size]);

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Container className={`pb-2 pt-${size <= 2 ? '2' : '3'}`}>
        <Row>
          <Col>
            <h3>
              <FaMapMarkerAlt className='fogi me-4' style={{ color: '#82CD47' }} />
              {location}
              <Button className='ms-4' variant='outline-secondary'>
                {size < 3 && <FaEdit className='mb-1' />}
                {size >= 3 && 'Thay đổi'}
              </Button>
            </h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LocationBar;
