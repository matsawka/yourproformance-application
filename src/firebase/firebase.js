import * as firebase from 'firebase';

// Initialize Firebase

    firebase.initializeApp({
            apiKey: process.env.APIKEY,
            authDomain: process.env.AUTHDOMAIN,
            projectId: process.env.PROJECTID
          });

          // Initialize Cloud Firestore through Firebase
          var db = firebase.firestore();
          
          // Disable deprecated features
          db.settings({
            timestampsInSnapshots: true
          });

  export default firebase;

