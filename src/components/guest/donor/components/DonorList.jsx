// Essentials
import * as React from 'react';
import { useState } from 'react';
import { Container, Col, Pagination, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router';
import { EqualHeight } from 'react-equal-height';

// Components
import DonorCard from 'components/guest/common/cards/DonorCard';
import FogiPagination from 'components/common/pagination/Pagination';
import { retrieveAllDonors } from 'components/redux/reducer/DonorReducer';

const ProductList = () => {
  const allDonors = useSelector(state => state.donorReducer.allDonors);

  const DONOR_COUNT = 6; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = async (idx) => {
    setPage(idx);
    await dispatch(retrieveAllDonors({ limit: DONOR_COUNT, offset: idx * DONOR_COUNT }, navigate))
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(retrieveAllDonors({ limit: DONOR_COUNT, offset: page * DONOR_COUNT }, navigate))
}, [])

  return (
    <div className='bg'>
      <Container>
        <Row className='pt-4' xs={1} md={2} lg={3} >
        <EqualHeight>
          {Object.keys(allDonors).length !== 0 && allDonors.donors.map((donor) => (
            <Col className='pb-4' key={donor.email}>
              <DonorCard donor={donor}/>
            </Col>
          ))}
        </EqualHeight>
        </Row>
        <Row className='pb-4'>
          <Col className='d-flex justify-content-center'>
            <FogiPagination
              pageCount={Math.ceil(allDonors.total / DONOR_COUNT)}
              activeIdx={page}
              onChangePage={onChangePage}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ProductList;
