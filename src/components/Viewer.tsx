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
    // <>
    //   {iframeOpen && (
    <div className="flex w-screen h-screen">
      <ToolBar />
      {message && (
        <iframe
          onMouseMove={() => console.log('MOUVE')}
          className="flex-1 mt-[30px]"
          src={message}
          // src="https://www.youtube.com/embed/rggg1mrQTMY"
          title="YouTube video player"
        ></iframe>
      )}
    </div>
    //   )}
    // </>
  )
}
