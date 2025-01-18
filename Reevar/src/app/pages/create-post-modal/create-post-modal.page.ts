import { Component, AfterViewInit } from '@angular/core';
import { AppwriteService } from '../../services/appwrite.service';
import Quill from 'quill';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-post-modal',
  templateUrl: './create-post-modal.page.html',
  styleUrls: ['./create-post-modal.page.scss'],
  standalone: false,
})
export class CreatePostModalComponent implements AfterViewInit {
  content: string = ''; // Holds the Quill editor content
  editorModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }],
      [{ indent: '-1' }, { indent: '+1' }],
      [{ direction: 'rtl' }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ color: [] as any }, { background: [] as any }],
      [{ font: [] as any }],
      [{ align: [] as any }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };
  post: any = {
    title: '',
    content: ''
  };

  constructor(
    private appwrite: AppwriteService,
    private modalCtrl: ModalController,
  ) {}

  ngAfterViewInit() {
    // Initialize Quill editor and custom image handler
    const editor = new Quill('#editor-container', {
      theme: 'snow',
      modules: {
        toolbar: this.editorModules.toolbar,
      },
    });

    // Custom image handler
    const imageHandler = () => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();

      input.onchange = async (e: any) => {
        const file = e.target.files[0];
        if (file) {
          try {
            const imageUrl = await this.uploadImage(file);
            const range = editor.getSelection();
            if (range && range.index != null) {
              editor.insertEmbed(range.index, 'image', imageUrl);
            } else {
              console.error('No selection range found.');
            }
          } catch (error) {
            console.error('Image upload failed:', error);
          }
        }
      };
    };

    // Register the image handler
    const toolbar = editor.getModule('toolbar') as any;
    toolbar.addHandler('image', imageHandler);

    // Update content when Quill editor changes
    editor.on('text-change', () => {
      this.content = editor.root.innerHTML; // Update content field
    });
  }

  async uploadImage(file: File): Promise<string> {
    try {
      // Upload the image to Appwrite storage
      const bucketId = '67878cfa00186fcb4ab7'; // Replace with your bucket ID
      const uploadedFile = await this.appwrite.uploadFile(bucketId, 'unique()', file);

      // Return the file URL to insert into the content
      return `https://cloud.appwrite.io/v1/storage/buckets/${bucketId}/files/${uploadedFile.$id}/view?project=67878ca6001fe1f1f25a`;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  }

  async savePost() {
    try {
      // Assuming title is input by user
      if (this.post.title.trim() && this.content.trim()) {
        // Create post with title and content
        const user = await this.appwrite.account.get(); // Get current logged-in user
        const post = {
          title: this.post.title.trim(),
          content: this.content.trim(),
          userId: user.$id, // Logged-in user ID
          username: user.name, // Logged-in user's name
          timestamp: new Date().toISOString(), // Timestamp when post is created
        };

        // Save post to Appwrite collection
        await this.appwrite.createPost(post.title, post.content);
        console.log('Post saved successfully!');
        this.dismiss(); // Close the modal after saving
      } else {
        console.error('Title or content cannot be empty');
      }
    } catch (error) {
      console.error('Error saving post:', error);
    }
  }

  // Close the modal
  dismiss() {
    this.modalCtrl.dismiss();
  }
}
