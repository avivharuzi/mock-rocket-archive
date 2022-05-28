import {
  ChromeExtensionMessageType,
  listenToChromeExtensionMessages,
  sendChromeExtensionMessage,
} from '@mock-rocket/mock-rocket';

sendChromeExtensionMessage({
  type: ChromeExtensionMessageType.Init,
  data: {},
});

listenToChromeExtensionMessages((message) => {
  console.log('inject got message', message);
});
