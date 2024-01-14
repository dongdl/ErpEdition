import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReasonComponent } from './modal-reason.component';

describe('ModalReasonComponent', () => {
  let component: ModalReasonComponent;
  let fixture: ComponentFixture<ModalReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalReasonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
