// Essentials
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

// Constants
import UnsortedFoodHeaders from 'utils/constants/headerList/UnsortedFoodHeaders.json';

// Components
import Spinner from 'components/common/Spinner';
import Table from 'components/common/management/table/Table';
import Title from 'components/common/management/common/Title';
import FoodModal from 'components/director/home/pages/food/components/food/FoodModal';

// Reducers
import { retrieveAllUnsortedFood } from 'components/redux/reducer/DirectorReducer';

const ParentFoodPage = () => {
  // Constants
  const allUnsortedFood = useSelector(state => state.directorReducer.allUnsortedFood);
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const dispatch = useDispatch(); const navigate = useNavigate();

  // Spinner
  const [isLoading, setIsLoading] = useState(false);

  // Unsorted Food Modal
  const [targetFood, setTargetFood] = useState(null);
  const [foodShow, setFoodShow] = useState(false);
  const onFoodShow = () => setFoodShow(true);
  const onFoodClose = () => setFoodShow(false);
  const onFoodSetAndShow = (food) => {
    setTargetFood(food);
    onFoodShow();
  };

  // Filters
  const [query, setQuery] = useState(null);
  const [expiredTime, setExpiredTime] = useState([]);
  const [stock, setStock] = useState({ value: '', label: 'Tất cả' })

  // Sort Field
  const [sortFields, setSortFields] = useState([]);

  // Pagination handling
  const FOOD_COUNT = 16; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx

  // Get parent food
  useEffect(() => {
    setPage(0);
  }, [query, stock, expiredTime, sortFields]);

  useEffect(() => { 
    var data = {
      limit: FOOD_COUNT,
      offset: page * FOOD_COUNT,
      search_query: query,

      setIsLoading
    };

    dispatch(retrieveAllUnsortedFood(
      data,
      { userInfo, userToken },
      navigate
    ));
  }, [page, query, stock, expiredTime, sortFields]);

  return (
    <>
      {isLoading && <Spinner />}
      <Title title='Phân loại Thực phẩm' />
      <Table
        headerList={UnsortedFoodHeaders.allHeaders}
        filterList={[
          { state: query, setState: setQuery },
          { state: expiredTime, setState: setExpiredTime },
          { state: stock, setState: setStock }
        ]}
        itemList={allUnsortedFood.products}
        total={allUnsortedFood.total_products} pageCount={FOOD_COUNT} page={page} setPage={setPage}
        sortFields={sortFields} setSortFields={setSortFields}
        actionList={[
          { action: (food) => onFoodSetAndShow(food) }
        ]}
        type='unsorted-food'
      />
      {targetFood &&
        <FoodModal
          food={targetFood}
          foodList={allUnsortedFood}
          setTargetFood={setTargetFood}
          show={foodShow} onShow={onFoodShow} onClose={onFoodClose}
          limit={FOOD_COUNT} offset={page * FOOD_COUNT}
        />
      }
    </>
  );
};

export default ParentFoodPage;