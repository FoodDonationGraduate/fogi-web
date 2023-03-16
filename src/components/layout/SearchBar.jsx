import { Form, Button, Dropdown, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import BarFilter from "assets/images/bar_filter.png"

function SearchingBar() {
  return (
    <div className='searching-bar-header'>
      <Container className='searching-bar mx-6 d-flex'>
        <Row className='w-100 mt-2 mb-1'>
          <Col xs={9} className='searching-bar-section pt-2'>
            <Form className="search-form d-flex">
              <Form.Control
                type="search"
                placeholder="Search for item"
                className="search-box"
                aria-label="Search"
              />
              <Button className='px-4' variant='dark'>
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Form>
          </Col>
          {/* <Col xs={12} md={3} className='searching-bar-section pt-2'>
            <Dropdown className='d-flex'>
              <Dropdown.Toggle id="dropdown-basic" className='dropdown-toggle d-flex justify-content-right'>
                  <img className='bar-filter bar-filter-img' src={BarFilter} alt='filter icon'></img>
                  <p className='bar-filter bar-filter-title'>Sort by...</p>
              </Dropdown.Toggle >
              <Dropdown.Menu className='dropdown-menu'>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col> */}
        </Row>
      </Container>
    </div>
  );
}

export default SearchingBar;