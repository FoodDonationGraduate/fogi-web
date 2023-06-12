import React, { useState } from 'react';
import { Modal, Button, Toast } from 'react-bootstrap';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { useDispatch, useSelector } from 'react-redux'
import { hideModal } from 'components/redux/reducer/ModalReducer';

function InfoModal() {
    const modalMessage = useSelector(state => state.modalReducer.message)
    const modalVisibility = useSelector(state => state.modalReducer.visibility)
    const dispatch = useDispatch();
    const [show, setShow] = useState(true);

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

            <ToastContainer position="top-end" className="m-2 pt-5" style={{ zIndex: 1 }}>
                <Toast delay={7000} autohide={true} onClose={() => dispatch(hideModal())} show={modalVisibility}>
                    <Toast.Header>
                        <strong className="me-auto">Thông báo</strong>
                    </Toast.Header>
                    <Toast.Body>{modalMessage}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>

    )
}

export default InfoModal