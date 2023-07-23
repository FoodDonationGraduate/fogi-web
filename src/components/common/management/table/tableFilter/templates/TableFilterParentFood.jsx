// Essentials
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';

// Components
import { TableFilterText, TableFilterRange } from '../components/TableFilterInput';
import TableFilterSelect from '../components/TableFilterSelect';
import TableFilterMultiple from '../components/TableFilterMultiple';
import TableFilterTime from '../components/TableFilterTime';

// Reducer
import { retrieveAllCategories } from 'components/redux/reducer/CategoryReducer';

const TableFilterParentFood = ({
  filterList
}) => {
  // Categories
  const dispatch = useDispatch(); const navigate = useNavigate();
  const allCategories = useSelector(state => state.categoryReducer.allCategories);
  useEffect(() => {
    dispatch(retrieveAllCategories(navigate));
  }, []);

  const unitList = [
    { value: '', label: 'Tất cả' },
    { value: 'kg', label: 'Kg' },
    { value: 'item', label: 'Cái' }
  ];

  return (
    <>
      <Col className='mn-table-item-col' xs={3}>
        <TableFilterText
          input={filterList[0].state} setInput={filterList[0].setState}
          placeholder='Tên Hạng mục con'
        />
      </Col>
      <Col className='mn-table-item-col' xs={3}>
        <TableFilterMultiple
          title='Lọc theo hạng mục'
          activeOptionList={filterList[1].state} setActiveOptionList={filterList[1].setState}
          optionList={allCategories.categories ? allCategories.categories.map((category) => { return { value: category.id, image: category.image, label: category.name } }) : []}
          addTip='Thêm hạng mục vào danh sách lọc'
        />
      </Col>
      <Col className='mn-table-item-col' xs={2}>
        <Row>
          <Col className='ps-0' xs={6}>
            <TableFilterRange
              range={filterList[2].state} setRange={filterList[2].setState}
              placeholder='Tất cả'
            />
          </Col>
          <Col className='px-0' xs={6}>
            <TableFilterSelect
              activeOption={filterList[3].state} setActiveOption={filterList[3].setState}
              optionList={unitList}
            />
          </Col>
        </Row>
      </Col>
      <Col className='mn-table-item-col' xs={2}>
        <TableFilterTime
          date={filterList[4].state} setDate={filterList[4].setState}
        />
      </Col>
      <Col className='mn-table-item-col' xs={2}>
        <TableFilterTime
          date={filterList[5].state} setDate={filterList[5].setState}
        />
      </Col>
    </>
  );
};

export default TableFilterParentFood;
