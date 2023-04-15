import { Modal, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { hideQuestionModal, confirmQuestionModal } from 'components/redux/reducer/ModalReducer';

function MainModal() {
    const modalQuestion = useSelector(state => state.modalReducer.question)
    const modalVisibility = useSelector(state => state.modalReducer.questionModalVisibility)
    const dispatch = useDispatch();

    return (
        <div className='main-modal'>
            <Modal show={modalVisibility} onHide={() => dispatch(hideQuestionModal())}>
                <Modal.Header>
                    <Modal.Title >
                        <div style={{ fontSize: "20px"}} className="modalTitle">Question</div>
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body >
                    <div className="col-sm-12 pl-0">
                        <div style={{ fontSize: "20px"}} className="modalTitle">{modalQuestion}</div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button style={{fontFamily: "Jost"}} className="btn btn-light" onClick={() => dispatch(hideQuestionModal())}>Cancel</Button>
                    <Button style={{fontFamily: "Jost"}} className="btn btnLogin"  onClick={() => {dispatch(confirmQuestionModal()); dispatch(hideQuestionModal()); }}>Confirm</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default MainModal