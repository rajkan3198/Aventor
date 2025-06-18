// firebase.js
// Replace the placeholders below with your actual Firebase config values,
// or reference Vercel Environment Variables in your build.
const firebaseConfig = {
  apiKey: "<YOUR_FIREBASE_API_KEY>",
  authDomain: "<YOUR_FIREBASE_AUTH_DOMAIN>",
  projectId: "<YOUR_FIREBASE_PROJECT_ID>",
  storageBucket: "<YOUR_FIREBASE_STORAGE_BUCKET>",
  messagingSenderId: "<YOUR_FIREBASE_MESSAGING_SENDER_ID>",
  appId: "<YOUR_FIREBASE_APP_ID>"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db   = firebase.firestore();
