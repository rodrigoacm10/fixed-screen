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
        <div className="flex-1 flex items-center justify-center flex-col">
          <>
            <h1 className="text-white text-center mb-2 font-bold">URL Type</h1>
            <form
              className="w-full flex flex-col items-center justify-center gap-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              {type && (
                <div className="flex flex-col gap-2 w-full px-2">
                  <input
                    {...register('url')}
                    placeholder={`Ex: ${placeholder}`}
                    className="rounded-md px-4 py-2 text-white placeholder:text-[#ffffff]/10 border-[#ffff]/10 border-[1px]"
                  />
                  <div className="flex-1 grid grid-cols-2 gap-2 justify-between">
                    <button
                      type="button"
                      onClick={() => setValue('type', '')}
                      className="flex-1 p-2 bg-[#333030] text-white rounded-md"
                    >
                      back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-[#333030] text-white  rounded-md"
                    >
                      submit
                    </button>
                  </div>
                </div>
              )}

              {!type && (
                <div className="flex flex-wrap gap-2 p-2">
                  {handleTypes.map((obj) => {
                    const { Icon } = obj

                    return (
                      <button
                        type="button"
                        onClick={() => {
                          setValue('type', obj.type)
                          setPlaceholder(obj.placeholder)
                        }}
                        className="w-[120px] h-[75px] p-2 cursor-pointer flex-1 bg-[#333030] rounded-md focus:outline-none focus:ring-2 focus:ring-white flex flex-col justify-center items-center"
                      >
                        <Icon />
                        <h2 className="font-bold text-[16px] text-white">
                          {obj.title}
                        </h2>
                      </button>
                    )
                  })}
                </div>
              )}
            </form>
          </>
        </div>
      </main>
    </>
  )
}

export default App
