import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyRecordProcessComponent } from './verify-record-process.component';

describe('VerifyRecordProcessComponent', () => {
  let component: VerifyRecordProcessComponent;
  let fixture: ComponentFixture<VerifyRecordProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyRecordProcessComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifyRecordProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
