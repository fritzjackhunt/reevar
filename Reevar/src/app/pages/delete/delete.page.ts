import { Component, OnInit } from '@angular/core';
import { getAuth, deleteUser } from "firebase/auth";

import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.page.html',
  styleUrls: ['./delete.page.scss'],
  standalone: false,
})
export class DeletePage {

  constructor(
    public router: Router, 
    public loadingCtrl : LoadingController,
  ) 
  {}
  
  /*async deleteAcc () { 
    const oAuth = getAuth();
    const user = oAuth.currentUser;
    const loading = await this.loadingCtrl.create();
    await loading.present(); 
    deleteUser(user).then(() => {
      // User deleted. 
      loading.dismiss();
      this.router.navigate(['/signup']);    
    }).catch((error) => {
      // An error ocurred
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      console.log(errorCode);
    });
  }*/
}
