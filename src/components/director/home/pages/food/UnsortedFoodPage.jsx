// Essentials
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Dropdown, Row, Stack } from 'react-bootstrap';
import { EqualHeight } from 'react-equal-height';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Components
import ListTitle from 'components/common/ListTitle';
import Pagination from 'components/common/pagination/Pagination';
import CommonNotFoundBody from 'components/common/CommonNotFoundBody';
import SearchBar from 'components/common/search/SearchBar';
import SortByButton from 'components/common/search/SortByButton';

import FoodCard from './components/food/FoodCard';
import FoodModal from './components/food/FoodModal';

// Reducers
import { retrieveAllUnsortedFood } from 'components/redux/reducer/DirectorReducer';

const CategoryDetailsPage = () => {
  // Constants
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const dispatch = useDispatch(); const navigate = useNavigate();

  // Unsorted food
  const allUnsortedFood = useSelector(state => state.directorReducer.allUnsortedFood);
  const [targetFood, setTargetFood] = useState(null);
  const FOOD_COUNT = 4;
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = async (idx) => {
    setPage(idx);
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
  const filterList = ['stock'];
  const getFilterLabel = (filter) => {
    switch (filter) {
      case 'stock':
        return 'Tồn kho';
    }
  };
  
  const onSelectFilter = (eventKey, event) => {
    setActiveFilterIdx(eventKey);
  };

  const [isAsc, setIsAsc] = useState(false);

  useEffect(() => {
    dispatch(retrieveAllUnsortedFood(
      {
        limit: FOOD_COUNT,
        offset: page * FOOD_COUNT,
        search_query: queryData,
        sort_field: filterList[activeFilterIdx],
        sort_by: isAsc ? 'asc' : 'desc'
      },
      { userInfo, userToken },
      navigate
    ))
  }, [page, queryData, activeFilterIdx, isAsc]);
  
  const [foodShow, setFoodShow] = useState(false);
  const onFoodShow = () => setFoodShow(true);
  const onFoodClose = () => setFoodShow(false);

  return (
    <>
      <Row>
        <Col className='px-0'>
          <Row>
            <Col className='ps-0'>
              <ListTitle title={'Thực phẩm chưa phân loại'} />
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
          <Row className='mb-2' xs={1}>
            <EqualHeight>
              {Object.keys(allUnsortedFood).length !== 0 && allUnsortedFood.products.map((food, idx) => (
                <Col className='mb-3' key={idx}>
                  <FoodCard
                    food={food}
                    onFoodShow={onFoodShow}
                    setTargetFood={setTargetFood}
                  />
                </Col>
              ))}
              {(Object.keys(allUnsortedFood).length === 0 || allUnsortedFood.total_products === 0) && 
                <CommonNotFoundBody title='Không có Thực phẩm chưa phân loại'/>
              }
              <div className='d-flex justify-content-center mt-4'>
                <Pagination
                  pageCount={Math.ceil(allUnsortedFood.total_products / FOOD_COUNT)}
                  activeIdx={page}
                  onChangePage={onChangePage}
                />
              </div>
            </EqualHeight>
          </Row>
          {targetFood &&
            <FoodModal
              food={targetFood}
              foodList={allUnsortedFood}
              setTargetFood={setTargetFood}
              show={foodShow} onShow={onFoodShow} onClose={onFoodClose}
              limit={FOOD_COUNT} offset={page * FOOD_COUNT}
            />
          }
        </Col>
      </Row>
    </>
  );
};

export default CategoryDetailsPage;