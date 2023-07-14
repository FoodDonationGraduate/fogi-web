// Essentials
import React from 'react';
import { Button, Form } from 'react-bootstrap';

// Assets
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({
  register, query,
  onSubmit
}) => {
  
  return (
    <>
      <Form className="search-form d-flex justify-content-right" onSubmit={onSubmit}>
        <Form.Control
          type="search"
          placeholder="Tìm kiếm"
          className="search-box"
          aria-label="Search"
          {...register(query)}
        />
        <Button className='px-4 search-btn' type='submit' variant='dark'>
          <FontAwesomeIcon icon={faSearch} />
        </Button>
      </Form> 
    </>
  );
}

export default SearchBar;
