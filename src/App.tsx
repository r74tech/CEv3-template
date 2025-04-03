import { useState, useEffect } from 'react'
import './App.css'
import { getMessage } from './i18n'

/**
 * Main popup component for the Chrome extension
 */
function App() {
  // State hooks
  const [isEnabled, setIsEnabled] = useState(true)
  const [status, setStatus] = useState<string | null>(null)
  const [websites, setWebsites] = useState<string[]>([])

  // Load data from storage on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        // Get extension settings from chrome.storage
        chrome.storage.sync.get(['isEnabled', 'targetWebsites'], (result) => {
          if (result.isEnabled !== undefined) {
            setIsEnabled(result.isEnabled)
          }
          
          if (result.targetWebsites) {
            // Convert comma-separated string to array
            const sites = result.targetWebsites
              .split(',')
              .map((site: string) => site.trim())
              .filter(Boolean)
            
            setWebsites(sites)
          }
        })
      } catch (error) {
        console.error('Failed to load settings:', error)
        setStatus('Error loading settings')
      }
    }
    
    loadData()
  }, [])

  // Save enabled state to storage
  const toggleEnabled = () => {
    const newState = !isEnabled
    setIsEnabled(newState)
    
    // Save to chrome.storage
    chrome.storage.sync.set({ isEnabled: newState }, () => {
      setStatus(`Extension ${newState ? 'enabled' : 'disabled'}`)
      
      // Notify background script of change
      chrome.runtime.sendMessage({ 
        type: 'toggleEnabled', 
        isEnabled: newState 
      })
      
      // Clear status after 2 seconds
      setTimeout(() => setStatus(null), 2000)
    })
  }
  
  // Open options page
  const openOptions = () => {
    chrome.runtime.openOptionsPage()
  }

  return (
    <div className="extension-popup">
      <header className="popup-header">
        <h1>{getMessage('popupTitle')}</h1>
        <div className="toggle-container">
          <label className="toggle">
            <input
              type="checkbox"
              checked={isEnabled}
              onChange={toggleEnabled}
            />
            <span className="toggle-slider" />
          </label>
          <span className="toggle-label">
            {isEnabled ? getMessage('enabledLabel') : getMessage('disabledLabel')}
          </span>
        </div>
      </header>
      
      <main className="popup-content">
        {status && (
          <div className="status-message">
            {status}
          </div>
        )}
        
        <section className="info-section">
          <h2>{getMessage('activeWebsitesTitle')}</h2>
          {websites.length > 0 ? (
            <ul className="website-list">
              {websites.map((site) => (
                <li key={`site-${site}`}>{site}</li>
              ))}
            </ul>
          ) : (
            <p className="empty-message">{getMessage('noWebsitesConfigured')}</p>
          )}
        </section>
        
        <div className="popup-actions">
          <button 
            type="button"
            className="action-button" 
            onClick={openOptions}
          >
            {getMessage('settingsButton')}
          </button>
        </div>
      </main>
      
      <footer className="popup-footer">
        <p>{getMessage('footerVersionText')}</p>
      </footer>
    </div>
  )
}

export default App
