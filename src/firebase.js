import firebase from "firebase";
import firebaseui from "firebaseui";
import "firebase/firestore";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyC57Y1PwmYmNDIrG97DKLN5X8hva5ok7-M",
  authDomain: "cs4241-fp.firebaseapp.com",
  databaseURL: "https://cs4241-fp.firebaseio.com",
  projectId: "cs4241-fp",
  storageBucket: "cs4241-fp.appspot.com",
  messagingSenderId: "600406637409"
};

const firebaseApp = firebase.initializeApp(config);

const firestore = firebaseApp.firestore();

firestore.settings({ timestampsInSnapshots: true });

export default firestore;
