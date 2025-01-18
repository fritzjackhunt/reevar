import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AppwriteService } from '../../services/appwrite.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CreatePostModalComponent } from '../create-post-modal/create-post-modal.page';


interface UserProfile {
  email: string;
  prefs?: {
    firstName?: string;
    lastName?: string;
    profilePictureId?: string;
  };
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false,
})
export class ProfilePage implements OnInit {
  user: UserProfile | null = null;
  profilePicture: string = '';
  firstName: string = 'Unknown';
  lastName: string = 'User';

  private readonly DEFAULT_PROFILE_PICTURE =
    'https://cloud.appwrite.io/v1/storage/buckets/67878cfa00186fcb4ab7/files/6788759300289c8f2ddd/view?project=67878ca6001fe1f1f25a';

  constructor(private appwrite: AppwriteService, private router: Router, private cdr: ChangeDetectorRef, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.loadProfile();
  }

  async loadProfile() {
    console.log('Loading profile...');
    try {
      const profile = await this.appwrite.fetchUserProfile();
      console.log('Fetched profile:', profile);
      if (profile) {
        this.user = profile;
        this.firstName = profile.prefs?.['firstName'] || 'Unknown';
        this.lastName = profile.prefs?.['lastName'] || 'User';
        this.profilePicture = profile.prefs?.['profilePictureId'] 
          ? this.appwrite.getProfilePictureUrl(profile.prefs['profilePictureId']) 
          : this.DEFAULT_PROFILE_PICTURE;

        // Trigger change detection
        this.cdr.detectChanges();
      } else {
        console.log('No profile data found.');
        this.resetProfile();
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      this.resetProfile();
    }
  }

  resetProfile() {
    this.user = null;
    this.firstName = 'Unknown';
    this.lastName = 'User';
    this.profilePicture = this.DEFAULT_PROFILE_PICTURE;
  }

  async logout() {
    try {
      await this.appwrite.deleteSession();
      this.resetProfile();
      await this.router.navigate(['/login']);
    } catch (error) {
      console.error('Error during logout:', error);
      // Optionally show an error message to the user
    }
  }

  async openCreatePostModal() {
    const modal = await this.modalCtrl.create({
      component: CreatePostModalComponent,
    });
    await modal.present();
  }
}
