import { useEffect, useState } from 'react'
import { ToolBar } from './ToolBar'

export default function Viewer() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const msg = params.get('url')
    if (msg) setMessage(msg)
  }, [])

  return (
    <div className="flex w-screen h-screen bg-black/75">
      <ToolBar />
      {message && (
        <iframe
          onMouseMove={() => console.log('MOUVE')}
          className="flex-1 mt-[30px]"
          src={message}
          title="YouTube video player"
        ></iframe>
      )}
    </div>
  )
}
