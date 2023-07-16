import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'



let firebaseConfig = {

};


// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
