import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBiSNHBdMrWM_CNJqme-yWwuTcPS43jDp8',
  authDomain: 'boardapp-46c34.firebaseapp.com',
  projectId: 'boardapp-46c34',
  storageBucket: 'boardapp-46c34.appspot.com',
  messagingSenderId: '989216009203',
  appId: '1:989216009203:web:0926d85b1b6238b6584086',
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
