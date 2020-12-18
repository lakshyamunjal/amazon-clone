import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDaQ99wGujMqUjcHtzK7kukej3FOtqPEcU",
    authDomain: "clone-155e6.firebaseapp.com",
    projectId: "clone-155e6",
    storageBucket: "clone-155e6.appspot.com",
    messagingSenderId: "706017512344",
    appId: "1:706017512344:web:95658551294bb74dff79ed"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const database = firebaseApp.firestore();
const authetication = firebase.auth();

export {database, authetication};