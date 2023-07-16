import { getToken } from 'firebase/messaging';
import firebaseInstance from "services/axios/firebaseConfig";
import { getMessaging, onMessage } from "firebase/messaging";
import { sendDeviceToken } from 'components/redux/reducer/NotificationReducer';
import { retrieveRequest } from 'components/redux/reducer/RequestReducer';
import { retrieveCurrentRequest } from 'components/redux/reducer/DirectorReducer';

const messaging = getMessaging(firebaseInstance);

export const getMessagingObject = () => {return messaging};
export const requestForToken = (messaging, dispatch, navigate, user) => {
  return getToken(messaging, { vapidKey: "BBCATjFAqmgnBXuNb2rc5hDjj79pBh-ej-tmZJHGjx1zadpWLk0oqoQD7r5ZR1rgg_6ZlgIKVslOInl-Px8c4mU" })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        dispatch(sendDeviceToken({device_token: currentToken}, user, navigate))
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

export function enableNotification (dispatch, navigate, user) {
    window.Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          console.log('Notification permission granted.');
          requestForToken(messaging, dispatch, navigate, user);
        } else {
          console.log('Notification permission ungranted.');
        }
    });
}

export const onMessageListener = () => 
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });

export const handleNotificationPayload = (payload, dispatch, setModalMessage, showModal) => {
  console.log(payload);
  if (payload && payload.data) {
    var data = payload.data;
    var request_id = data.request_id;
    var request_status = data.request_status;
    var modalMessage = '';
    if (data.code === '100') { // to donee
      var delivery_type = data.delivery_type;
      if (delivery_type === 'delivery') {
        switch (request_status) {
          case 'finding':
            modalMessage = `Yêu cầu ${request_id} của bạn đã được chấp nhận và đang được điều phối`;
            break;
          case 'receiving':
            modalMessage = `Tình nguyện viên đang trên đường đến nhận thực phẩm tại kho theo yêu cầu ${request_id}`;
            break;
          case 'shipping':
            modalMessage = `Tình nguyên viên đang trên đường giao thực phẩm từ yêu cầu ${request_id} đến bạn`;
            break;
          case 'cancel':
            modalMessage = `Yêu cầu ${request_id} đã bị hủy`;
            break;
          default:
            modalMessage = `Yêu cầu ${request_id} đã thành công`;
        }
      } else {
        switch (request_status) {
          case 'accepted':
            modalMessage = `Yêu cầu ${request_id} của bạn đã được chấp nhận. Bạn có thể đến nhận thực phẩm tại kho`;
            break;
          case 'receiving':
            modalMessage = `Người nhận quyên góp đang trên đường đến nhận thực phẩm tại kho theo yêu cầu ${request_id}`;
            break;
          case 'cancel':
            modalMessage = `Yêu cầu ${request_id} đã bị hủy`;
            break;
          default:
            modalMessage = `Yêu cầu ${request_id} đã thành công`;
        }
      }
    } else if (data.code === '300') { // to donor
      switch (request_status) {
        case 'finding':
          modalMessage = `Yêu cầu ${request_id} của bạn đã được chấp nhận và đang được điều phối`;
          break;
        case 'receiving':
          modalMessage = `Tình nguyện viên đang trên đường đến nhận thực phẩm từ bạn theo yêu cầu ${request_id}`;
          break;
        case 'shipping':
          modalMessage = `Tình nguyên viên đang trên đường giao thực phẩm từ yêu cầu ${request_id} đến kho`;
          break;
        case 'cancel':
          modalMessage = `Yêu cầu ${request_id} đã bị hủy`;
          break;
        default:
          modalMessage = `Yêu cầu ${request_id} đã thành công`;
      }
    } else if (data.code === '400') { // to director
      var request_from = data.request_from;
      if (request_from === 'donor') {
        switch (request_status) {
          case 'cancel':
            modalMessage = `Yêu cầu quyên góp ${request_id}đã bị hủy`;
            break;
          default:
            modalMessage = `Yêu cầu quyên góp ${request_id} đã thành công`;
        }
      } else {
        if (delivery_type === 'delivery') {
          switch (request_status) {
            case 'cancel':
              modalMessage = `Yêu cầu nhận quyên góp ${request_id} đã bị hủy`;
              break;
            default:
              modalMessage = `Yêu cầu nhận quyên góp ${request_id} đã thành công`;
          }
        } else {
          switch (request_status) {
            case 'cancel':
              modalMessage = `Yêu cầu nhận quyên góp ${request_id} đã bị hủy`;
              break;
            default:
              modalMessage = `Yêu cầu nhận quyên góp ${request_id} đã thành công`;
          }
        }
      }
    } else { // to warehousekeeper
      switch (request_status) {
        case 'shipping':
          modalMessage = `Tình nguyện viên đang trên đường giao thực phẩm từ yêu cầu ${request_id} đến kho`;
          break;
        default:
      }
    }
    if (modalMessage !== '') {
      dispatch(setModalMessage(modalMessage));
      dispatch(showModal());
    }
  }
}

export const handleNotificationReload = (data, userInfo, userToken, location, dispatch, navigate) => {
  var user_type= userInfo.user_type;
  var request_id = data.request_id;
  if (user_type === 'donor' && location === `/donor/request/${request_id}` && data.code === '300') {
    dispatch(retrieveRequest({request_id: request_id}, {userInfo, userToken}, navigate));
  } else if (user_type === 'donee' && location === `/request/${request_id}` && data.code === '100') {
    dispatch(retrieveRequest({request_id: request_id}, {userInfo, userToken}, navigate));
  } else if (user_type === 'director' && location === `/director/request/${data.request_from}/${request_id}` && data.code === '400') {
    dispatch(retrieveCurrentRequest({request_from: data.request_from, request_id: request_id}, {userInfo, userToken}, navigate))
  } else {
  }
}