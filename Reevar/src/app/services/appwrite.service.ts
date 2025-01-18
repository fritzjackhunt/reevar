import { Injectable } from '@angular/core';
import { Client, Account, Storage, Databases } from 'appwrite';
import { BehaviorSubject, timestamp } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppwriteService {
  client: Client;
  account: Account;
  storage: Storage;
  databases: Databases;
  private userSubject = new BehaviorSubject<any>(null); // To store user data and emit changes

  private databaseId = '67899722002f9d9759cf'; // Replace with your Database ID
  private collectionId = '678997320005d56c6120'; // Replace with your Collection ID

  constructor() {
    // Initialize Appwrite client
    this.client = new Client()
      .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
      .setProject('67878ca6001fe1f1f25a'); // Replace with your project ID

    this.account = new Account(this.client);
    this.storage = new Storage(this.client);
    this.databases = new Databases(this.client);
  }

   // Upload a file to Appwrite storage
   async uploadFile(bucketId: string, fileId: string, file: File) {
    try {
      const uploadedFile = await this.storage.createFile(bucketId, fileId, file);
      return uploadedFile; // Return file details including ID for URL
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  // Returns an observable for components to subscribe to
  getUserObservable() {
    return this.userSubject.asObservable();
  }

  //Gets current user
  async getCurrentUser() {
    return this.account.get();
  }

  // Create a session for login
  async createSession(email: string, password: string) {
    try {
      await this.account.createEmailPasswordSession(email, password);
      const userProfile = await this.account.get();  // Get user profile data
      this.userSubject.next(userProfile); // Emit user data to subscribers
    } catch (error) {
      console.error('Error during session creation:', error);
    }
  }

  // Get user profile details
  async fetchUserProfile() {
    return await this.account.get();
  }

  // Delete current session (log out)
  async deleteSession() {
    await this.account.deleteSession('current');
    this.userSubject.next(null); // Clear user data on logout
  }

  // Get the profile picture URL
  getProfilePictureUrl(fileId: string) {
    return this.storage.getFilePreview('your-bucket-id', fileId); // Replace bucket ID
  }

  // Method to create a post
  async createPost(title: string, content: string): Promise<any> {
    const user = await this.getCurrentUser();

    if (!user) {
      throw new Error('User not logged in.');
    }

    const post = {
      title,
      content,
      userId: user.$id,
      timestamp: new Date().toISOString(),
    };

    return this.databases.createDocument(this.databaseId, this.collectionId, 'unique()', post);
  }

  async getAllPosts() {
    return this.databases.listDocuments('67899722002f9d9759cf', '678997320005d56c6120');
  }

  async createFile(bucketId: string, fileId: string, file: File) {
    return this.storage.createFile(bucketId, fileId, file);
  }

  getFileViewUrl(bucketId: string, fileId: string): string {
    return `${this.client.setEndpoint}/v1/storage/buckets/${bucketId}/files/${fileId}/view?project=${this.client.setProject}`;
  }

  // Fetch all posts
  async getPosts() {
    try {
      const response = await this.databases.listDocuments('67899722002f9d9759cf', '678997320005d56c6120');
      return response.documents;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  }

  // Fetch a single post by its ID
  async getPostById(postId: string) {
    try {
      const response = await this.databases.getDocument('67899722002f9d9759cf', '678997320005d56c6120', postId);
      return response;
    } catch (error) {
      console.error('Error fetching post by ID:', error);
      throw error;
    }
  }


  

}
