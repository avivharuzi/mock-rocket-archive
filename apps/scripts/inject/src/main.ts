// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as xhook from 'xhook';

import {
  ChromeExtensionMessageType,
  listenToChromeExtensionMessages,
  Mock,
  sendChromeExtensionMessage,
} from '@mock-rocket/mock-rocket';

(() => {
  sendChromeExtensionMessage({
    type: ChromeExtensionMessageType.Init,
    data: {},
  });

  let MOCKS: Mock[] = [];

  listenToChromeExtensionMessages(({ type, data }) => {
    switch (type) {
      case ChromeExtensionMessageType.Mocks:
        MOCKS = data as Mock[];
        break;
    }
  });

  // eslint-disable-next-line
  xhook.before(function (request: any, callback: any) {
    // If we don't have mocks at all do nothing.
    if (MOCKS.length === 0) {
      return callback();
    }

    const url = request.url.split('?')[0];
    const method = request.method;

    // Let's try to find a match from our mocks.
    const selectedMock = MOCKS.find((mock) => {
      if (!mock.isActive) {
        return;
      }

      if (mock.httpMethod.toUpperCase() !== method.toUpperCase()) {
        return;
      }

      if (mock.url !== url) {
        return;
      }

      return mock;
    });

    // If we didn't find mock do nothing.
    if (!selectedMock) {
      return callback();
    }

    const headers: Record<string, string> = {
      'content-type': 'application/json; charset=UTF-8',
    };

    if (selectedMock.headers && selectedMock.headers.length > 0) {
      selectedMock.headers.forEach((header) => {
        headers[header.key] = header.value;
      });
    }

    const response = {
      status: selectedMock.statusCode,
      statusText: '',
      text: selectedMock.body,
      headers,
      data: selectedMock.body,
    };

    if (selectedMock.delayInMS > 0) {
      setTimeout(() => {
        callback(response);
      }, selectedMock.delayInMS);
    } else {
      callback(response);
    }
  });
})();
