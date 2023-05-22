// Import the necessary functions from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  // Your Firebase configuration object
  apiKey: "AIzaSyAg5NFYQ2bxsgSD-2TN5MJozek9Sdg0sRk",
  authDomain: "vibecheck-41523.firebaseapp.com",
  projectId: "vibecheck-41523",
  storageBucket: "vibecheck-41523.appspot.com",
  messagingSenderId: "947606180458",
  appId: "1:947606180458:web:8d3e3227caa60c7532b013",
  measurementId: "G-694B8GHCB4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);