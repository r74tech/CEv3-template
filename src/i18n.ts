/**
 * i18n Utility Functions
 * Helper functions for internationalization in Chrome Extensions
 */

/**
 * Get a localized message from Chrome's i18n API
 * 
 * @param messageName - The name of the message to retrieve
 * @param substitutions - Optional substitutions for placeholders in the message
 * @returns The localized message string
 */
export function getMessage(messageName: string, substitutions?: string | string[]): string {
  return chrome.i18n.getMessage(messageName, substitutions) || messageName;
}

/**
 * Replace i18n message placeholders in HTML content
 * This function finds all elements with the 'data-i18n' attribute 
 * and replaces their text content with the appropriate localized message.
 * 
 * @param rootElement - The root element to search for i18n placeholders
 */
export function localizeHtml(rootElement: HTMLElement = document.documentElement): void {
  // Find all elements with data-i18n attribute
  const elements = rootElement.querySelectorAll('[data-i18n]');
  
  for (const element of elements) {
    // Get the message name from the data-i18n attribute
    const messageName = element.getAttribute('data-i18n');
    if (!messageName) continue;
    
    // Get the localized message
    const message = getMessage(messageName);
    
    // Set the text content of the element
    element.textContent = message;
  }
  
  // Handle placeholders in attributes (e.g., placeholder, title, aria-label)
  const attributeElements = rootElement.querySelectorAll('[data-i18n-attr]');
  for (const element of attributeElements) {
    const attr = element.getAttribute('data-i18n-attr');
    const messageName = element.getAttribute('data-i18n-attr-value');
    
    if (!attr || !messageName) continue;
    
    const message = getMessage(messageName);
    (element as HTMLElement).setAttribute(attr, message);
  }
}

/**
 * Get the current language code from Chrome's i18n API
 * 
 * @returns The current language code (e.g., 'en', 'ja')
 */
export function getCurrentLanguage(): string {
  return chrome.i18n.getUILanguage();
}

/**
 * Format a localized message with substitutions
 * 
 * @param messageName - The name of the message to retrieve
 * @param substitutions - Object containing substitution key-value pairs
 * @returns The formatted message string
 */
export function formatMessage(messageName: string, substitutions: Record<string, string>): string {
  let message = getMessage(messageName);
  
  // Replace placeholders like $key$ with their values
  for (const [key, value] of Object.entries(substitutions)) {
    message = message.replace(`$${key}$`, value);
  }
  
  return message;
}
