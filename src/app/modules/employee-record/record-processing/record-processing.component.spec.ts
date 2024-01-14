import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordProcessingComponent } from './record-processing.component';

describe('RecordProcessingComponent', () => {
  let component: RecordProcessingComponent;
  let fixture: ComponentFixture<RecordProcessingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordProcessingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecordProcessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
