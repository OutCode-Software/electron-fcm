// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/7.20.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.20.0/firebase-messaging.js');
// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
    apiKey: "AIzaSyCBVu59nrWiGoZpYo_rWg6lN7KRqrS5ToU",
    authDomain: "dir-s-1373.firebaseapp.com",
    databaseURL: "https://dir-s-1373.firebaseio.com",
    projectId: "dir-s-1373",
    storageBucket: "dir-s-1373.appspot.com",
    messagingSenderId: "405351706879",
    appId: "1:405351706879:web:c7d9158c977816dc"
};
firebase.initializeApp(firebaseConfig);
// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
// [END initialize_firebase_in_sw]

messaging.onBackgroundMessage((message) => {
    console.log(`Got message in background: ${message}`)
    if (window && window.showWindowAlarm) {
        window.showWindowAlarm()
    }
})