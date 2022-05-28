chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.type === 'host') {
    sendResponse({ host: location.host });
  }
});

(() => {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL('scripts/inject/main.esm.js');
  (document.head || document.documentElement).appendChild(script);
})();
