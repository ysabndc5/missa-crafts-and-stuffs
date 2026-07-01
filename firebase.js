// FIREBASE CONFIG

import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import {
getFirestore,
collection,
addDoc
}
from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


const firebaseConfig = {
apiKey: "AIzaSyARANfVLvrWtOpr-oSKm1x5QxnVPLOx3fA",
authDomain: "missa-crafts-and-stuffs-orders.firebaseapp.com",
projectId: "missa-crafts-and-stuffs-orders",
storageBucket: "missa-crafts-and-stuffs-orders.firebasestorage.app",
messagingSenderId: "307234784231",
appId: "1:307234784231:web:c332e48e8f76ae35b1b342"
};


const app =
initializeApp(firebaseConfig);

const db =
getFirestore(app);

export {
db,
collection,
addDoc
};