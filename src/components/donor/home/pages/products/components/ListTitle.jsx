// Essentials
import * as React from 'react';
import { Button, Col, Row, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

// Styling
import 'assets/css/Fogi.css';

// Assets
import { MdAddCircle, MdAssignment } from 'react-icons/md';

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
  const question = useSelector(state => state.modalReducer.question);
  const selectedAddress = useSelector(state => state.addressReducer.selectedAddress);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createRequest = () => {
    dispatch(setModalQuestion('Bạn có muốn tạo yêu cầu cho không?'));
    dispatch(showQuestionModal());
    console.log(selectedAddress)
  }
  React.useEffect(() => {
    if (modalLogic && question === 'Bạn có muốn tạo yêu cầu cho không?') {
        dispatch(cancelQuestionModal());
        dispatch(postDonorRequest(selectedAddress, {userInfo, userToken}, navigate));
    }
  }, [modalLogic])

  return (
    <Row className='mb-4'>
      <Col className='ps-0'>
        <h2 className='fw-bold'>Túi quyên góp</h2>
      </Col>
      <Col className='pe-0 d-flex justify-content-end' xs={6}>
        <Stack direction='horizontal' gap={2}>
          <Button
            className='fogi' variant='primary'
            onClick={onShow}
          >
            {size > 1 ? 
              <>Thêm Thực phẩm</> : 
              <MdAddCircle className='mb-1' />
            }
          </Button>
          <Button
            variant='outline-secondary'
            onClick={() => createRequest()}
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
