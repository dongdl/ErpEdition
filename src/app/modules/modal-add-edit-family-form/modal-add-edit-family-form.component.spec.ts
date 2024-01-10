import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddEditFamilyFormComponent } from './modal-add-edit-family-form.component';

describe('ModalAddEditFamilyFormComponent', () => {
  let component: ModalAddEditFamilyFormComponent;
  let fixture: ComponentFixture<ModalAddEditFamilyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalAddEditFamilyFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalAddEditFamilyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
