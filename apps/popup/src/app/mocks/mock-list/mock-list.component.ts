import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { Mock } from '../mock';

@Component({
  selector: 'popup-mock-list',
  templateUrl: './mock-list.component.html',
  styleUrls: ['./mock-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MockListComponent {
  @Input() mocks: Mock[] = [];

  @Output() isActiveUpdated = new EventEmitter<{
    isActive: boolean;
    mock: Mock;
  }>();

  @Output() duplicated = new EventEmitter<Mock>();

  @Output() edited = new EventEmitter<Mock>();

  @Output() deleted = new EventEmitter<string>();

  onSlideToggleChange(isActive: boolean, mock: Mock): void {
    this.isActiveUpdated.emit({
      isActive,
      mock,
    });
  }
}
