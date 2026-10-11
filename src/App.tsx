import { useEffect, useState } from "react"

const DURATION = 30 * 60

export default function App() {
  const [seconds, setSeconds] = useState(DURATION)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    if (!running) return
    const id = setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => clearInterval(id)
  }, [running])

  useEffect(() => {
    if (seconds <= 0) setRunning(false)
  }, [seconds])

  const restart = () => {
    setRunning(false)
    setSeconds(DURATION)
  }

  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0")
  const secs = String(seconds % 60).padStart(2, "0")

  const button =
    "h-10 w-10 rounded-full bg-white/20 text-white text-lg pointer-events-auto hover:bg-white/30 active:scale-95 transition disabled:opacity-40"

  return (
    <div className="relative h-svh w-svw overflow-hidden">
      <img
        src="https://i.pinimg.com/originals/e9/93/82/e99382b77363dfbb334cca0ededf90a7.gif"
        className="absolute top-0 left-0 h-full w-full object-cover pointer-events-none"
      />
      <div
        data-tauri-drag-region
        className="absolute top-0 left-0 h-full w-full bg-black/50 backdrop-blur-xs"
      >
        <div className="flex h-full w-full flex-col items-center justify-center gap-4 pointer-events-none">
          <span className="text-6xl font-semibold tabular-nums text-white select-none">
            {minutes}:{secs}
          </span>
          <div className="flex gap-3">
            <button className={button} onClick={() => setRunning(true)} disabled={running || seconds <= 0}>
              ▶
            </button>
            <button className={button} onClick={() => setRunning(false)} disabled={!running}>
              ❚❚
            </button>
            <button className={button} onClick={restart}>
              ↺
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}