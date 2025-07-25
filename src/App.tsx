import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { invoke } from '@tauri-apps/api/core'
import './App.css'
import { useForm } from 'react-hook-form'
import Viewer from './components/Viewer'

function App() {
  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    // setGreetMsg(await invoke('greet', { name }))
  }

  const [iframeOpen, setIframeOpen] = useState(false)

  const { register, handleSubmit, setValue, watch } = useForm()

  const onSubmit = (values: any) => {
    // https://www.youtube.com/watch?v=4iN84gLicnM -> errado
    // https://www.youtube.com/embed/rggg1mrQTMY -> certo

    // https://www.twitch.tv/baiano - errado
    // https://player.twitch.tv/?channel=baiano&parent=localhost -> certo video
    // https://www.twitch.tv/embed/baiano/chat?parent=localhost -> certo chat

    // https://docs.google.com/document/d/1aJTx22S6WyqoNE6prNiU0qtRRtrP4QqJFEsbw8BKppA/edit?usp=sharing
    console.log('Values', values)
    setIframeOpen(true)
  }

  return (
    <main className="min-h-screen min-w-screen bg-red-300 flex">
      <div className="flex-1 bg-black flex items-center justify-center flex-col">
        {!iframeOpen && (
          <>
            <h1 className="text-white bg-red-500 text-center">
              Insira uma URL
            </h1>
            <form
              className="bg-blue-300 w-full flex flex-col items-center justify-center"
              onSubmit={handleSubmit(onSubmit)}
            >
              <input
                {...register('url')}
                placeholder="Ex: https://youtube.com/..."
                className="bg-red-200 rounded-md px-4 py-2"
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    console.log(
                      'quando apertar aki, vai colocar colocar o input "type" = youtube',
                    )
                    setValue('type', 'youtube')
                    // Exemplo: setValue('type', 'youtube')
                  }}
                  className="cursor-pointer flex-1 p-2 bg-red-400 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <div className="text-white text-center">
                    <h2 className="font-bold text-lg">Youtube</h2>
                    <p className="text-sm">insira url de um vídeo</p>
                  </div>
                </button>
              </div>
            </form>
          </>
        )}

        {/* {iframeOpen && (
          <div className="">
            <iframe
              className="w-screen h-screen"
              src="https://www.youtube.com/embed/rggg1mrQTMY"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )} */}
        {iframeOpen && <Viewer iframeOpen={iframeOpen} />}
      </div>
    </main>
  )
}

export default App
