// Essentials
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Col, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import axiosInstance from 'services/axios/axiosConfig.js';

// Components
import Pagination from 'components/common/pagination/Pagination';

import SubCategoryCard from './SubCategoryCard';

const SubCategoryList = ({
  subCategoryList, setSubCategoryList,
  childList, setChildList, oldChildList,
  isError, setIsError
}) => {
  // Constants
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);

  // Pagination
  const SUB_CATEGORY_COUNT = 4; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = async (idx) => {
    setPage(idx);
  };

  // Automatic Food Distribution
  const autoDistributeFood = ({ resultAllFood, resultAllChild }) => {
    
    const currentSubCategory = subCategoryList.find(sc => sc.id == resultAllFood.parent_id);
    const max_quantity = currentSubCategory.quantity;

    let resultList = []; let total_quantity = 0;

    for (let i = 0; i < resultAllFood.products.length; i++) {
      const currentFood = resultAllFood.products[i];
      let currentQuantity = currentFood.stock;

      if (total_quantity + currentQuantity > max_quantity) {
        currentQuantity = max_quantity - total_quantity;
      }
      if (currentQuantity > 0) {
        resultList = [
          ...resultList,
          {
            content: currentFood,
            quantity: currentQuantity
          }
        ];
      }

      if (total_quantity < max_quantity) {
        console.log(JSON.stringify(currentFood.name))
        console.log(`${total_quantity}/${max_quantity}`)
        total_quantity += currentQuantity;

        const nextChild = {
          parent_id: resultAllFood.parent_id,
          child_id: currentFood.id,
          quantity: currentQuantity
        };
        resultAllChild = [...resultAllChild, nextChild];
      }

      if (total_quantity == max_quantity) {
        
        const idx = subCategoryList.findIndex(c => c.id === currentSubCategory.id);
        setSubCategoryList([
          ...subCategoryList.slice(0, idx),
          {
            ...currentSubCategory,
            foodList: resultList
          },
          ...subCategoryList.slice(idx + 1)
        ]);
        
        subCategoryList[idx].foodList = resultList;
        childList.children = [...childList.children, ...resultAllChild];
        break;
      }
    }
  }

  const onAutoDistribute = async () => {
    childList.children = [];

    for (let i = 0; i < subCategoryList.length; i++) {
      const parentFood = subCategoryList[i];

      var currentData = {
        email: userInfo.email,
        token: userToken,
        limit: 1000,
        offset: 0,
        sort_field: 'expired_time',
        sort_by: 'asc',
        filter: 'in_stock',
        parent_id: parentFood.id
      }

      const targetResult = await axiosInstance.get(`/child/product/director`, { params: currentData })
      .then((res) => {
        return { resultAllFood: res.data, resultAllChild: [] };
      })
      .catch((err) => {
        console.log(err);
      })

      autoDistributeFood(targetResult);
    }
  };

  return (
    <>
      {Object.keys(subCategoryList).length !== 0 && 
      <>
      <Container>
        <Row className='mb-4'>
          <Col>
            <div className='d-flex justify-content-between align-items-center'>
              <h2 className='fw-bold'>Hạng mục con</h2>
              <span>
                <OverlayTrigger
                  placement={'left'}
                  overlay={
                    <Tooltip style={{ position: 'fixed '}}>
                      Hệ thống sẽ tự động chọn những Thực phẩm gần hết hạn
                    </Tooltip>
                }>
                  <Button variant='dark' onClick={onAutoDistribute}>
                    Tự động Điều phối
                  </Button>
                </OverlayTrigger>
              </span>
            </div>
          </Col>
        </Row>
        <Row xs={1}>
          {subCategoryList.map((subCategory, idx) => (
            <Col className='mb-3' key={idx}>
              <SubCategoryCard
                subCategory={subCategory}
                subCategoryList={subCategoryList} setSubCategoryList={setSubCategoryList}
                childList={childList} setChildList={setChildList} oldChildList={oldChildList}
                isError={isError} setIsError={setIsError}
              />
            </Col>
          ))}
        </Row>
      </Container>
      <div className='d-flex justify-content-center mt-2'>
        <Pagination
          pageCount={Math.ceil(subCategoryList.length / SUB_CATEGORY_COUNT)}
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