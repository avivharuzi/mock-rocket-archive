chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.type === 'host') {
    sendResponse({ host: location.host });
  }
});
