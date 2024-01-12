import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordWaitHandleComponent } from './record-wait-handle.component';

describe('RecordWaitHandleComponent', () => {
  let component: RecordWaitHandleComponent;
  let fixture: ComponentFixture<RecordWaitHandleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordWaitHandleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecordWaitHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
