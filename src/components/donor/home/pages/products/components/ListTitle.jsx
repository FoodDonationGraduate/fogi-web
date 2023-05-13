// Essentials
import * as React from 'react';
import { Button, Col, Row, Stack } from 'react-bootstrap';

// Styling
import 'assets/css/Fogi.css';

// Assets
import { MdAddCircle, MdAssignment } from 'react-icons/md';

// Utility
import { useResizer } from 'utils/helpers/Resizer';

const ListTitle = ({
  onShow
}) => {
  const size = useResizer();

  return (
    <Row className='mb-4'>
      <Col className='ps-0'>
        <h2 className='fw-bold'>Danh sách món ăn</h2>
      </Col>
      <Col className='pe-0 d-flex justify-content-end' xs={6}>
        <Stack direction='horizontal' gap={2}>
          <Button
            className='fogi' variant='primary'
            onClick={onShow}
          >
            {size > 1 ? 
              <>Thêm món ăn</> : 
              <MdAddCircle className='mb-1' />
            }
          </Button>
          <Button
            variant='outline-secondary'
          >
          {size > 1 ? 
            <>Tạo yêu cầu</> : 
            <MdAssignment className='mb-1' />
          }
          </Button>
        </Stack>
      </Col>
    </Row>
  );
};

export default ListTitle;
