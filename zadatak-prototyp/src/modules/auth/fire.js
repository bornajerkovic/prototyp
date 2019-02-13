import firebase from 'firebase';
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCadU7CVYsFTB3B2udxDqc4rqhOoxM2nhY",
    authDomain: "web-store-1c8b9.firebaseapp.com",
    databaseURL: "https://web-store-1c8b9.firebaseio.com",
    projectId: "web-store-1c8b9",
    storageBucket: "web-store-1c8b9.appspot.com",
    messagingSenderId: "601137019363"
};

const fire = firebase.initializeApp(config);
export default fire;