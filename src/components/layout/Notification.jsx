import React from "react";
import { MdOutlineNotificationsNone } from 'react-icons/md';
import { getMessaging, onMessage } from "firebase/messaging";
import { useDispatch } from 'react-redux'
import { Offcanvas } from 'react-bootstrap';


import firebaseInstance from "services/axios/firebaseConfig";
import { requestForToken } from "./notification/token";
import { setModalMessage, showModal } from 'components/redux/reducer/ModalReducer';

function Notification() {
  const [show, setShow] = React.useState(false);
  const messaging = getMessaging(firebaseInstance);
  const [token, setToken] = React.useState(false);
  
  const dispatch = useDispatch();
  React.useEffect(() => {
    window.Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
        requestForToken(messaging, setToken);
        onMessage(messaging, (payload) => {
          console.log('Message received: ', payload);
        });
      } else {
        console.log('Notification permission ungranted.');
        dispatch(setModalMessage('Vui lòng cho phép trang web hiện thông báo!'))
        dispatch(showModal())
      }
    });
  }, [])
  return (
    <>
      <MdOutlineNotificationsNone className='top-bar-icon' onClick={() => setShow(true)} />
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
