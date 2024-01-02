import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewRecordComponent } from './preview-record.component';

describe('PreviewRecordComponent', () => {
  let component: PreviewRecordComponent;
  let fixture: ComponentFixture<PreviewRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PreviewRecordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PreviewRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
