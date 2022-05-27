import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAutocompleteInputComponent } from './form-autocomplete-input.component';

describe('FormAutocompleteInputComponent', () => {
  let component: FormAutocompleteInputComponent;
  let fixture: ComponentFixture<FormAutocompleteInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormAutocompleteInputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAutocompleteInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
