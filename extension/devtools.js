'use strict';

chrome.devtools.panels.create(
  'mock-rocket - devtools-panel',
  'images/icon-128x128.png',
  'pages/devtools-panel/index.html',
  (_panel) => {
    // code invoked on panel creation
  }
);
