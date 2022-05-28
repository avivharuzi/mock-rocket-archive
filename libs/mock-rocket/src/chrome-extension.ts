export const CHROME_EXTENSION_SOURCE_NAME = 'chrome-extension-mock-rocket';

export interface ChromeExtensionMessage<T> {
  type: ChromeExtensionMessageType;
  data: T;
}

export enum ChromeExtensionMessageType {
  Init = 'init',
  Mocks = 'mocks',
}

export interface ChromeExtensionMessageSubscription {
  unsubscribe: () => void;
}

export const sendChromeExtensionMessage = <T>(
  message: ChromeExtensionMessage<T>
) => {
  window.postMessage(
    {
      message,
      source: CHROME_EXTENSION_SOURCE_NAME,
    },
    '*'
  );
};

export const listenToChromeExtensionMessages = <T>(
  callback: (message: ChromeExtensionMessage<T>) => void
): ChromeExtensionMessageSubscription => {
  const listener = (event: MessageEvent) => {
    // Only accept messages from the same frame
    if (event.source !== window) {
      return;
    }

    const data = event.data;

    // Only accept messages that we know are ours
    if (
      typeof data !== 'object' ||
      data === null ||
      data.source !== CHROME_EXTENSION_SOURCE_NAME ||
      !data.message
    ) {
      return;
    }

    callback(data.message);
  };

  window.addEventListener('message', listener);

  return {
    unsubscribe: () => window.removeEventListener('message', listener),
  };
};
