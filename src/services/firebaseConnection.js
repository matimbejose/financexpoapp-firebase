import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'



let firebaseConfig = {
    apiKey: "AIzaSyDr5P-d0HPFPLa5GOiDQZw8hS-M_eOD8LY",

    authDomain: "financasv2.firebaseapp.com",

    projectId: "financasv2",

    storageBucket: "financasv2.appspot.com",

    messagingSenderId: "588434114852",

    appId: "1:588434114852:web:8268f997337d376b82cbb1"

};


// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;