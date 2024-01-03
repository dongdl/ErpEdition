import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmRecordComponent } from './confirm-record.component';

describe('ConfirmRecordComponent', () => {
  let component: ConfirmRecordComponent;
  let fixture: ComponentFixture<ConfirmRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmRecordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
