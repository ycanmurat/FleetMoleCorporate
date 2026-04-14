import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AnalyticsManager from './components/Analytics/AnalyticsManager'
import { AppProvider } from './context/AppContext'
import App from './App'
import './index.css'
import './product-sites/productSite.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AnalyticsManager />
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
