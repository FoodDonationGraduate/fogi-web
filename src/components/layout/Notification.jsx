import React from "react";
import { MdOutlineNotificationsNone } from 'react-icons/md';
import { Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { onMessage } from "firebase/messaging";
import { useLocation } from "react-router";
import { useNavigate } from 'react-router-dom';

// Helpers
import { handleNotificationPayload, getMessagingObject, handleNotificationReload } from "utils/helpers/Notification";

// Components
import { setModalMessage, showModal } from 'components/redux/reducer/ModalReducer';

function Notification({style={}}) {
  const userToken = useSelector(state => state.authenticationReducer.token);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [show, setShow] = React.useState(false);
  const onClick = (event) => {
    setShow(true);
    event.stopPropagation();
  }

  const func = async () => {
    await onMessage(getMessagingObject(), (payload) => {
      var userInfo = localStorage.getItem("user") !== "undefined" 
      && localStorage.getItem("user") !== null 
      ? JSON.parse(localStorage.getItem("user")) : {};
      var userToken = localStorage.getItem("token") !== "undefined" 
        && localStorage.getItem("token") !== null 
        ? localStorage.getItem("token") : '';
      if (Object.keys(userInfo).length !== 0 && payload && payload.data) {
        handleNotificationPayload(payload, dispatch, setModalMessage, showModal)
        handleNotificationReload(payload.data, userInfo, userToken, location.pathname, dispatch, navigate)
      }
      func();
    })
  }
  func();

  return (
    <>
      <MdOutlineNotificationsNone className='top-bar-icon' style={style} onClick={(event) => onClick(event)} />
      <Offcanvas show={show} onHide={() => setShow(false)} placement={'end'} scroll={true}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Notification</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="notification-list">
              {Array.from({ length: 20 }).map((_, index) => (
                <div className="notification-element" key={index}>Table cell {index}</div>
              ))}
            </div>
          </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default Notification;
