import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePostModalPageRoutingModule } from './create-post-modal-routing.module';

import { CreatePostModalComponent } from './create-post-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreatePostModalPageRoutingModule
  ],
  declarations: [CreatePostModalComponent]
})
export class CreatePostModalPageModule {}
