/* eslint-disable no-undef */
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "autoGenerateReply",
    title: "Auto-generate reply",
    contexts: ["page"],
    documentUrlPatterns: ["https://mail.google.com/*"],
  });
});

chrome.contextMenus.onClicked.addListener(() => {
  chrome.windows.create({
    url: chrome.runtime.getURL("index.html#/popup"),
    type: "popup",
    width: 400,
    height: 500,
  });
});
