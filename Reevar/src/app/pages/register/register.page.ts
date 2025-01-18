import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppwriteService } from '../../services/appwrite.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage {
  registerForm: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private appwrite: AppwriteService, private router: Router) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async register() {
    const { email, password, firstName, lastName } = this.registerForm.value;
  
    try {
      // Combine first and last name into a single name string
      const fullName = `${firstName} ${lastName}`;
  
      // Create user with name
      const user = await this.appwrite.account.create('unique()', email, password, fullName);
      console.log('User created successfully:', user);
      // Log the user in to create a session
      await this.appwrite.account.createEmailPasswordSession(email, password);
      console.log('User logged in successfully.');

      let profilePictureId = ''; // Default empty profile picture ID

      if (this.selectedFile) {
        // Upload profile picture
        const bucketId = '67878cfa00186fcb4ab7'; // Replace with your bucket ID
        const uploadedFile = await this.appwrite.storage.createFile(
          bucketId,
          'unique()',
          this.selectedFile
        );

        profilePictureId = uploadedFile.$id; // Assign uploaded file ID
  
        // Save file ID in user preferences
        console.log('Uploaded file ID:', uploadedFile.$id);  
      }

      await this.appwrite.account.updatePrefs({ 
        profilePictureId, 
        firstName, 
        lastName 
      });
      console.log('User preferences updated successfully.');
  
      
  
      // Navigate to the profile page
      this.router.navigate(['/profile']);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  }
  
  
}  