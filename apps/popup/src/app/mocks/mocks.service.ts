import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { generateUUID } from '../utils';
import { Mock, MockMode } from './mock';

const getHost = (): Promise<string | null> => {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0]?.id) {
        return;
      }

      chrome.tabs.sendMessage(tabs[0].id, { type: 'host' }, (response) => {
        if (response.host && typeof response.host === 'string') {
          resolve(response.host);
        } else {
          resolve(null);
        }
      });
    });
  });
};

const getMocksFromStorage = (host: string): Promise<Mock[]> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get([host], (data) => {
      resolve(data[host] ? JSON.parse(data[host]) : []);
    });
  });
};

const setMocksToStorage = (host: string, mocks: Mock[]): Promise<void> => {
  return chrome.storage.sync.set({
    [host]: JSON.stringify(mocks),
  });
};

@Injectable({
  providedIn: 'root',
})
export class MocksService {
  private mocksSubject = new BehaviorSubject<Mock[]>([]);

  private mockModeSubject = new BehaviorSubject<MockMode>('list');

  private mockEditSubject = new BehaviorSubject<Mock | null>(null);

  private host: string | null = null;

  get mocks$(): Observable<Mock[]> {
    return this.mocksSubject.asObservable();
  }

  get mockMode$(): Observable<MockMode> {
    return this.mockModeSubject.asObservable();
  }

  get mockEdit$(): Observable<Mock | null> {
    return this.mockEditSubject.asObservable();
  }

  async init(): Promise<void> {
    this.host = await getHost();

    if (this.host) {
      const mocks = await getMocksFromStorage(this.host);
      this.updateMocksSubjectValue(mocks);
    }

    this.mocks$.subscribe((mocks) => {
      if (this.host) {
        setMocksToStorage(this.host, mocks);
      }
    });
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
