// Essentials
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Col, Dropdown, Row, Stack } from 'react-bootstrap';
import { EqualHeight } from 'react-equal-height';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

// Components
import BackButton from 'components/common/BackButton';
import ListTitle from 'components/common/ListTitle';
import Pagination from 'components/common/pagination/Pagination';
import CommonNotFoundBody from 'components/common/CommonNotFoundBody';
import SubCategoryInfoCard from './components/parentFood/SubCategoryInfoCard';
import SearchBar from 'components/common/search/SearchBar';
import SortByButton from 'components/common/search/SortByButton';
import FoodCard from './components/food/FoodCard';
import FoodModal from './components/food/FoodModal';
// Reducers
import { retrieveCurrentParentFood, retrieveAllFood } from 'components/redux/reducer/DirectorReducer';

const FoodPage = () => {
  // Constants
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const dispatch = useDispatch(); const navigate = useNavigate();
  const { parentFoodId } = useParams();

  // Parent Food
  const currentParentFood = useSelector(state => state.directorReducer.currentParentFood);
  useEffect(() => {
    dispatch(retrieveCurrentParentFood(
      { parent_id: parentFoodId },
      { userInfo, userToken },
      navigate
    ));
  }, []);

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

  // Food
  const foodList = useSelector(state => state.directorReducer.allFood);
  const [targetFood, setTargetFood] = useState(null);
  const FOOD_COUNT = 4;
  const [page, setPage] = useState(0); // a.k.a activeIdx
  const onChangePage = async (idx) => {
    setPage(idx);
  };
  
  const [foodShow, setFoodShow] = useState(false);
  const onFoodShow = () => setFoodShow(true);
  const onFoodClose = () => setFoodShow(false);

  useEffect(() => {
    dispatch(retrieveAllFood(
      {
        limit: FOOD_COUNT,
        offset: page * FOOD_COUNT,
        parent_id: parentFoodId,
        search_query: queryData,
        sort_field: filterList[activeFilterIdx],
        sort_by: isAsc ? 'asc' : 'desc'
      },
      { userInfo, userToken },
      navigate
    ))
  }, [page, queryData, activeFilterIdx, isAsc]);

  return (
    <>
      <Row>
        <Col className='px-0'>
          <Row className='mb-4'>
            <Col>
              <div className='mb-2'>
                <BackButton />
              </div>
              {currentParentFood &&
                <SubCategoryInfoCard
                  subCategory={currentParentFood}
                />
              }
            </Col>
          </Row>

          <Row>
            <Col className='px-0'>
              <Row>
                <Col className='ps-0'>
                  <ListTitle title={'Thực phẩm'} />
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
                  {Object.keys(foodList).length > 0 && foodList.products.map((food, idx) => (
                    <Col className='mb-3' key={idx}>
                      <FoodCard
                        food={food}
                        onFoodShow={onFoodShow}
                        setTargetFood={setTargetFood}
                        isDisplay={true}
                      />
                    </Col>
                  ))}
                  {(Object.keys(foodList).length === 0 || foodList.total_products === 0) && 
                    <CommonNotFoundBody title='Chưa có thực phẩm nào'/>
                  }
                  <div className='d-flex justify-content-center mt-4'>
                    <Pagination
                      pageCount={Math.ceil(foodList.total_products / FOOD_COUNT)}
                      activeIdx={page}
                      onChangePage={onChangePage}
                    />
                  </div>
                </EqualHeight>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      {targetFood &&
        <FoodModal
          food={targetFood}
          foodList={foodList}
          isSorted={true}
          show={foodShow} onShow={onFoodShow} onClose={onFoodClose}
          limit={FOOD_COUNT} offset={page * FOOD_COUNT}
        />
      }
    </>
  );
};

export default FoodPage;