// Essentials
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router';

// Form handling
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

function SearchingBar() {
  const search = useLocation().search;
  const queryData = new URLSearchParams(search).get('query');

  const formSchema = Yup.object().shape({
    query: Yup.string().required('')
  });
  const formOptions = { resolver: yupResolver(formSchema) };
  const { register, handleSubmit } = useForm(formOptions);

  const navigate = useNavigate(); 
  const onSubmit = (data) => {
    if (data.query !== '') {
      navigate(`/products?query=${data.query}`);
    }
  }
  return (
    <div className='searching-bar-header'>
      <Container className='searching-bar mx-6 d-flex'>
        <Row className='w-100 mt-2 mb-1'>
          <Col className='searching-bar-section pt-2'>
            <Form className="search-form d-flex" onSubmit={handleSubmit(onSubmit)}>
              <Form.Control
                type="search"
                placeholder="Tìm kiếm"
                defaultValue={queryData ? queryData : ''}
                className="search-box"
                aria-label="Search"
                {...register("query")}
              />
              <Button className='px-4 search-btn' type='submit' variant='dark'>
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