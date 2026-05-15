import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionImagePickerComponent } from './question-image-picker.component';

describe('QuestionImagePickerComponent', () => {
  let component: QuestionImagePickerComponent;
  let fixture: ComponentFixture<QuestionImagePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionImagePickerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuestionImagePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
