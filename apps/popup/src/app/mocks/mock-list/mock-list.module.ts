import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { MockListComponent } from './mock-list.component';

@NgModule({
  imports: [CommonModule, MatSlideToggleModule, MatIconModule, MatButtonModule],
  declarations: [MockListComponent],
  exports: [MockListComponent],
})
export class MockListModule {}
