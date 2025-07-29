import { invoke } from '@tauri-apps/api/core'
import './App.css'
import { useForm } from 'react-hook-form'
import { types } from './utils/types'
import { useState } from 'react'

function App() {
  const [placeholder, setPlaceholder] = useState('')

  const { register, handleSubmit, setValue, watch } = useForm()

  const openViewer = async (url: string) => {
    const params = new URLSearchParams({
      url: url,
    }).toString()
    await invoke('create_window', { params })
  }

  const onSubmit = (values: any) => {
    console.log('VLUES', values)

    const getFunc = types.find((type) => type.type === values.type)
      ?.getUrl as any
    const urlToPass = getFunc(values.url) as string
    openViewer(urlToPass)
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
              <div className="flex gap-2 relative bg-black">
                <input
                  {...register('url')}
                  placeholder={`Ex: ${placeholder}`}
                  className="bg-red-200 rounded-md px-4 py-2"
                />
                <button className="absolute top-1/2 -right-10">arrow</button>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {/* aki vai ser o map */}
              {!type &&
                types.map((obj) => (
                  <button
                    type="button"
                    onClick={() => {
                      setValue('type', obj.type)
                      setPlaceholder(obj.placeholder)
                    }}
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
