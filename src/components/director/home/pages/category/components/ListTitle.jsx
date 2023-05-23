// Essentials
import * as React from 'react';
import { Button, Col, Row, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

// Styling
import 'assets/css/Fogi.css';

// Assets
import { MdAddCircle } from 'react-icons/md';

// Utility
import { useResizer } from 'utils/helpers/Resizer';

// Components
import { cancelQuestionModal, setModalQuestion, showQuestionModal } from 'components/redux/reducer/ModalReducer';
import { postDonorRequest } from 'components/redux/reducer/RequestReducer';

const ListTitle = ({
  onShow
}) => {
  const size = useResizer();
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const userToken = useSelector(state => state.authenticationReducer.token);
  const modalLogic = useSelector(state => state.modalReducer.logic);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (modalLogic) {
        dispatch(cancelQuestionModal())
        dispatch(postDonorRequest({userInfo, userToken}, navigate))
    }
  })

  return (
    <Row className='mb-4'>
      <Col className='ps-0'>
        <h2 className='fw-bold'>Phân loại Thực phẩm</h2>
      </Col>
      <Col className='pe-0 d-flex justify-content-end' xs={3}>
        <Stack direction='horizontal' gap={2}>
          <Button
            className='fogi' variant='primary'
            onClick={onShow}
          >
            {size > 1 ? 
              <>Thêm Phân loại</> : 
              <MdAddCircle className='mb-1' />
            }
          </Button>
        </Stack>
      </Col>
    </Row>
  );
};

export default ListTitle;
