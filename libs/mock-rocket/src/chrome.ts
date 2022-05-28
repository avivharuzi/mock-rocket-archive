export interface ChromeConnection {
  popup: chrome.runtime.Port | undefined;
  content: chrome.runtime.Port | undefined;
}

export interface ChromeConnectionInfo {
  tabId: string;
  sourceName: ChromeConnectionName;
  destinationName: ChromeConnectionName;
}

export type ChromeConnectionName = 'popup' | 'content';

export const getChromeCurrentTabID = (): Promise<number | null> => {
  return new Promise((resolve) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs[0]?.id) {
        return resolve(null);
      }

      resolve(tabs[0].id);
    });
  });
};

export const getChromeCurrentTabHost = (
  tabID: number
): Promise<string | null> => {
  return new Promise((resolve) => {
    chrome.tabs.sendMessage(tabID, { type: 'host' }, (response) => {
      if (response.host && typeof response.host === 'string') {
        resolve(response.host);
      } else {
        resolve(null);
      }
    });
  });
};
