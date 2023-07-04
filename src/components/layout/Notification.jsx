import React from "react";
import { MdOutlineNotificationsNone } from 'react-icons/md';
import { Offcanvas } from 'react-bootstrap';
import { onMessageListener } from "utils/helpers/Notification";

function Notification() {
  const [show, setShow] = React.useState(false);

  onMessageListener()
    .then((payload) => {
      console.log(payload);    
    })
    .catch((err) => console.log('failed: ', err));
  
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
