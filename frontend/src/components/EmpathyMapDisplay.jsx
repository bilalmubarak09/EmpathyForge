const sections = [
  { key: 'think_and_believe', icon: '💭', title: 'Think & Believe', color: 'border-blue-500', bg: 'bg-blue-500/10' },
  { key: 'feel', icon: '❤️', title: 'Feel', color: 'border-red-500', bg: 'bg-red-500/10' },
  { key: 'say_and_do', icon: '🗣️', title: 'Say & Do', color: 'border-green-500', bg: 'bg-green-500/10' },
  { key: 'pain_points', icon: '😤', title: 'Pain Points', color: 'border-orange-500', bg: 'bg-orange-500/10' },
  { key: 'gains', icon: '🏆', title: 'Gains', color: 'border-yellow-500', bg: 'bg-yellow-500/10' },
  { key: 'influence_on_design', icon: '🎯', title: 'Influence on Design', color: 'border-purple-500', bg: 'bg-purple-500/10' },
]

export default function EmpathyMapDisplay({ stakeholderName, data }) {
  if (!data) return <p className="text-gray-400">No empathy map data available.</p>

  return (
    <div>
      <h3 className="text-xl font-bold text-white mb-4">
        Empathy Map: <span className="text-[#FF5F1F]">{stakeholderName}</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map(({ key, icon, title, color, bg }) => {
          const items = Array.isArray(data[key]) ? data[key] : []
          return (
            <div key={key} className={`rounded-xl p-4 border ${color} ${bg}`}>
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <span>{icon}</span> {title}
              </h4>
              <ul className="space-y-2">
                {items.map((item, i) => (
                  <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                    <span className="text-[#FF5F1F] mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
