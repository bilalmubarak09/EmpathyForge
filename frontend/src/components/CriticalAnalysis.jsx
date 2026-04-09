const personas = [
  { key: 'skeptic', icon: '🧐', title: 'The Skeptic', color: 'border-gray-500' },
  { key: 'investor', icon: '💰', title: 'The Investor', color: 'border-yellow-500' },
  { key: 'environmentalist', icon: '🌍', title: 'The Environmentalist', color: 'border-green-500' },
  { key: 'manufacturer', icon: '🏭', title: 'The Manufacturer', color: 'border-blue-500' },
  { key: 'end_user', icon: '👤', title: 'The End User', color: 'border-pink-500' },
  { key: 'ethicist', icon: '⚖️', title: 'The Ethicist', color: 'border-purple-500' },
  { key: 'local_context_analyst', icon: '🇵🇰', title: 'The Local Context Analyst', color: 'border-[#FF5F1F]' },
]

export default function CriticalAnalysis({ data }) {
  if (!data) return <p className="text-gray-400">No critical analysis available.</p>

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {personas.map(({ key, icon, title, color }) => (
        <div key={key} className={`bg-[#111827] rounded-xl p-5 border-t-4 ${color}`}>
          <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
            <span>{icon}</span> {title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">{data[key] || 'No response available.'}</p>
        </div>
      ))}
    </div>
  )
}
