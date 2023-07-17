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
import CompactDropdown from 'components/common/search/CompactDropdown';
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
      navigate(`/${userInfo.user_type}/parent-food`);
      dispatch(setCurrentCategory({}));
      return;
    }
    navigate(`/${userInfo.user_type}/category/${eventKey}`);
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
  const filterList = [
    { value: 'updated_time', label: 'Thời gian cập nhật' },
    { value: 'created_time', label: 'Thời gian tạo' }
  ];

  const [sortBy, setSortBy] = useState('desc');

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
      category_id: categoryId,
      search_query: queryData,
      sort_field: filterList[activeFilterIdx].value,
      sort_by: sortBy
    };

    dispatch(retrieveAllParentFood(
      data,
      { userInfo, userToken },
      navigate
    ))
  }, [categoryId, page, queryData, activeFilterIdx, sortBy]);

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
                <ListTitle title={'Hạng mục con'} />
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
                <CompactDropdown
                  activeIdx={activeFilterIdx} setActiveIdx={setActiveFilterIdx}
                  list={filterList}
                  sortBy={sortBy} setSortBy={setSortBy}
                />
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
            <CommonNotFoundBody title='Chưa có Hạng mục con nào'/>
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