/**
 * Chrome Extension Manifest V3 Template
 * This manifest defines the configuration for a Chrome extension.
 */
export const manifest = {
    manifest_version: 3,
    name: "__MSG_extensionName__",
    description: "__MSG_extensionDescription__",
    version: "1.0.0",
    default_locale: "en",
    
    // Extension icons for different sizes
    icons: {
        "16": "icons/icon16.svg",
        "48": "icons/icon48.svg",
        "128": "icons/icon128.svg"
    },
    
    // Browser action - appears in the toolbar
    action: {
        default_popup: "index.html",
        default_icon: {
            "16": "icons/icon16.svg",
            "48": "icons/icon48.svg",
            "128": "icons/icon128.svg"
        },
        default_title: "Open Extension Popup"
    },
    
    // Background service worker
    background: {
        service_worker: "src/background.ts",
        type: "module"
    },
    
    // Content scripts injected into web pages
    content_scripts: [
        {
            matches: ["<all_urls>"], // Match all URLs by default, customize as needed
            js: ["src/content.ts"],
            run_at: "document_end" // "document_start", "document_end", or "document_idle"
        }
    ],
    
    // Optional settings page
    options_ui: {
        page: "options.html",
        open_in_tab: true
    },
    
    // Optional permissions
    permissions: [
        "storage",        // For storing extension data
        "activeTab"       // To interact with the current active tab
    ],
    
    // Optional host permissions
    host_permissions: [
        "<all_urls>"      // Permission to access all URLs
    ],
    
    // Optional web accessible resources
    web_accessible_resources: [
        {
            resources: ["assets/*"],
            matches: ["<all_urls>"]
        }
    ]
} satisfies chrome.runtime.ManifestV3
