import { Component, OnInit } from '@angular/core';
import { AppwriteService } from '../services/appwrite.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  posts: any[] = [];

  constructor(
    private appwrite: AppwriteService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPosts();
  }

  async loadPosts() {
    try {
      // Get the list of posts (you can filter and sort as needed)
      this.posts = await this.appwrite.getPosts();
      console.log('Loaded posts:', this.posts);
    } catch (error) {
      console.error('Error loading posts:', error);
    }
  }

  // Navigate to the detailed post page when a post is clicked
  viewPost(postId: string) {
    console.log('Post ID',this.posts)
    this.router.navigate([`/post-detail/${postId}`]);
  }
}
