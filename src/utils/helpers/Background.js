importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js');
const firebaseConfig = {
    apiKey: "AIzaSyDAxKtJXsJXEvLV0-JxW3WbD6aBD859PDU",
    authDomain: "fogi-d5187.firebaseapp.com",
    projectId: "fogi-d5187",
    storageBucket: "fogi-d5187.appspot.com",
    messagingSenderId: "157822938421",
    appId: "1:157822938421:web:4d420230adfb43e263f07c",
    measurementId: "G-XTYEWYX8PR"
  };

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.'
    };
  
  });