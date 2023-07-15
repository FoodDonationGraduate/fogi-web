// Essentials
import React, { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

// Components
import ListTitle from 'components/common/ListTitle';
import Pagination from 'components/common/pagination/Pagination';

import SubCategoryCard from './SubCategoryCard';

const SubCategoryList = ({
  subCategoryList, setSubCategoryList,
  childList, setChildList,
  isError, setIsError
}) => {

  const SUB_CATEGORY_COUNT = 4; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = async (idx) => {
    setPage(idx);
  };

  return (
    <>
      {Object.keys(subCategoryList).length !== 0 && 
      <>
      <Container>
        <ListTitle title={'Danh sách Thực phẩm Đại diện'} />
        <Row xs={1}>
          {subCategoryList.map((subCategory, idx) => (
            <Col className='mb-3' key={idx}>
              <SubCategoryCard
                subCategory={subCategory}
                subCategoryList={subCategoryList} setSubCategoryList={setSubCategoryList}
                childList={childList} setChildList={setChildList}
                isError={isError} setIsError={setIsError}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <div className='d-flex justify-content-center mt-2'>
        <Pagination
          pageCount={Math.ceil(subCategoryList.length / SUB_CATEGORY_COUNT)}
          // pageCount={Math.ceil(allRequests.total_requests / REQUEST_COUNT)}
          activeIdx={page}
          onChangePage={onChangePage}
        />
      </div>
      </>
      }
    </>
  )
};

export default SubCategoryList;