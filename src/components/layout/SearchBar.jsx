// Essentials
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchingBar() {
  return (
    <div className='searching-bar-header'>
      <Container className='searching-bar mx-6 d-flex'>
        <Row className='w-100 mt-2 mb-1'>
          <Col className='searching-bar-section pt-2'>
            <Form className="search-form d-flex">
              <Form.Control
                type="search"
                placeholder="Tìm kiếm"
                className="search-box"
                aria-label="Search"
              />
              <Button className='px-4 search-btn' variant='dark'>
                <FontAwesomeIcon icon={faSearch} />
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SearchingBar;