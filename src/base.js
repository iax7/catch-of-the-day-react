import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCTAGAo6Uw8-6qCB1cYHpAFgX9-oKKKIbk",
    authDomain: "catch-of-the-day-iax.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-iax.firebaseio.com",
    appId: "1:830562601246:web:5ab1d61dcf4514cb"
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// this is a default export
export default base;