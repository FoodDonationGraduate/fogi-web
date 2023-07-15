import { getToken } from 'firebase/messaging';
import firebaseInstance from "services/axios/firebaseConfig";
import { getMessaging, onMessage } from "firebase/messaging";
import { sendDeviceToken } from 'components/redux/reducer/NotificationReducer';

const messaging = getMessaging(firebaseInstance);

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
