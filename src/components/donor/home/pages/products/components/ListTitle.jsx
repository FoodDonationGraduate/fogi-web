// Essentials
import React from 'react';
import { Button, Col, OverlayTrigger, Row, Stack, Tooltip } from 'react-bootstrap';
import { useSelector } from 'react-redux';

// Styling
import 'assets/css/Fogi.css';

// Assets
import { MdAddCircle, MdAssignment } from 'react-icons/md';

// Utility
import { useResizer } from 'utils/helpers/Resizer';

const ListTitle = ({
  onShowAddFood,
  onShowCreateRequest
}) => {
  const size = useResizer();
  const donorProducts = useSelector(state => state.productReducer.donorProducts);
  const selectedAddress = useSelector(state => state.addressReducer.selectedAddress)
  return (
    <>
      <Row className='mb-4'>
        <Col className='ps-0'>
          <h2 className='fw-bold'>Túi quyên góp</h2>
        </Col>
        <Col className='pe-0 d-flex justify-content-end' xs={6}>
          <Stack direction='horizontal' gap={2}>
            <Button
              className='fogi' variant='primary'
              onClick={onShowAddFood}
            >
              {size > 1 ? 
                <>Thêm Thực phẩm</> : 
                <MdAddCircle className='mb-1' />
              }
            </Button>
            {(donorProducts.total_products > 0 && selectedAddress.address !== 'Địa chỉ của bạn')?
              <Button
                variant='outline-dark'
                onClick={onShowCreateRequest}
              >
                {size > 1 ? 
                  <>Tạo yêu cầu</> : 
                  <MdAssignment className='mb-1' />
                }
              </Button>
              :
              <OverlayTrigger
                placement={'bottom'}
                overlay={
                  <Tooltip style={{ position: 'fixed '}}>
                    {donorProducts.total_products === 0 
                      ? 'Chưa có Thực phẩm để tạo Yêu cầu'
                      : 'Vui lòng chọn địa điểm mặc định'}
                  </Tooltip>
                }
              >
                <span>
                  <Button
                    variant='outline-dark'
                    disabled
                  >
                    {size > 1 ? 
                      <>Tạo yêu cầu</> : 
                      <MdAssignment className='mb-1' />
                    }
                  </Button>
                </span>
              </OverlayTrigger>
            }
          </Stack>
        </Col>
      </Row>
    
    </>
  );
};

export default ListTitle;
