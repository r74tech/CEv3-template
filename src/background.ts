/**
 * Chrome Extension Background Service Worker
 * This script runs in the background and handles browser events.
 * It can communicate with content scripts and popup using chrome.runtime.* APIs.
 */

// Example: Listen for extension installation or update
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Extension installed:', details.reason);

  // Set default storage values
  chrome.storage.local.set({ isEnabled: true });

  // Example: Create a context menu item
  // chrome.contextMenus.create({
  //   id: "sampleContextMenu",
  //   title: "Sample Context Action",
  //   contexts: ["selection"]
  // });
});

// Example: Listen for messages from content scripts or popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Received message:', message, 'from:', sender);

  // Handle different message types
  if (message.type === 'getData') {
    // Example: Get data and respond
    chrome.storage.local.get(['isEnabled'], (result) => {
      sendResponse({ success: true, data: result });
    });
    return true; // Required for async sendResponse
  }

  // Default response
  sendResponse({ success: false, error: 'Unknown message type' });
  return false;
});

// Example: Handle browser events
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (changeInfo.status === 'complete' && tab.url) {
//     // Tab has finished loading
//   }
// });

// Background service worker stays active while needed and is terminated when idle
console.log('Background service worker initialized');
