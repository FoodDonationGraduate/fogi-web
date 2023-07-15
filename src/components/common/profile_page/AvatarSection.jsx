import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal} from 'react-bootstrap';
import Avatar from "react-avatar-edit";
import { useNavigate } from "react-router-dom";

import 'assets/css/user/profile_page/UserProfile.css'
import { updateAvatar } from 'components/redux/reducer/AuthenticationReducer';

import PlaceHolder from 'assets/images/default_avatar.jpg';

function AvatarSection() {
    const [showModal, setShowModal] = React.useState(false);
    const userInfo = useSelector(state => state.authenticationReducer.user)
    const userToken = useSelector(state => state.authenticationReducer.token)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const date = new Date();

    // handle avatar
    const [preview, setPreview] = React.useState(null);
    function onClose() {
        setPreview(null);
    }
    function onCrop(pv) {
        setPreview(pv);
    }
    async function onBeforeFileLoad(elem) {
        if (elem.target.files[0].size > 10000000) {
            alert("Kích thước hình ảnh quá lớn!");
            elem.target.value=''
        }
    }
    const onSubmit = () => {
        if (preview !== null) {
            dispatch(updateAvatar({avatar: preview.split("base64,")[1]}, {userInfo, userToken},navigate))
        }
    }
    return (
        <div className='avartar-section'>
            <div className='user-profile-picture d-flex justify-content-left align-items-center'>
                <img className='user-avatar' src={
                    userInfo.avatar ? `https://bachkhoi.online/static/${userInfo.avatar}?${date.getTime()}`
                    : PlaceHolder
                } alt='user avatar'></img>
                <Button className='card-buton card-grey-button change-avatar-button' onClick={() => setShowModal(true)}>Thay đổi Ảnh đại diện</Button>
            </div>
            <Modal className="mw-80" show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header>
                    <Modal.Title >
                        <div style={{ fontSize: "20px"}} className="modalTitle">Thay đổi Ảnh đại diện</div>
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body >
                    <div className="col-sm-12 pl-0">
                        <div className='d-block' style={{textAlign: "center"}}>
                            <Avatar
                                width={"100%"}
                                height={300}
                                onCrop={onCrop}
                                onClose={onClose}
                                onBeforeFileLoad={onBeforeFileLoad}
                                src={null}
                            />
                            {preview && <img className='mt-4' src={preview} alt="Preview" />}
                        </div>
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='outline-secondary'
                        onClick={() => {setShowModal(false); onClose()}}>Hủy</Button>
                    <Button className='fogi' variant='primary'
                        onClick={() => {onSubmit(); setShowModal(false); onClose();}}>Xác nhận</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AvatarSection;