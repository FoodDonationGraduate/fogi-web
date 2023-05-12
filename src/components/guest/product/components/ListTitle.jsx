// Essentials
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Container, Col, Dropdown, DropdownButton, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

// Styling
import 'assets/css/Fogi.css';

// Utility
import { useResizer } from 'utils/helpers/Resizer';

//Components
import { setTypeOfSort } from 'components/redux/reducer/ProductReducer';

const ListTitle = ({title}) => {
  const sort = useSelector(state => state.productReducer.sort);

  const dispatch = useDispatch();

  // Responsive handling
  let size = useResizer();
  const [shownTitle, setShownTitle] = useState(title)

  useEffect(() => {
    if (size < 1) setShownTitle(title.substring(0, (size + 1) * 20) + '...');
    else setShownTitle(title);
  }, [size]);

  return (
    <div className='bg'>
      <Container>
        <Row className='pt-4'>
          <Col>
            <h2>{shownTitle}</h2>
          </Col>
          <Col className='d-flex justify-content-end' xs={2}>
            <DropdownButton
              variant='outline-secondary'
              title={sort !== '' ? (sort === 'expired_time' ? 'Thời gian' : 'Số lượng') : 'Sắp xếp'}
            >
              <Dropdown.Item onClick={() => dispatch(setTypeOfSort('expired_time'))}>Thời gian</Dropdown.Item>
              <Dropdown.Item onClick={() => dispatch(setTypeOfSort('stock'))}>Số lượng</Dropdown.Item>
              <Dropdown.Item onClick={() => dispatch(setTypeOfSort(''))}>Sắp xếp</Dropdown.Item>
            </DropdownButton>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ListTitle;
