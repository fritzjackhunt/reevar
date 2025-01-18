import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword  } from "firebase/auth";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  // Initialize Firebase
  oApp = initializeApp(environment.firebaseConfig);

  // Initialize Firebase Authentication and get a reference to the service
  oAuth = getAuth(this.oApp);

  gEmail = ""
  gPassword = ""
  gDisplayName = ""


  constructor(public router : Router, public loadingCtrl : LoadingController) { } 

  ngOnInit() {
    
  }

  async login () {
    const loading = await this.loadingCtrl.create();
    await loading.present();
    signInWithEmailAndPassword(this.oAuth, this.gEmail, this.gPassword)
    .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    this.router.navigate(['/home'])

   /*if (user !== null) {
      user.providerData.forEach((profile) => {
        console.log("Sign-in provider: " + profile.providerId);
        console.log("  Provider-specific UID: " + profile.uid);
        console.log("  Name: " + profile.displayName);
        console.log("  Email: " + profile.email);
        console.log("  Photo URL: " + profile.photoURL);
      });
    }
    */
   
    loading.dismiss();
    console.log(user)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode);
    console.log(errorMessage);
  });





}

}
