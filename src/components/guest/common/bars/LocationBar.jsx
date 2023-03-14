// Essentials
import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';

// Assets
import { FaMapMarkerAlt, FaEdit } from 'react-icons/fa';

// Utility
import { useResizer } from 'utils/helpers/Resizer';

// Styling
import 'assets/css/Fogi.css';

const LocationBar = () => {
  let size = useResizer();
  const exampleLocation = '227 Nguyen Van Cu, Ward 4, District 5';
  const [location, setLocation] = useState(exampleLocation)

  useEffect(() => {
    if (size < 2) setLocation(exampleLocation.substring(0, 20) + '...');
    else setLocation(exampleLocation);
  }, [size]);

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Container className='py-3'>
        <h3>
          <FaMapMarkerAlt className='fogi me-4' style={{ color: '#82CD47' }} />
          {location}
          <Button className='ms-4' variant='outline-secondary'>
            {size < 3 && <FaEdit className='mb-1' />}
            {size >= 3 && 'Change your location'}
          </Button>
        </h3>
      </Container>
    </div>
  );
};

export default LocationBar;
