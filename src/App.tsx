import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { invoke } from '@tauri-apps/api/core'
import './App.css'
import { useForm } from 'react-hook-form'
import Viewer from './components/Viewer'

const types = [
  {
    type: 'youtube',
    title: 'Youtube',
    subTitle: 'Insira url de um vídeo',
    Icon: '',
    getUrl: (url: string) => {
      // https://www.youtube.com/watch?v=4iN84gLicnM -> errado
      // https://www.youtube.com/embed/rggg1mrQTMY -> certo

      const codeYt = url.split('=')[1]
      return `https://www.youtube.com/embed/${codeYt}`
    },
  },
  {
    type: 'twitch',
    title: 'Twitch',
    subTitle: 'Insira url de um vídeo',
    Icon: '',
    getUrl: (url: string) => {
      // https://www.twitch.tv/baiano - errado
      // https://player.twitch.tv/?channel=baiano&parent=localhost -> certo video
      // https://www.twitch.tv/embed/baiano/chat?parent=localhost -> certo chat

      // arurmar
      const codeYt = url.split('=')[1]
      return `https://www.youtube.com/embed/${codeYt}`
    },
  },
]

function App() {
  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    // setGreetMsg(await invoke('greet', { name }))
  }

  const { register, handleSubmit, setValue, watch } = useForm()

  const openViewer = async (url: string) => {
    const params = new URLSearchParams({
      // url: 'https://www.youtube.com/embed/rggg1mrQTMY',
      url: url,
    }).toString()
    await invoke('create_window', { params })
  }

  const onSubmit = (values: any) => {
    // https://www.youtube.com/watch?v=4iN84gLicnM -> errado
    // https://www.youtube.com/embed/rggg1mrQTMY -> certo

    // https://www.twitch.tv/baiano - errado
    // https://player.twitch.tv/?channel=baiano&parent=localhost -> certo video
    // https://www.twitch.tv/embed/baiano/chat?parent=localhost -> certo chat

    // https://docs.google.com/document/d/1aJTx22S6WyqoNE6prNiU0qtRRtrP4QqJFEsbw8BKppA/edit?usp=sharing
    console.log('Values', values)
    const getFunc = types.find((type) => type.type === values.type)
      ?.getUrl as any
    const urlToPass = getFunc(values.url) as string
    // invoke('create_window')
    openViewer(urlToPass)
    // setIframeOpen(true)
  }

  const type = watch('type')

  return (
    <main className="min-h-screen min-w-screen bg-red-300 flex">
      <div className="flex-1 bg-black flex items-center justify-center flex-col">
        <>
          <h1 className="text-white bg-red-500 text-center mb-2">
            Insira uma URL
          </h1>
          <form
            className="bg-blue-300 w-full flex flex-col items-center justify-center gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            {type && (
              <input
                {...register('url')}
                placeholder="Ex: https://youtube.com/..."
                className="bg-red-200 rounded-md px-4 py-2"
              />
            )}

            <div className="flex gap-2">
              {/* aki vai ser o map */}
              {!type &&
                types.map((obj) => (
                  <button
                    type="button"
                    onClick={() => setValue('type', obj.type)}
                    className="cursor-pointer flex-1 p-2 bg-red-400 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <div className="text-white text-center">
                      <h2 className="font-bold text-lg">{obj.title}</h2>
                      <p className="text-sm">{obj.subTitle}</p>
                    </div>
                  </button>
                ))}
              {type && (
                <button
                  type="button"
                  onClick={() => setValue('type', '')}
                  className="cursor-pointer flex-1 p-2 bg-red-400 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <div className="text-white text-center">
                    <h2 className="font-bold text-lg">Voltar</h2>
                    {/* <p className="text-sm">insira url de um vídeo</p> */}
                  </div>
                </button>
              )}
            </div>
          </form>
        </>
      </div>
    </main>
  )
}

export default App
