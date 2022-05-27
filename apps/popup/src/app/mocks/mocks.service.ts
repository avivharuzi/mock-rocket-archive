import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { generateUUID } from '../utils';
import { Mock } from './mock';

@Injectable({
  providedIn: 'root',
})
export class MocksService {
  private mocksSubject = new BehaviorSubject<Mock[]>([]);

  get mocks$(): Observable<Mock[]> {
    return this.mocksSubject.asObservable();
  }

  addOne(mock: Mock): void {
    const newMock = {
      ...mock,
      id: generateUUID(),
    };

    this.updateMocksSubjectValue([newMock, ...this.getMocksSubjectValue()]);
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

  private getMocksSubjectValue(): Mock[] {
    return this.mocksSubject.value;
  }

  private updateMocksSubjectValue(mocks: Mock[]): void {
    this.mocksSubject.next(mocks);
  }
}
