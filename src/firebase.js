import firebase from 'firebase';
  
const firebaseConfig = {
    apiKey: "AIzaSyDTMztl8Ufioln7XC4RswTSlxleNsXo0wI",
    authDomain: "awesome-chat-app-799fc.firebaseapp.com",
    projectId: "awesome-chat-app-799fc",
    storageBucket: "awesome-chat-app-799fc.appspot.com",
    messagingSenderId: "142449435568",
    appId: "1:142449435568:web:b6fcd6c161b786fd6a2c75",
    measurementId: "G-VZFHBTF84R"
};
  
firebase.initializeApp(firebaseConfig);
var auth = firebase.auth();
export {auth , firebase};