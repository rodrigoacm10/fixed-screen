import { useEffect, useState } from 'react'

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
    <div className="relative w-screen h-screen">
      <p>Mensagem recebida: {message}</p>
      <iframe
        onMouseMove={() => console.log('MOUVE')}
        className="absolute top-0 left-0 w-full h-full"
        src="https://www.youtube.com/embed/rggg1mrQTMY"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
    //   )}
    // </>
  )
}
