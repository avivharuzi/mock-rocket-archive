import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import {
  CodemirrorModule,
  FormAutocompleteInputModule,
  FormInputModule,
} from '../../ui';
import { MockFormComponent } from './mock-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    FormInputModule,
    FormAutocompleteInputModule,
    CodemirrorModule,
  ],
  declarations: [MockFormComponent],
  exports: [MockFormComponent],
})
export class MockFormModule {}
