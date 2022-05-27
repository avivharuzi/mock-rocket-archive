import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MockToolbarComponent } from './mock-toolbar.component';

@NgModule({
  imports: [MatButtonModule, MatIconModule, MatToolbarModule],
  declarations: [MockToolbarComponent],
  exports: [MockToolbarComponent],
})
export class MockToolbarModule {}
