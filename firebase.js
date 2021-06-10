import firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCLNVn2lvuehyvPvYiiITCE3hNeQ_yyuzE",
    authDomain: "connect-9647e.firebaseapp.com",
    projectId: "connect-9647e",
    storageBucket: "connect-9647e.appspot.com",
    messagingSenderId: "366988417925",
    appId: "1:366988417925:web:00e817553ae8de306c42ec"
  };

  let app;

  if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
  } else {
    app = firebase.app();
  }
  
  const db = app.firestore();
  const auth = firebase.auth();
  
  export { db, auth };
   