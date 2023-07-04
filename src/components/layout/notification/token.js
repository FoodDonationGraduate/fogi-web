import { getToken } from 'firebase/messaging';

export const requestForToken = (messaging, setToken) => {
  return getToken(messaging, { vapidKey: "BBCATjFAqmgnBXuNb2rc5hDjj79pBh-ej-tmZJHGjx1zadpWLk0oqoQD7r5ZR1rgg_6ZlgIKVslOInl-Px8c4mU" })
    .then((currentToken) => {
      if (currentToken) {
        setToken(currentToken);
        console.log('current token for client: ', currentToken);
      } else {
        setToken('');
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      setToken('');
      console.log('An error occurred while retrieving token. ', err);
    });
};