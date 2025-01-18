import { Component, OnInit } from '@angular/core';
import { AppwriteService } from '../../services/appwrite.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.page.html',
  styleUrls: ['./post-detail.page.scss'],
  standalone: false,
})
export class PostDetailPage implements OnInit {
  postId: string = '';
  post: any = {};

  constructor(
    private appwrite: AppwriteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postId = params['postId']; // Get the postId from the route
      this.loadPostDetails();
    });
  }

  async loadPostDetails() {
    try {
      this.post = await this.appwrite.getPostById(this.postId); // Fetch the full post by ID
      console.log('Post details:', this.post);
    } catch (error) {
      console.error('Error loading post details:', error);
    }
  }
}
