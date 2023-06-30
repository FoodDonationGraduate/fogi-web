import { getToken } from 'firebase/messaging';

export const requestForToken = (messaging, setTokenFound) => {
  return getToken(messaging, { vapidKey: "BBCATjFAqmgnBXuNb2rc5hDjj79pBh-ej-tmZJHGjx1zadpWLk0oqoQD7r5ZR1rgg_6ZlgIKVslOInl-Px8c4mU" })
    .then((currentToken) => {
      if (currentToken) {
        setTokenFound(true);
        console.log('current token for client: ', currentToken);
      } else {
        setTokenFound(false);
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      setTokenFound(false);
      console.log('An error occurred while retrieving token. ', err);
    });
};