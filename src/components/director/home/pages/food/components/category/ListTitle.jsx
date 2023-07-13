// Essentials
import * as React from 'react';
import { Button, Col, Row, Stack } from 'react-bootstrap';

// Styling
import 'assets/css/Fogi.css';

// Assets
import { MdAddCircle } from 'react-icons/md';

// Utility
import { useResizer } from 'utils/helpers/Resizer';

const ListTitle = ({
  onShow
}) => {
  const size = useResizer();

  const showAddCategoryModal = () => {
    onShow();
  };

  return (
    <Row className='mb-4'>
      <Row>
        <Col className='ps-0'>
          <h2 className='fw-bold'>Hạng mục</h2>
        </Col>
        <Col className='pe-0 d-flex justify-content-end' xs={3}>
          <Stack direction='horizontal' gap={2}>
            <Button
              className='fogi' variant='primary'
              onClick={showAddCategoryModal}
            >
              {size > 1 ? 
                <>Thêm Phân loại</> : 
                <MdAddCircle className='mb-1' />
              }
            </Button>
          </Stack>
        </Col>
      </Row>
    </Row>
  );
};

export default ListTitle;
