// Essentials
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { EqualHeight } from 'react-equal-height';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// Components
import DonorCard from 'components/guest/common/cards/DonorCard';
import { retrieveAllDonors } from 'components/redux/reducer/DonorReducer';

// Styling
import 'assets/css/Fogi.css';

// Utility
import { useResizer } from 'utils/helpers/Resizer';

const ProductSection = () => {
  const allDonors = useSelector(state => state.donorReducer.allDonors);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(retrieveAllDonors({limit: 3, offset: 0}, navigate))
  }, []);

  // Responsive handling
  let size = useResizer();

  const [shownDonors, setShownDonors] = useState([]);

  useEffect(() => {
    let length = 3;
    if (size >= 0 && size < 4) length = 2;
    if (Object.keys(allDonors).length !== 0) {
      setShownDonors(allDonors.donors.slice(0, length));
    }
  }, [size, allDonors]);

  return (
    <div className='bg'>
      <Container>
        <Row className='pt-4'>
          <Col>
            <h2>Donors</h2>
          </Col>
        </Row>
        <Row className='py-3' xs={1} md={2} xl={3} >
          <EqualHeight>
            {Object.keys(allDonors).length !== 0 &&
              shownDonors.map((donor) => (
                <Col className='mb-3'>
                  <DonorCard donor={donor} key={donor.email}/>
                </Col>
              ))
            }
          </EqualHeight>
        </Row>
        <Row>
          <Col className='d-flex justify-content-center'>
            <Button variant='light' onClick={() => navigate('/donors')}>View more</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductSection;
