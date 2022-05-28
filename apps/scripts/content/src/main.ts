import {
  ChromeExtensionMessageType,
  getMocksFromChromeStorage,
  listenToChromeExtensionMessages,
  sendChromeExtensionMessage,
} from '@mock-rocket/mock-rocket';

const host = location.host;

const sendMocksToInject = async (): Promise<void> => {
  const mocks = await getMocksFromChromeStorage(host);

  sendChromeExtensionMessage({
    type: ChromeExtensionMessageType.Mocks,
    data: mocks,
  });
};

chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.type === 'host') {
    sendResponse({ host });
  }
});

(() => {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('scripts/inject/main.esm.js');
  (document.head || document.documentElement).appendChild(script);
})();

const backgroundConnection = chrome.runtime.connect({
  name: 'content',
});

backgroundConnection.onMessage.addListener((message) => {
  sendChromeExtensionMessage(message);
});

listenToChromeExtensionMessages((message) => {
  backgroundConnection.postMessage(message);

  if (message.type === ChromeExtensionMessageType.Init) {
    // Send mocks to the injected script when it's loaded.
    sendMocksToInject().then();
  }
});
