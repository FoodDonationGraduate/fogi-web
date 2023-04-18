// Essentials
import * as React from 'react';
import { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { EqualHeight } from 'react-equal-height';

// Components
import ApproveItem from './ApproveItem';
import Pagination from 'components/common/pagination/Pagination';

// Data
import { USER_DATA } from 'utils/constants/User.jsx';

const ApproveList = () => {
  const APPROVE_COUNT = 4; // per page
  const [page, setPage] = useState(0);
  const onChangePage = (idx) => {
    setPage(idx);
  };

  return (
    <Container>
      <Row>
        <Col className='px-0'>
          <Row className='mb-4' xs={1} md={2}>
            <EqualHeight>
              {USER_DATA.slice(page * APPROVE_COUNT, (page + 1) * APPROVE_COUNT).map((user, key) => (
                <Col className='mb-4' key={key}>
                  <ApproveItem approve={user} />
                </Col>
              ))}
            </EqualHeight>
          </Row>
          <div className='d-flex justify-content-center'>
            <Pagination
              pageCount={Math.ceil(USER_DATA.length / APPROVE_COUNT)}
              activeIdx={page}
              onChangePage={onChangePage}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ApproveList;
