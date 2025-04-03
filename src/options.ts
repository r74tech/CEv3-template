/**
 * Options Page Script
 * This script handles loading, saving, and managing extension options.
 */
import { getMessage, localizeHtml } from './i18n';

// Define the structure of our options
interface ExtensionOptions {
  enableExtension: boolean;
  targetWebsites: string;
  buttonColor: string;
  notificationDuration: number;
  enableDebugMode: boolean;
  customCss: string;
}

// Default options
const defaultOptions: ExtensionOptions = {
  enableExtension: true,
  targetWebsites: '',
  buttonColor: 'blue',
  notificationDuration: 5,
  enableDebugMode: false,
  customCss: '',
};

// Elements
const enableExtensionEl = document.getElementById('enableExtension') as HTMLInputElement;
const targetWebsitesEl = document.getElementById('targetWebsites') as HTMLInputElement;
const buttonColorEl = document.getElementById('buttonColor') as HTMLSelectElement;
const notificationDurationEl = document.getElementById('notificationDuration') as HTMLInputElement;
const enableDebugModeEl = document.getElementById('enableDebugMode') as HTMLInputElement;
const customCssEl = document.getElementById('customCss') as HTMLTextAreaElement;
const saveButtonEl = document.getElementById('saveOptions') as HTMLButtonElement;
const statusEl = document.getElementById('status') as HTMLDivElement;

// Load saved options from storage
function loadOptions(): void {
  chrome.storage.sync.get(defaultOptions, (items: ExtensionOptions) => {
    enableExtensionEl.checked = items.enableExtension;
    targetWebsitesEl.value = items.targetWebsites;
    buttonColorEl.value = items.buttonColor;
    notificationDurationEl.value = items.notificationDuration.toString();
    enableDebugModeEl.checked = items.enableDebugMode;
    customCssEl.value = items.customCss;
    
    console.log('Options loaded:', items);
  });
}

// Save options to storage
function saveOptions(): void {
  const options: ExtensionOptions = {
    enableExtension: enableExtensionEl.checked,
    targetWebsites: targetWebsitesEl.value,
    buttonColor: buttonColorEl.value,
    notificationDuration: Number.parseInt(notificationDurationEl.value, 10),
    enableDebugMode: enableDebugModeEl.checked,
    customCss: customCssEl.value,
  };
  
  chrome.storage.sync.set(options, () => {
    // Show success message
    showStatus('optionsSavedMessage', 'success');
    
    // Notify background script that options have changed
    chrome.runtime.sendMessage({ type: 'optionsUpdated', options });
    
    console.log('Options saved:', options);
  });
}

// Show status message
function showStatus(messageKey: string, type: 'success' | 'error'): void {
  statusEl.textContent = getMessage(messageKey);
  statusEl.className = `status ${type}`;
  
  // Hide status after 3 seconds
  setTimeout(() => {
    statusEl.className = 'status';
  }, 3000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Localize all HTML elements with data-i18n attributes
  localizeHtml(document.documentElement);
  
  // Load options from storage
  loadOptions();
});
saveButtonEl.addEventListener('click', saveOptions);

// Optional: Validate inputs
notificationDurationEl.addEventListener('input', () => {
  const val = Number.parseInt(notificationDurationEl.value, 10);
  if (val < 1) notificationDurationEl.value = '1';
  if (val > 60) notificationDurationEl.value = '60';
});

// Optional: Apply custom CSS preview
customCssEl.addEventListener('change', () => {
  // You could implement a live preview of the custom CSS here
});
