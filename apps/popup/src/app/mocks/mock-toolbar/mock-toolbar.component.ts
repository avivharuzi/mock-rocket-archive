import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MockMode } from '@mock-rocket/mock-rocket';

import { MocksService } from '../mocks.service';

@Component({
  selector: 'popup-mock-toolbar',
  templateUrl: './mock-toolbar.component.html',
  styleUrls: ['./mock-toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MockToolbarComponent {
  constructor(private readonly mockService: MocksService) {}

  changeMode(mode: MockMode): void {
    this.mockService.updateMode(mode);
  }
}
