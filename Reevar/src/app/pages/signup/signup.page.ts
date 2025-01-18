import { Component } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: false,
})
export class SignupPage {

  // Initialize Firebase
//  oApp = firebase.initializeApp(environment.firebaseConfig);

  email: string = '';
  password: string = '';
  profilePictureFile: File | null = null;

  constructor() {}

  async register() {
    const auth = getAuth();
    const db = getFirestore();
    const storage = getStorage();

    try {
      // Create the user
      const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
      const userId = userCredential.user.uid;

      // Upload profile picture to Firebase Storage
      let profilePictureURL = 'assets/img/default-profile.png'; // Default picture
      if (this.profilePictureFile) {
        const storageRef = ref(storage, `profilePictures/${userId}`);
        await uploadBytes(storageRef, this.profilePictureFile); // Upload the file
        profilePictureURL = await getDownloadURL(storageRef); // Get the download URL
      }

      // Save user data to Firestore
      const userDocRef = doc(db, 'users', userId);
      await setDoc(userDocRef, {
        email: this.email,
        profilePicturePath: profilePictureURL,
        createdAt: new Date().toISOString(),
      });

      console.log('User registered successfully!');
    } catch (error) {
      console.error('Error during registration:', error);
    }
  }

  handleFileInput(event: any) {
    this.profilePictureFile = event.target.files[0];
  }
}
