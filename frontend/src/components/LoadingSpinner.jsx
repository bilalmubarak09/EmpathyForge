import { useState, useEffect } from 'react'

const messages = [
  'Identifying stakeholders...',
  'Generating empathy maps...',
  'Running critical analysis...',
  'Compiling your design report...',
  'Almost there...',
]

export default function LoadingSpinner() {
  const [msgIndex, setMsgIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex(i => (i + 1) % messages.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-[#0A0F2C] bg-opacity-95 flex flex-col items-center justify-center z-50">
      <div className="text-center">
        <div className="text-3xl font-black mb-2">
          <span className="text-white">Empathy</span>
          <span className="text-[#FF5F1F]">Forge</span>
        </div>
        <div className="flex space-x-2 justify-center my-8">
          {[0, 1, 2].map(i => (
            <div key={i} className="w-4 h-4 bg-[#FF5F1F] rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
        <p className="text-white text-xl font-semibold mb-2">🧠 EmpathyForge is thinking...</p>
        <p className="text-[#9CA3AF] text-sm animate-pulse">{messages[msgIndex]}</p>
      </div>
    </div>
  )
}
