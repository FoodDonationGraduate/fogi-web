import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyDAxKtJXsJXEvLV0-JxW3WbD6aBD859PDU",
    authDomain: "fogi-d5187.firebaseapp.com",
    projectId: "fogi-d5187",
    storageBucket: "fogi-d5187.appspot.com",
    messagingSenderId: "157822938421",
    appId: "1:157822938421:web:4d420230adfb43e263f07c"
  };

var firebaseInstance = initializeApp(firebaseConfig);

export default firebaseInstance;