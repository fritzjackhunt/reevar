// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


export const environment = {
  production: false,
  firebaseConfig :{
    apiKey: "AIzaSyBo9sIY062MM69aitC_nrp8Vn-mLYikzHU",
    authDomain: "reevar-b44fe.firebaseapp.com",
    projectId: "reevar-b44fe",
    storageBucket: "reevar-b44fe.firebasestorage.app",
    messagingSenderId: "503848940137",
    appId: "1:503848940137:web:3747e4da5c8bf23028a8f8",
    measurementId: "G-G158080W7M"
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
