/**
 * Content Script
 * This script is injected into web pages that match the patterns defined in manifest.ts.
 * It can manipulate the DOM and communicate with the background service worker.
 */
import './content.css';
import { getMessage } from './i18n';

// Function to create a notification element
function createNotification(title: string, message: string): HTMLElement {
    const notification = document.createElement('div');
    notification.className = 'crx-template-notification';
    
    const header = document.createElement('div');
    header.className = 'crx-template-notification-header';
    header.textContent = title;
    
    const close = document.createElement('div');
    close.className = 'crx-template-notification-close';
    close.textContent = '×';
    close.addEventListener('click', () => {
        notification.remove();
    });
    
    const content = document.createElement('div');
    content.textContent = message;
    
    notification.appendChild(header);
    notification.appendChild(close);
    notification.appendChild(content);
    
    return notification;
}

// Function to add a button to the page
function addButton(text: string, onClick: () => void): void {
    const body = document.querySelector('body');
    if (!body) return;
    
    const button = document.createElement('button');
    button.className = 'crx-template-button';
    button.textContent = text;
    button.addEventListener('click', onClick);
    
    // Create a container for the button to avoid affecting page layout
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.zIndex = '10000';
    container.style.top = '10px';
    container.style.right = '10px';
    container.appendChild(button);
    
    body.appendChild(container);
}

// Define message type interfaces
interface ExtensionMessage {
    type: string;
    [key: string]: unknown;
}

interface ExtensionResponse {
    success: boolean;
    data?: Record<string, unknown>;
    error?: string;
}

// Communication with background service worker
function sendMessageToBackground(message: ExtensionMessage): Promise<ExtensionResponse> {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage(message, (response: ExtensionResponse) => {
            resolve(response);
        });
    });
}

// Main content script initialization
function initialize(): void {
    console.log('Chrome Extension content script loaded');
    
    // Example: Add a button to the page
    addButton(getMessage('showExtensionInfoButton'), async () => {
        // Get data from background service worker
        const response = await sendMessageToBackground({ type: 'getData' });
        
        // Show a notification with the result
        const notification = createNotification(
            getMessage('extensionStatusTitle'),
            getMessage(response?.data?.isEnabled ? 'extensionEnabledStatus' : 'extensionDisabledStatus')
        );
        document.body.appendChild(notification);
        
        // Auto-remove notification after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
    });
}

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize);
} else {
    initialize();
}
