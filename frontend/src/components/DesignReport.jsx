export default function DesignReport({ data }) {
  if (!data) return <p className="text-gray-400">No design report available.</p>

  const handlePrint = () => window.print()

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handlePrint}
          className="bg-[#FF5F1F] hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold transition flex items-center gap-2"
        >
          📄 Download Report
        </button>
      </div>

      {data.refined_problem_statement && (
        <div className="bg-[#FF5F1F]/10 border border-[#FF5F1F] rounded-xl p-5">
          <h3 className="text-[#FF5F1F] font-bold text-lg mb-2">🎯 Refined Problem Statement</h3>
          <p className="text-white text-base leading-relaxed">{data.refined_problem_statement}</p>
        </div>
      )}

      {data.design_opportunities?.length > 0 && (
        <div>
          <h3 className="text-white font-bold text-lg mb-3">💡 Design Opportunities</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.design_opportunities.map((opp, i) => (
              <div key={i} className="bg-[#111827] rounded-xl p-4 border border-green-500/30">
                <h4 className="text-[#10B981] font-bold mb-2">{opp.title}</h4>
                <p className="text-gray-400 text-sm">{opp.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.risks_and_challenges?.length > 0 && (
        <div>
          <h3 className="text-white font-bold text-lg mb-3">⚠️ Risks & Challenges</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.risks_and_challenges.map((risk, i) => (
              <div key={i} className="bg-[#111827] rounded-xl p-4 border border-red-500/30">
                <h4 className="text-red-400 font-bold mb-2">{risk.title}</h4>
                <p className="text-gray-400 text-sm">{risk.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.recommended_next_steps?.length > 0 && (
        <div className="bg-[#111827] rounded-xl p-5">
          <h3 className="text-white font-bold text-lg mb-3">🚀 Recommended Next Steps</h3>
          <ol className="space-y-2">
            {data.recommended_next_steps.map((step, i) => (
              <li key={i} className="text-gray-300 flex items-start gap-3">
                <span className="bg-[#FF5F1F] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                {step}
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.key_stakeholder_priorities?.length > 0 && (
          <div className="bg-[#111827] rounded-xl p-5">
            <h3 className="text-white font-bold text-lg mb-3">👥 Key Stakeholder Priorities</h3>
            <ul className="space-y-2">
              {data.key_stakeholder_priorities.map((p, i) => (
                <li key={i} className="text-gray-300 text-sm flex items-center gap-2">
                  <span className="text-[#FF5F1F] font-bold">#{i + 1}</span> {p}
                </li>
              ))}
            </ul>
          </div>
        )}

        {data.ethical_considerations?.length > 0 && (
          <div className="bg-[#111827] rounded-xl p-5">
            <h3 className="text-white font-bold text-lg mb-3">⚖️ Ethical Considerations</h3>
            <ul className="space-y-2">
              {data.ethical_considerations.map((e, i) => (
                <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                  <span className="text-purple-400">•</span> {e}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {data.sustainability_notes?.length > 0 && (
        <div className="bg-[#111827] rounded-xl p-5 border border-green-500/30">
          <h3 className="text-white font-bold text-lg mb-3">🌱 Sustainability Notes</h3>
          <ul className="space-y-2">
            {data.sustainability_notes.map((note, i) => (
              <li key={i} className="text-gray-300 text-sm flex items-start gap-2">
                <span className="text-[#10B981]">•</span> {note}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
