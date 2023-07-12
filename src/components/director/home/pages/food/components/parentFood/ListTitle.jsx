// Essentials
import React, { useEffect } from 'react';
import { Col, Dropdown, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

// Styling
import 'assets/css/Fogi.css';

// Reducers
import { retrieveAllCategories, setCurrentCategory } from 'components/redux/reducer/CategoryReducer';

const ListTitle = () => {
  // Constants
  const navigate = useNavigate(); const dispatch = useDispatch();
  const { id } = useParams();

  // Categories
  const allCategories = useSelector(state => state.categoryReducer.allCategories);
  const currentCategory = useSelector(state => state.categoryReducer.currentCategory);
  useEffect(() => {
    dispatch(retrieveAllCategories(navigate));
    if (!id) {
      dispatch(setCurrentCategory({}));
    }
  }, []);
  
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

  return (
    <Row className='mb-4'>
      <Row>
        <Col className='ps-0'>
          <h2 className='fw-bold'>Thực phẩm Đại diện</h2>
        </Col>
        <Col className='pe-0 d-flex justify-content-end' xs={3}>
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
        </Col>
      </Row>
    </Row>
  );
};

export default ListTitle;
