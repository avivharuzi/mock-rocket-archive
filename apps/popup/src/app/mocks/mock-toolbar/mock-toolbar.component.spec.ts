import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MockToolbarComponent } from './mock-toolbar.component';

describe('MockToolbarComponent', () => {
  let component: MockToolbarComponent;
  let fixture: ComponentFixture<MockToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MockToolbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MockToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
