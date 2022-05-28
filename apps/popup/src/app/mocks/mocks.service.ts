import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import {
  ChromeExtensionMessageType,
  getChromeCurrentTabHost,
  getChromeCurrentTabID,
  getMocksFromChromeStorage,
  Mock,
  MockMode,
  setMocksToChromeStorage,
} from '@mock-rocket/mock-rocket';

import { generateUUID } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class MocksService {
  private mocksSubject = new BehaviorSubject<Mock[]>([]);

  private mockModeSubject = new BehaviorSubject<MockMode>('list');

  private mockEditSubject = new BehaviorSubject<Mock | null>(null);

  private tabID: number | null = null;

  private host: string | null = null;

  private backgroundConnection: chrome.runtime.Port | null = null;

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
    // Get Chrome TabID, Host and add connection.
    this.tabID = await getChromeCurrentTabID();
    if (this.tabID !== null) {
      this.host = await getChromeCurrentTabHost(this.tabID);
      this.backgroundConnection = chrome.runtime.connect({
        name: `popup@${this.tabID}`,
      });
    }

    // Load mocks from chrome storage first.
    if (this.host) {
      const mocks = await getMocksFromChromeStorage(this.host);
      this.updateMocksSubjectValue(mocks);
    }

    // Listen to mocks changes and update chrome storage and let content to know about it.
    this.mocks$.subscribe((mocks) => {
      if (this.host) {
        setMocksToChromeStorage(this.host, mocks).then();
      }

      if (this.backgroundConnection) {
        this.backgroundConnection.postMessage({
          type: ChromeExtensionMessageType.Mocks,
          data: mocks,
        });
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
