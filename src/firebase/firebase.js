import * as firebase from 'firebase';

// Initialize Firebase

    firebase.initializeApp({
            apiKey: process.env.APIKEY,
            authDomain: process.env.AUTHDOMAIN,
            projectId: 'yourproformance'
          });

          // Initialize Cloud Firestore through Firebase
          var db = firebase.firestore();
          
          // Disable deprecated features
          db.settings({
            timestampsInSnapshots: true
          });

  export default firebase;

