import { getApp, getApps, initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD2x8wq2cfwddPDJbPJS32D176DVQVMnYc",
  authDomain: "resturantapp-256d8.firebaseapp.com",
  databaseURL: "https://resturantapp-256d8-default-rtdb.firebaseio.com",
  projectId: "resturantapp-256d8",
  storageBucket: "resturantapp-256d8.appspot.com",
  messagingSenderId: "689541734017",
  appId: "1:689541734017:web:89e5d58bb3062e55adf780",
};

const app = initializeApp(firebaseConfig);

//   const current_app=getApp();
// console.log(current_app);
// const allApps = getApps();
// console.log(allApps);
const firestore = getFirestore(app);

const storage = getStorage(app);

export { app, firestore, storage };
