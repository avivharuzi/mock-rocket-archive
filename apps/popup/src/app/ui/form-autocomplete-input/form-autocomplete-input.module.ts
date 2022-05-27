import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { FormAutocompleteInputComponent } from './form-autocomplete-input.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  declarations: [FormAutocompleteInputComponent],
  exports: [FormAutocompleteInputComponent],
})
export class FormAutocompleteInputModule {}
