import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Mock, MockMode, MocksService } from '../mocks';

@Component({
  selector: 'popup-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  mocks$ = this.mockService.mocks$;

  mockMode$ = this.mockService.mockMode$;

  mockEdit$ = this.mockService.mockEdit$;

  constructor(private readonly mockService: MocksService) {}

  addMock(mock: Mock): void {
    this.mockService.addOne(mock);
    this.updateMode('list');
  }

  updateMock(id: string, mock: Mock): void {
    this.mockService.update(id, mock);
    this.updateMode('list');
  }

  updateIsActive({ isActive, mock }: { isActive: boolean; mock: Mock }): void {
    setTimeout(() => {
      this.mockService.update(mock.id, {
        isActive,
      });
    }, 80);
  }

  onDuplicate(mock: Mock): void {
    this.mockService.addOne(mock);
  }

  onEdit(mock: Mock): void {
    this.mockService.updateMockEdit(mock);
    this.updateMode('edit');
  }

  onDelete(id: string): void {
    this.mockService.deleteOne(id);
  }

  updateMode(mode: MockMode): void {
    this.mockService.updateMode(mode);
  }
}
