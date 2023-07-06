// Essentials
import React, { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

// Components
import ListTitle from 'components/common/ListTitle';
import Pagination from 'components/common/pagination/Pagination';

import SubCategoryCard from './SubCategoryCard';

const SubCategoryList = ({
  subCategoryList, setSubCategoryList
}) => {

  const SUB_CATEGORY_COUNT = 4; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = async (idx) => {
    setPage(idx);
  };

  return (
    <>
      <Container>
        <ListTitle title={'Danh sách Thực phẩm lớn'} />
        <Row xs={1}>
          {subCategoryList.map((subCategory, idx) => (
            <Col className='mb-3' key={idx}>
              <SubCategoryCard
                subCategory={subCategory}
                subCategoryList={subCategoryList} setSubCategoryList={setSubCategoryList}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <div className='d-flex justify-content-center mt-2'>
        <Pagination
          pageCount={Math.ceil(16 / SUB_CATEGORY_COUNT)}
          // pageCount={Math.ceil(allRequests.total_requests / REQUEST_COUNT)}
          activeIdx={page}
          onChangePage={onChangePage}
        />
      </div>
    </>
  )
};

export default SubCategoryList;