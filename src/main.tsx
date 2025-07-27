import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Viewer from './components/Viewer'

const currentUrl = window.location.pathname

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {currentUrl.includes('viewer.html') ? <Viewer /> : <App />}
  </React.StrictMode>,
)
