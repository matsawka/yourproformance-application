import * as firebase from "firebase";

// Initialize Firebase
console.log("process.env.AUTHDOMAIN", process.env.AUTHDOMAIN);
firebase.initializeApp({
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: "yourproformance"
});

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
  timestampsInSnapshots: true
});

export default firebase;
