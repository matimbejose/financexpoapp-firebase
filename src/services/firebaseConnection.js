import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'



let firebaseConfig = {
    apiKey: "AIzaSyCl3H_oUoETs5sxJDDkqezbZhMaIw1AbBI",
    authDomain: "financasas-49870.firebaseapp.com",  
    projectId: "financasas-49870",
    storageBucket: "financasas-49870.appspot.com",
    messagingSenderId: "590316713620",
    appId: "1:590316713620:web:7d5bd883ce190e399da681"
  
};


// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default firebase;