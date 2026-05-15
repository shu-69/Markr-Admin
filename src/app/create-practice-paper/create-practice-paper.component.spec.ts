import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePracticePaperComponent } from './create-practice-paper.component';

describe('CreatePracticePaperComponent', () => {
  let component: CreatePracticePaperComponent;
  let fixture: ComponentFixture<CreatePracticePaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePracticePaperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePracticePaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
