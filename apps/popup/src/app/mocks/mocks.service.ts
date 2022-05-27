import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { generateUUID } from '../utils';
import { Mock, MockMode } from './mock';

@Injectable({
  providedIn: 'root',
})
export class MocksService {
  private mocksSubject = new BehaviorSubject<Mock[]>([]);

  private mockModeSubject = new BehaviorSubject<MockMode>('list');

  private mockEditSubject = new BehaviorSubject<Mock | null>(null);

  get mocks$(): Observable<Mock[]> {
    return this.mocksSubject.asObservable();
  }

  get mockMode$(): Observable<MockMode> {
    return this.mockModeSubject.asObservable();
  }

  get mockEdit$(): Observable<Mock | null> {
    return this.mockEditSubject.asObservable();
  }

  addOne(mock: Mock): void {
    const newMock = {
      ...mock,
      id: generateUUID(),
    };

    this.updateMocksSubjectValue([...this.getMocksSubjectValue(), newMock]);
  }

  update(id: string, updatedMock: Partial<Mock>): void {
    const mocks = this.getMocksSubjectValue();

    const updatedMocks = mocks.map((mock) => {
      if (id !== mock.id) {
        return mock;
      }

      return {
        ...mock,
        ...updatedMock,
        id: mock.id,
      };
    });

    this.updateMocksSubjectValue(updatedMocks);
  }

  deleteOne(id: string): void {
    const mocks = this.getMocksSubjectValue();

    const updatedMocks = mocks.filter((mock) => mock.id !== id);

    this.updateMocksSubjectValue(updatedMocks);
  }

  updateMode(mode: MockMode): void {
    this.mockModeSubject.next(mode);
  }

  updateMockEdit(mock: Mock | null): void {
    this.mockEditSubject.next(mock);
  }

  private getMocksSubjectValue(): Mock[] {
    return this.mocksSubject.value;
  }

  private updateMocksSubjectValue(mocks: Mock[]): void {
    this.mocksSubject.next(mocks);
  }
}
