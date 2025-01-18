import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  userData: any = null; // Store user data here

  constructor() {}

  async ngOnInit() {
    const auth = getAuth();
    const db = getFirestore();

    // Get currently logged-in user
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userId = user.uid;

        try {
          // Reference the user's document
          const userDocRef = doc(db, 'users', userId);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            this.userData = userDoc.data(); // Save user data to variable
            console.log('User data:', this.userData);
          } else {
            console.error('No user document found!');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        console.log('No user is logged in.');
      }
    });
  }
}
