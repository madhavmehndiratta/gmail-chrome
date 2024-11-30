/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "autoGenerateReply",
    title: "Auto-generate reply",
    contexts: ["selection"],
    // documentUrlPatterns: ["https://mail.google.com/*"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "autoGenerateReply") {
    chrome.storage.local.set({ selectedText: info.selectionText }, () => {
      chrome.windows.create({
        url: chrome.runtime.getURL("index.html#/reply"),
        type: "popup",
        width: 365,
        height: 512,
      });
    });
  }
});

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "summarizeContent",
    title: "Summarize Content",
    contexts: ["selection"],
    // documentUrlPatterns: ["https://mail.google.com/*"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "summarizeContent") {
    chrome.storage.local.set({ selectedText: info.selectionText }, () => {
      chrome.windows.create({
        url: chrome.runtime.getURL("index.html#/summarize"),
        type: "popup",
        width: 365,
        height: 512,
      });
    });
  }
});
