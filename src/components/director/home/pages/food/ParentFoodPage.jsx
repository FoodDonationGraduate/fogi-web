// Essentials
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Dropdown, Row, Stack } from 'react-bootstrap';
import { EqualHeight } from 'react-equal-height';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Components
import CommonNotFoundBody from 'components/common/CommonNotFoundBody';
import SubCategoryCard from 'components/common/category/SubCategoryCard';
import SearchBar from 'components/common/search/SearchBar';
import SortByButton from 'components/common/search/SortByButton';
import ListTitle from 'components/common/ListTitle';
import Pagination from 'components/common/pagination/Pagination';

import SubCategoryModal from './components/parentFood/SubCategoryModal';

// Reducers
import { retrieveAllParentFood } from 'components/redux/reducer/DirectorReducer';
import { retrieveAllCategories, setCurrentCategory } from 'components/redux/reducer/CategoryReducer';

const ParentFoodPage = () => {
  // Constants
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const dispatch = useDispatch(); const navigate = useNavigate();
  const { categoryId } = useParams();

  // Categories
  const allCategories = useSelector(state => state.categoryReducer.allCategories);
  const currentCategory = useSelector(state => state.categoryReducer.currentCategory);
  useEffect(() => {
    dispatch(retrieveAllCategories(navigate));
    if (!categoryId) {
      dispatch(setCurrentCategory({}));
    } else {
      dispatch(setCurrentCategory(allCategories.categories.find(c => c.id == categoryId)));
    }
  }, [categoryId]);
  
  const onSelect = (eventKey, event) => {
    if (eventKey == -1) {
      navigate(`/director/parent-food`);
      dispatch(setCurrentCategory({}));
      return;
    }
    navigate(`/director/category/${eventKey}`);
    dispatch(setCurrentCategory(
      allCategories.categories.find(c => c.id == eventKey)
    ));
  };

  // Search
  const [queryData, setQueryData] = useState('')
  const formSchema = Yup.object().shape({
    query: Yup.string().required('')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, watch, handleSubmit } = useForm(formOptions);
  const onSubmit = (data) => {
    setQueryData(data.query);
  }
  useEffect(() => {
    let data = watch('query');
    if (data === '') {
      setQueryData(data);
    }
  }, [watch('query')]);
  
  // Filter
  const [activeFilterIdx, setActiveFilterIdx] = useState(0);
  const filterList = ['updated_time', 'created_time'];
  const getFilterLabel = (filter) => {
    switch (filter) {
      case 'updated_time':
        return 'Thời gian cập nhật';
      case 'created_time':
        return 'Thời gian tạo';
    }
  };
  
  const onSelectFilter = (eventKey, event) => {
    setActiveFilterIdx(eventKey);
  };

  const [isAsc, setIsAsc] = useState(false);

  // Parent Food
  const allParentFood = useSelector(state => state.directorReducer.allParentFood);

  // Pagination handling
  const PARENT_FOOD_COUNT = 20; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = (idx) => {
    setPage(idx);
  };

  // Get all parent food
  useEffect(() => {
    setPage(0);
  }, [queryData]);

  useEffect(() => {
    var data = {
      limit: PARENT_FOOD_COUNT,
      offset: page * PARENT_FOOD_COUNT,
      search_query: queryData,
      category_id: categoryId,
      sort_field: filterList[activeFilterIdx],
      sort_by: isAsc ? 'asc' : 'desc'
    };

    dispatch(retrieveAllParentFood(
      data,
      { userInfo, userToken },
      navigate
    ))
  }, [categoryId, page, queryData, activeFilterIdx, isAsc]);

  // SubCategory Modal
  const [show, setShow] = useState(false);
  const onShow = () => { setShow(true); }
  const onClose = () => { setShow(false); }

  return (
    <>
      <Row>
        <Col className='px-0'>
          <Row>
            <Col className='ps-0'>
              <div className='d-flex justify-content-between'>
                <ListTitle title={'Thực phẩm Đại diện'} />
                <Dropdown onSelect={onSelect}>
                  <Dropdown.Toggle variant="outline-secondary">
                    {Object.keys(currentCategory).length > 0 ? currentCategory.name : 'Tất cả'}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item eventKey={-1}>Tất cả</Dropdown.Item>
                    {Object.keys(allCategories).length > 0 && allCategories.categories.map((category, idx) => (
                      <Dropdown.Item key={idx} eventKey={category.id}>{category.name}</Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Col>
          </Row>

          <Row className='mb-4'>
            <Col xs={4}>
              <Button
                className='fogi' variant='primary'
                onClick={onShow}
              >
                Thêm mới
              </Button>
            </Col>
            <Col>
              <Stack className='d-flex justify-content-end' direction='horizontal' gap={2}>
                <SearchBar register={register} query={'query'} onSubmit={handleSubmit(onSubmit)} />
                <Dropdown onSelect={onSelectFilter}>
                  <Dropdown.Toggle variant="outline-secondary">
                    {getFilterLabel(filterList[activeFilterIdx])}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {filterList.map((filter, idx) => (
                      <Dropdown.Item key={idx} eventKey={idx}>{getFilterLabel(filter)}</Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
                <SortByButton isAsc={isAsc} setIsAsc={setIsAsc} />
              </Stack>
            </Col>
          </Row>

          <Row className='mb-2' xs={2} sm={4} xl={5}>
            <EqualHeight>
              {Object.keys(allParentFood).length !== 0 && allParentFood.products.map((parentFood, idx) => (
                <Col className='mb-4' key={idx}>
                  <SubCategoryCard
                    subCategory={parentFood}
                  />
                </Col>
              ))}
            </EqualHeight>
          </Row>
          {(Object.keys(allParentFood).length === 0 || allParentFood.total_products === 0) && 
            <CommonNotFoundBody title='Chưa có Thực phẩm Đại diện nào'/>
          }
        </Col>
      </Row>
      <div className='d-flex justify-content-center'>
        <Pagination
          pageCount={Math.ceil(allParentFood.total_products / PARENT_FOOD_COUNT)}
          activeIdx={page}
          onChangePage={onChangePage}
        />
      </div>
      <SubCategoryModal
        show={show} onShow={onShow} onClose={onClose}
      />
    </>
  );
};

export default ParentFoodPage;