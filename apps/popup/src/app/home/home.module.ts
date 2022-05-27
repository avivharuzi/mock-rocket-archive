import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MockFormModule, MockListModule, MockToolbarModule } from '../mocks';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [CommonModule, MockFormModule, MockListModule, MockToolbarModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule {}
