// Essentials
import React, { useState } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { EqualHeight } from 'react-equal-height';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router';

// Components
import RequestCard from 'components/common/request/RequestCard';
import Pagination from 'components/common/pagination/Pagination';
import CommonNotFoundBody from 'components/common/CommonNotFoundBody';

const RequestList = ({
  currentType,
  currentStatus
}) => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const REQUEST_COUNT = 4; // per page
  const [page, setPage] = useState(0); // a.k.a activeIdx

  const onChangePage = async (idx) => {
    setPage(idx);
  };

  const sampleData = {
    address: "227 Đ. Nguyễn Văn Cừ, Phường 4, Quận 5, Thành phố Hồ Chí Minh",
    created_time: "2023-05-23 14:13:24",
    id: 89,
    products: [
        {
            category_name: "Đông lạnh",
            expired_time: "2023-06-23 00:00:00",
            image_filename: "product_image_487849f0ad47f36af0ab",
            name: "Thịt bò tươi",
            quantity: 2,
            unit: "kg"
        }
    ],
    status: "shipping",
    volunteer: {
        address: "280 Đ. An D. Vương, Phường 4, Quận 5, Thành phố Hồ Chí Minh",
        avatar: "akafatana@gmail.com_avatar",
        email: "akafatana@gmail.com",
        name: "Duy",
        phone: "0919127311",
        username: "akafatana"
    },
    user: {
        address: "227 Nguyễn Văn Cừ",
        avatar: "doneetung006@yopmail.com_avatar",
        email: "doneetung006@yopmail.com",
        name: "Trần Thanh Tùng",
        phone: "0919127311",
        user_type: "donee"
    }
  };

  return (
    <div>
      {/* {(Object.keys(allRequests).length !== 0 && allRequests.total_requests !== 0) &&  */}
      {true &&
        <Container>
          <Row>
            <Col className='px-0'>
              <Row className='mb-4' xs={1} md={2} lg={2} >
                <EqualHeight>
                  {/* {Object.keys(allRequests).length !== 0 && allRequests.requests.map((request) => (
                    <Col className='mb-4' key={request.id}>
                      <div className='order-item' onClick={() => navigate(`/donor/request/${request.id}`)}>
                        <RequestCard order={request} isDirector={true} />
                      </div>
                    </Col>
                  ))} */}
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <Col className='mb-4' key={idx}>
                      <div className='order-item'>
                        <RequestCard order={sampleData} isDirector={true} />
                      </div>
                    </Col>
                  ))}
                </EqualHeight>
              </Row>
              <div className='d-flex justify-content-center'>
                <Pagination
                  pageCount={Math.ceil(30 / REQUEST_COUNT)}
                  // pageCount={Math.ceil(allRequests.total_requests / REQUEST_COUNT)}
                  activeIdx={page}
                  onChangePage={onChangePage}
                />
              </div>
            </Col>
          </Row>
        </Container>
      }
      {/* {(Object.keys(allRequests).length === 0 || allRequests.total_requests === 0) && 
        <CommonNotFoundBody title='Chưa có Yêu cầu nào'/>
      } */}
    </div>
  );
};

export default RequestList;
