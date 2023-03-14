// Essentials
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';

// Components
import DonorCard from 'components/guest/common/cards/DonorCard';

// Styling
import 'assets/css/Fogi.css';

// Data
import { DONOR_DATA } from 'utils/constants/Donor.jsx'

// Utility
import { useResizer } from 'utils/helpers/Resizer';

const ProductSection = () => {
  let size = useResizer();

  const [shownDonors, setShownDonors] = useState(DONOR_DATA.slice(0, 3));

  useEffect(() => {
    let length = 3;
    if (size === 2 || size === 3) length = 2;
    setShownDonors(DONOR_DATA.slice(0, length));
  }, [size]);

  return (
    <div className='bg'>
      <Row className='pt-4'>
        <Col>
          <h2>Donors</h2>
        </Col>
      </Row>
      <Row className='py-3' xs={1} md={2} xl={3}>
        {shownDonors.map((donor) => (
          <Col className={size < 3 && 'mb-4'}>
            <DonorCard donor={donor} />
          </Col>
        ))}
      </Row>
      <Row>
        <Col className='d-flex justify-content-center'>
          <Button variant='light'>View more</Button>
        </Col>
      </Row>
    </div>
  );
};

export default ProductSection;
