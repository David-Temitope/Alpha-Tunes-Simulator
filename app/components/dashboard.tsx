"use client"

import { useGame } from "../context/game-context"

const Dashboard = () => {
  const { getCareerStatus } = useGame()

  return (
    <div className="bg-gray-800 p-4 rounded-md shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Overview Section */}
        <div className="bg-gray-700 p-4 rounded-md">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Overview</h3>
          <p className="text-gray-400">Here's a quick overview of your progress.</p>
        </div>

        {/* Industry Status Section */}
        <div className="bg-gray-700 p-4 rounded-md">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Industry Status</h3>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{getCareerStatus()}</div>
            <div className="text-sm text-gray-400">Industry Status</div>
          </div>
        </div>

        {/* Next Steps Section */}
        <div className="bg-gray-700 p-4 rounded-md">
          <h3 className="text-lg font-semibold text-gray-300 mb-2">Next Steps</h3>
          <p className="text-gray-400">What should you focus on next to advance your career?</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
