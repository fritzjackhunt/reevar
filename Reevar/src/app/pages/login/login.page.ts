import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppwriteService } from '../../services/appwrite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private appwrite: AppwriteService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    const { email, password } = this.loginForm.value;

    try {
      // Log in user
      const session = await this.appwrite.account.createEmailPasswordSession(email, password);
      console.log('User logged in successfully:', session);

      // Navigate to the profile page
      this.router.navigate(['/profile']);
    } catch (error) {
      console.error('Error during login:', error);
    }
  }
}
