export default function StakeholderCard({ stakeholder }) {
  const { name, role, why_they_matter, relevance_score } = stakeholder
  const score = Number(relevance_score) || 0

  return (
    <div className="bg-[#111827] rounded-xl p-5 border-l-4 border-[#FF5F1F] hover:bg-gray-900 transition">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-white font-bold text-lg">{name}</h3>
          <p className="text-[#FF5F1F] text-sm font-medium">{role}</p>
        </div>
        <span className="bg-[#FF5F1F] text-white text-xs font-bold px-2 py-1 rounded-full">
          {score}/10
        </span>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed">{why_they_matter}</p>
      <div className="mt-3">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
          <span>Relevance</span>
          <span>{score * 10}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div
            className="bg-[#FF5F1F] h-2 rounded-full transition-all duration-500"
            style={{ width: `${score * 10}%` }}
          />
        </div>
      </div>
    </div>
  )
}
