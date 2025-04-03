# Chrome Extension V3 Template (CEv3-template)

A modern Chrome Extension boilerplate using Manifest V3, built with React, TypeScript, Vite, and i18n support.

[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-blue.svg?style=flat-square&logo=github)](https://github.com/r74tech/CEv3-template)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)

## Features

- 🚀 **Manifest V3 Compatible**: Built for the latest Chrome Extension standards
- ⚛️ **React 19**: Uses the latest React version for UI components
- 📦 **TypeScript**: Type safety for robust development
- ⚡ **Vite**: Fast build and development experience
- 🧩 **CRXJS Vite Plugin**: Seamless Chrome extension development with Vite
- 🔄 **Background Service Worker**: Modern event-based background script
- 📝 **Content Scripts**: Safely inject code into web pages
- ⚙️ **Options Page**: Fully customizable settings page
- 💾 **Storage API**: Store and sync user preferences
- 🌎 **i18n Support**: Internationalization with multiple language support
- 🔍 **Documented Code**: Extensive comments explaining implementation details

## Project Structure

```
cev3-template/
├── _locales/             # Internationalization
│   ├── en/               # English translations
│   └── ja/               # Japanese translations
├── public/               # Static assets
│   └── icons/            # Extension icons
├── src/                  # Source code
│   ├── assets/           # UI assets
│   ├── background.ts     # Service worker background script
│   ├── content.ts        # Content script injected into web pages
│   ├── content.css       # Styles for content script
│   ├── i18n.ts           # Internationalization utilities
│   ├── options.ts        # Options page script
│   ├── App.tsx           # Main popup component
│   └── main.tsx          # Popup entry point
├── manifest.ts           # Extension manifest configuration
├── options.html          # Options page HTML
├── vite.config.ts        # Vite configuration
└── package.json          # Dependencies and scripts
```

## Development

### Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev
```

During development, Vite will automatically compile your code and refresh the extension.

### Building for Production

```bash
# Build the extension
pnpm run build
```

This creates a production-ready build in the `dist` folder that you can load in Chrome.

### Loading the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions`
2. Enable "Developer mode" by toggling the switch in the top-right corner
3. Click "Load unpacked" and select the `dist` folder
4. The extension should now be loaded and visible in your extensions list

## Customization

### Manifest Configuration

Edit `manifest.ts` to customize extension metadata, permissions, and behavior.

### Content Scripts

Content scripts in `src/content.ts` are injected into web pages. You can modify this file to change how the extension interacts with web pages.

### Background Service Worker

The background script in `src/background.ts` handles events and state that persist across browser sessions. Modify this file to implement background functionality.

### Options Page

The options page in `options.html` and `src/options.ts` allows users to configure the extension. Customize these files to add your own settings.

### Popup UI

The popup UI is built with React. Modify `src/App.tsx` and related components to customize the popup interface.

### Internationalization (i18n)

The template includes support for multiple languages:

1. **Message Definitions**: Located in `_locales/{lang}/messages.json`
2. **i18n Utilities**: Helper functions in `src/i18n.ts`
3. **Usage in Code**:
   - In React components: `getMessage('messageName')`
   - In HTML: Add `data-i18n="messageName"` attribute

To add a new language, create a new folder in `_locales` with the appropriate language code and provide translated messages.

## Browser Compatibility

This template is designed for Chrome and Chromium-based browsers that support Manifest V3, including:

- Google Chrome
- Microsoft Edge
- Opera
- Brave

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests for improvements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/r74tech/CEv3-template/blob/main/LICENSE) file for details.
