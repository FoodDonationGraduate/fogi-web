import React from "react";
import { MdOutlineNotificationsNone } from 'react-icons/md';
import { Offcanvas, Stack } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { onMessage } from "firebase/messaging";
import { useLocation } from "react-router";
import { useNavigate } from 'react-router-dom';

// Styling
import 'assets/css/common/Noti.css';

// Helpers
import { handleNotificationPayload, getMessagingObject, handleNotificationReload, exportNotiElementContent, exportNotiElementLink } from "utils/helpers/Notification";
import { convertToString } from "utils/helpers/Time";

// Components
import { setModalMessage, showModal } from 'components/redux/reducer/ModalReducer';
import { getStatusColor, getStatusTitle } from "utils/helpers/Request";
import { retrieveAllNotifications, updateNotification } from "components/redux/reducer/NotificationReducer";

function Notification({style={}}) {
  const userToken = useSelector(state => state.authenticationReducer.token);
  const userInfo = useSelector(state => state.authenticationReducer.user);
  const allNotifications = useSelector(state => state.notificationReducer.allNotifications)
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const chip_condition = (userInfo.user_type === 'director' || userInfo.user_type === 'warehouse_keeper');
  const [noti_type, setNotiType] = React.useState(chip_condition ? 1 : 0);
  const noti_type_list = ['', 'give_request_state_change', 'take_request_state_change'];
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

  React.useEffect(() => {
    dispatch(retrieveAllNotifications({limit: 20, offset: 0, noti_type: noti_type_list[noti_type]}, {userInfo, userToken}, navigate));
    // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [show, noti_type])

  const onClickNotificationElement = (data) => {
    navigate(exportNotiElementLink(data, userInfo));
    dispatch(updateNotification({noti_type: data.noti_type, id: data.id, noti_status: 'seen'}, {userInfo, userToken}, navigate))
  }
  return (
    <>
      <MdOutlineNotificationsNone className='top-bar-icon' style={style} onClick={(event) => onClick(event)} />
      <Offcanvas show={show} onHide={() => setShow(false)} placement={'end'} scroll={true}>
          <Offcanvas.Header className="d-flex justify-content-center">
            <Offcanvas.Title><h3 style={{ fontWeight: 'bold' }}>Thông báo</h3></Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="p-0">
            {(userInfo.user_type === 'director' || userInfo.user_type === 'warehouse_keeper') && 
              <div className="notification-chip">
                <Stack direction="horizontal">
                  <div 
                    className={`notification-chip-button notification-chip-button-${noti_type === 1 ? 'active' : ''}`}
                    onClick={() => setNotiType(1)}>
                    {noti_type === 1 ? `Quyên góp (${allNotifications.num_of_unseen})` : 'Quyên góp'}
                  </div>
                  <div 
                    className={`notification-chip-button notification-chip-button-${noti_type === 2 ? 'active' : ''}`}
                    onClick={() => setNotiType(2)}>
                    {noti_type === 2 ? `Nhận quyên góp (${allNotifications.num_of_unseen})` : 'Nhận quyên góp'}
                  </div>
                </Stack>
              </div>
            }
            
            <div className="notification-list">
              {(Object.keys(allNotifications).length !== 0 && allNotifications.total !== 0) && allNotifications.notifications.map((data, index) => (
              // { array.map((data, index) => (
                <Stack direction='vertical' 
                  className={`${data.noti_status === 'unseen' ? 'notification-element-active' : 'notification-element-unactive'}` + ' notification-element px-3 py-2'}
                  key={index}
                  onClick={() => onClickNotificationElement(data)}>
                    <div className="d-flex justify-content-left">
                      <h5 className="mb-0 p-1" style={{ fontWeight: 'bold' }}>Yêu cầu {data.request_id}</h5>
                      <span
                        className={`order-item-status order-item-status-${getStatusColor(data.request_status)}`}
                        style={{fontSize: '12px', borderRadius: '100px', padding: '6px', marginLeft: '4px'}}
                      >
                        {getStatusTitle(data.request_status)}
                      </span>
                    </div>
                    <div>
                      {exportNotiElementContent(data, userInfo)}
                    </div>
                    <div className="d-flex justify-content-end pt-1">
                      <div style={{fontSize: '12px'}}>
                      Cập nhật vào lúc {data.request_status_updated_time.slice(11,16)} ngày {convertToString(data.request_status_updated_time, 'LocaleString').slice(9)}
                      </div>
                    </div>
                </Stack>
              ))}
            </div>
          </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
export default Notification;
