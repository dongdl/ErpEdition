import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordCompleteComponent } from './record-complete.component';

describe('RecordCompleteComponent', () => {
  let component: RecordCompleteComponent;
  let fixture: ComponentFixture<RecordCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordCompleteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecordCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
