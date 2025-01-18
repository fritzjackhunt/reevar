import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreatePostModalComponent } from './create-post-modal.page';

describe('CreatePostModalPage', () => {
  let component: CreatePostModalComponent;
  let fixture: ComponentFixture<CreatePostModalComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
