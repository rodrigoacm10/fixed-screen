import { getCurrentWindow } from '@tauri-apps/api/window'

export const ToolBar = () => {
  const appWindow = getCurrentWindow()

  return (
    <div className="fixed top-0 left-0 right-0 h-[30px] select-none grid grid-cols-[auto_max-content]">
      <div data-tauri-drag-region></div>
      <div className="flex">
        <button
          onClick={() => appWindow.minimize()}
          id="titlebar-minimize"
          title="minimize"
          className="appearance-none p-0 m-0 border-none inline-flex justify-center items-center w-[30px] bg-transparent hover:bg-[#5bbec3]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            color="#ffffff"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="M19 13H5v-2h14z" />
          </svg>
        </button>
        <button
          onClick={() => appWindow.toggleMaximize()}
          id="titlebar-maximize"
          title="maximize"
          className="appearance-none p-0 m-0 border-none inline-flex justify-center items-center w-[30px] bg-transparent hover:bg-[#5bbec3]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            color="#ffffff"
            viewBox="0 0 24 24"
          >
            <path fill="currentColor" d="M4 4h16v16H4zm2 4v10h12V8z" />
          </svg>
        </button>
        <button
          onClick={() => appWindow.close()}
          id="titlebar-close"
          title="close"
          className="appearance-none p-0 m-0 border-none inline-flex justify-center items-center w-[30px] bg-transparent hover:bg-[#5bbec3]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            color="#ffffff"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M13.46 12L19 17.54V19h-1.46L12 13.46L6.46 19H5v-1.46L10.54 12L5 6.46V5h1.46L12 10.54L17.54 5H19v1.46z"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
