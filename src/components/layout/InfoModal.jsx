import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { hideModal } from 'components/redux/reducer/ModalReducer';

function MainModal() {
    const modalMessage = useSelector(state => state.modalReducer.message)
    const modalVisibility = useSelector(state => state.modalReducer.visibility)
    const dispatch = useDispatch();

    return (
        <div className='main-modal'>
            <Modal show={modalVisibility} onHide={() => dispatch(hideModal())}>
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
                    <Button style={{fontFamily: "Jost"}} className="btn btn-light" onClick={() => dispatch(hideModal())}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default MainModal