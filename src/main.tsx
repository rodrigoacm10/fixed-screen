import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Viewer from './components/Viewer'

import { TrayIcon, TrayIconEvent } from '@tauri-apps/api/tray'
import { Menu } from '@tauri-apps/api/menu'
import { invoke } from '@tauri-apps/api/core'

const currentUrl = window.location.pathname

async function setupTray() {
  const menu = await Menu.new({
    items: [
      {
        id: 'quit',
        text: 'Quit',
        action: () => invoke('exit_app'), // <- FECHAR APP
      },
    ],
  })

  const options = {
    menu,
    menuOnLeftClick: true,
    icon: '../src-tauri/icons/32x32.png',
    action: async (event: TrayIconEvent) => {
      switch (event.type) {
        case 'Click':
          console.log(
            `mouse ${event.button} button pressed, state: ${event.buttonState}`,
          )
          break
        case 'DoubleClick':
          invoke('open_app')
          console.log(`mouse ${event.button} button double pressed, aa`)
          break
        case 'Enter':
          console.log(
            `mouse hovered tray at ${event.rect.position.x}, ${event.rect.position.y}`,
          )
          break
        case 'Move':
          console.log(
            `mouse moved on tray at ${event.rect.position.x}, ${event.rect.position.y}`,
          )
          break
        case 'Leave':
          console.log(
            `mouse left tray at ${event.rect.position.x}, ${event.rect.position.y}`,
          )
          break
      }
    },
  }

  await TrayIcon.new(options)
}

if (!currentUrl.includes('viewer.html')) {
  setupTray()
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {currentUrl.includes('viewer.html') ? <Viewer /> : <App />}
  </React.StrictMode>,
)
