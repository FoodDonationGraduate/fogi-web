// Essentials
import React, { useState, useEffect } from 'react';
import { Button, Form, Modal, Stack } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';

// Assets imports
import { FaExclamationTriangle } from 'react-icons/fa';

// Reducer
import { createReport } from 'components/redux/reducer/RequestReducer';

const ReportModal = ({
  show,
  onClose,
  volunteerInfo,
  userInfo,
  userToken,
  order
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [target, setTarget] = useState(null);
  const [otherReason, setOtherReason] = useState('');
  const handleChange = (idx) => {
    setTarget(idx);
    setIsSubmitted(false);
  };

  const options = [
    'Không liên lạc được với tình nguyện viên',
    'Tình nguyện viên không trung thực',
    `Tình nguyện viên ${userInfo.user_type === 'donee' ? 'giao' : 'đến nhận'} thực phẩm quá lâu`,
    'Khác'
  ];

  const onSubmit = () => {
    const reason = target !== options.length - 1 ? options[target] : otherReason;
    setIsSubmitted(true);
    if (reason.length === 0) return;
    dispatch(createReport({request_id: order.id, reason: reason}, {email: volunteerInfo.email}, {userInfo, userToken},navigate));
    onClose();
    setIsSubmitted(false);
    setTarget(null);
    setOtherReason('');
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Báo cáo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>

            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold'}}>
                Bạn đang báo cáo
              </Form.Label>

              <Stack direction='horizontal' gap={3}>
                <img src={`https://bachkhoi.online/static/${volunteerInfo.avatar}`} className='order-item-volunteer-avatar' />
                <Stack direction='vertical'>
                  <div className='order-item-volunteer-label'>Tình nguyện viên</div>
                  <div className='order-item-volunteer-name'>{volunteerInfo.name}</div>
                </Stack>
              </Stack>
            </Form.Group>

            <Form.Label style={{ fontWeight: 'bold'}}>
              Mã Yêu cầu: {order.id}
            </Form.Label>

            <Form.Group className='mb-3'>
              <Form.Label style={{ fontWeight: 'bold'}}>
                Lí do Báo cáo
              </Form.Label>
              {options.map((option, idx) => (
                <div key={idx}>
                  {(idx !== 2 || (idx === 2 && order.status === 'shipping')) &&
                    <Form.Check
                      value={option}
                      type='radio'
                      aria-label={`radio ${idx}`}
                      onChange={() => {handleChange(idx)}}
                      label={option}
                      checked={idx === target}
                    />
                  }
                </div>
              ))}
              {target === options.length - 1 &&
                <>
                  <Form.Control
                    value={otherReason}
                    onChange={(event) => setOtherReason(event.target.value)}
                    as='textarea'
                  />
                  {isSubmitted && target === options.length - 1 && otherReason.length === 0 && (
                    <p className="mt-2 error">
                      <FaExclamationTriangle className="mx-2" />
                      Bạn chưa nhập lí do
                    </p>
                  )}
                </>
              }
              {isSubmitted && target == null && (
                <p className="mt-2 error">
                  <FaExclamationTriangle className="mx-2" />
                  Bạn chưa chọn lí do
                </p>
              )}
            </Form.Group>

            <div className='d-grid'>
              <Button
                className='fogi'
                variant='primary'
                onClick={onSubmit}
              >
                Gửi báo cáo
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
};

export default ReportModal;