import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreatePostModalComponent } from './create-post-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CreatePostModalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatePostModalPageRoutingModule {}
