import React, { useState, useEffect } from 'react';
import { Toast } from 'react-bootstrap';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useDispatch, useSelector } from 'react-redux'
import { hideModal } from 'components/redux/reducer/ModalReducer';

function InfoModal() {
    const modalMessage = useSelector(state => state.modalReducer.message);
    const modalVisibility = useSelector(state => state.modalReducer.visibility);
    const modalType = useSelector(state => state.modalReducer.type);
    const [modalColor, setModalColor] = useState('#82CD47');
    const [modalTitle, setModalTitle] = useState('Thông báo');
    useEffect(() => {
        switch (modalType) {
            case 'danger':
                setModalColor('#FF5A5F');
                setModalTitle('Lỗi');
                break;
            default:
                setModalColor('#82CD47');
                setModalTitle('Thông báo');
        }
    }, [modalType]);
    const dispatch = useDispatch();

    return (
        <div className='main-modal'>
            {/* <Modal show={modalVisibility} onHide={() => dispatch(hideModal())}>
                <Modal.Header>
                    <Modal.Title >
                        <div style={{ fontSize: "20px"}} className="modalTitle">Notification</div>
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body >
                    <div className="col-sm-12 pl-0">
                        <div style={{ fontSize: "20px"}} className="modalTitle">{modalMessage}</div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button style={{fontFamily: "Jost"}} className="btn btn-light" onClick={() => dispatch(hideModal())}>Okay</Button>
                </Modal.Footer>
            </Modal> */}

            <ToastContainer position="top-end" className="m-2 pt-5 position-fixed" style={{ zIndex: 1065 }}>
                <Toast delay={4000} autohide={true} onClose={() => dispatch(hideModal())} show={modalVisibility}>
                    <Toast.Header style={{ backgroundColor: modalColor, color: '#ffffff' }}>
                        <strong className="me-auto">{modalTitle}</strong>
                    </Toast.Header>
                    <Toast.Body style={{ backgroundColor: '#ffffff', borderRadius: '8px' }}>{modalMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>

    )
}

export default InfoModal