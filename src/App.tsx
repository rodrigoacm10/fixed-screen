import { invoke } from '@tauri-apps/api/core'
import './App.css'
import { useForm } from 'react-hook-form'
import { handleTypes, HandleTypesType } from './utils/handleTypes'
import { useState } from 'react'
import { urlSchema, UrlSchemaType } from './schemas/urlSchema'
import { zodResolver } from '@hookform/resolvers/zod'
import { ToolBar } from './components/ToolBar'

function App() {
  const [placeholder, setPlaceholder] = useState('')

  const { register, handleSubmit, setValue, watch } = useForm<UrlSchemaType>({
    resolver: zodResolver(urlSchema),
  })

  const openViewer = async (url: string) => {
    const params = new URLSearchParams({
      url: url,
    }).toString()
    await invoke('create_window', { params })
  }

  const onSubmit = (values: UrlSchemaType) => {
    if (!values.type || !values.url) throw new Error('invalid submit')

    const handleType = handleTypes.find(
      (type) => type.type === (values.type as HandleTypesType),
    )
    if (!handleType) throw new Error('invalid submit')

    const urlToPass = handleType.getUrl(values.url)
    openViewer(urlToPass)

    setValue('url', '')
  }

  const type = watch('type')

  return (
    <>
      <main className="min-h-screen min-w-screen bg-black/75 flex flex-col">
        <ToolBar />
        <div className="flex-1 bg-blac flex items-center justify-center flex-col">
          <>
            <h1 className="text-white bg-red-500 text-center mb-2">
              Insira uma URL
            </h1>
            <form
              className="bg-blue-300 w-full flex flex-col items-center justify-center gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              {type && (
                <div className="flex gap-2 bg-black">
                  <button
                    type="button"
                    onClick={() => setValue('type', '')}
                    className="cursor-pointer flex-1 p-2 bg-red-400 rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    voltar
                  </button>
                  <input
                    {...register('url')}
                    placeholder={`Ex: ${placeholder}`}
                    className="bg-red-200 rounded-md px-4 py-2"
                  />
                  <button type="submit" className="text-white">
                    arrow
                  </button>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {/* aki vai ser o map */}
                {!type &&
                  handleTypes.map((obj) => (
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
              </div>
            </form>
          </>
        </div>
      </main>
    </>
  )
}

export default App
