import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFamilyComponent } from './add-edit-family.component';

describe('AddEditFamilyComponent', () => {
  let component: AddEditFamilyComponent;
  let fixture: ComponentFixture<AddEditFamilyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditFamilyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
