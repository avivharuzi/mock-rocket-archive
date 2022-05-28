export interface Mock {
  id: string;
  url: string;
  httpMethod: string;
  statusCode: number;
  delayInMS: number;
  body: string;
  headers: MockHeader[];
  isActive: boolean;
}

export interface MockHeader {
  key: string;
  value: string;
}

export type MockMode = 'new' | 'edit' | 'list';

export const getMocksFromChromeStorage = (host: string): Promise<Mock[]> => {
  return new Promise((resolve) => {
    chrome.storage.sync.get([host], (data) => {
      resolve(data[host] ? JSON.parse(data[host]) : []);
    });
  });
};

export const setMocksToChromeStorage = (
  host: string,
  mocks: Mock[]
): Promise<void> => {
  return chrome.storage.sync.set({
    [host]: JSON.stringify(mocks),
  });
};
