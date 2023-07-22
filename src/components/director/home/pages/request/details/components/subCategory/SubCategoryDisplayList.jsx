// Essentials
import React, { useState, useEffect } from 'react';
import { Container, Col, Row } from 'react-bootstrap';

// Components
import ListTitle from 'components/common/ListTitle';
import Pagination from 'components/common/pagination/Pagination';

import SubCategoryDisplay from './SubCategoryDisplay';

const SubCategoryDisplayList = ({
  subCategoryList
}) => {

  // Pagination
  const SUB_CATEGORY_COUNT = 4; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = async (idx) => {
    setPage(idx);
  };

  // Shown SubCategories
  const [shownSubCategories, setShownSubCategories] = useState([]);
  useEffect(() => {
    setShownSubCategories(subCategoryList.slice(page * SUB_CATEGORY_COUNT, (page + 1) * SUB_CATEGORY_COUNT));
  }, [page, subCategoryList]);

  return (
    <>
      {Object.keys(subCategoryList).length !== 0 && 
        <Container>
          <ListTitle title={'Hạng mục con'} />
          <Row xs={1}>
            {shownSubCategories.map((subCategory, idx) => (
              <Col className='mb-3' key={idx}>
                <SubCategoryDisplay
                  subCategory={subCategory}
                />
              </Col>
            ))}
          </Row>
          <div className='d-flex justify-content-center mt-2'>
            <Pagination
              pageCount={Math.ceil(subCategoryList.length / SUB_CATEGORY_COUNT)}
              activeIdx={page}
              onChangePage={onChangePage}
            />
          </div>
        </Container>
      }
    </>
  )
};

export default SubCategoryDisplayList;