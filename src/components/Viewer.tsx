import { useEffect, useState } from 'react'

export default function Viewer({ iframeOpen }: { iframeOpen: boolean }) {
  const [isInEdge, setIsInEdge] = useState(false)

  useEffect(() => {
    const threshold = 100 // distância da borda em px

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const w = window.innerWidth
      const h = window.innerHeight

      const isNearEdge =
        clientX < threshold ||
        clientX > w - threshold ||
        clientY < threshold ||
        clientY > h - threshold

      if (isNearEdge) {
        console.log('está dentro')
        if (!isInEdge) setIsInEdge(true)
      } else {
        if (isInEdge) setIsInEdge(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isInEdge])

  return (
    <>
      {iframeOpen && (
        <div className="relative w-screen h-screen">
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/rggg1mrQTMY"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </>
  )
}
