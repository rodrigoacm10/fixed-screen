export default function Viewer() {
  return (
    // <>
    //   {iframeOpen && (
    <div className="relative w-screen h-screen">
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
