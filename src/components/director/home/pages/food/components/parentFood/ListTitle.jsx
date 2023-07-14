// Essentials
import React, { useState, useEffect } from 'react';
import { Button, Col, Dropdown, Row, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// Components
import SubCategoryModal from './SubCategoryModal';

// Styling
import 'assets/css/Fogi.css';

// Reducers
import { retrieveAllCategories, setCurrentCategory } from 'components/redux/reducer/CategoryReducer';

// Utility
import { useResizer } from 'utils/helpers/Resizer';

const ListTitle = () => {
  // Constants
  const size = useResizer();
  const navigate = useNavigate(); const dispatch = useDispatch();
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

  // SubCategory Modal
  const [show, setShow] = useState(false);
  const onShow = () => { setShow(true); }
  const onClose = () => { setShow(false); }

  return (
    <>
      <Row className='mb-4'>
        <Row>
          <Col className='ps-0'>
            <h2 className='fw-bold'>Thực phẩm Đại diện</h2>
          </Col>
          <Col className={`${size > 1 ? 'pe-0 d-flex justify-content-end' : 'ps-0 mt-2'}`} md={4}>
            <Stack direction='horizontal' gap={2}>
              <Button
                className='fogi' variant='primary'
                onClick={onShow}
              >
                Thêm mới
              </Button>
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
            </Stack>
          </Col>
        </Row>
      </Row>
    </>
  );
};

export default ListTitle;
