import { observer } from "mobx-react"
import getGamesClass from "../../../classes/games-class"

// eslint-disable-next-line max-lines-per-function
function DinoLeaderboard(): React.ReactNode {
	const sortedScores = getGamesClass().sortedDinoScores
	const highScore = getGamesClass().highScore

	const formatTimestamp = (timestamp: Date): string => {
		const now = new Date()
		const diffInMs = now.getTime() - timestamp.getTime()
		const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
		const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
		const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

		if (diffInMinutes < 1) return "Just now"
		if (diffInMinutes < 60) return `${diffInMinutes}m ago`
		if (diffInHours < 24) return `${diffInHours}h ago`
		if (diffInDays < 7) return `${diffInDays}d ago`
		return timestamp.toLocaleDateString()
	}

	const getScoreColor = (score: number): string => {
		if (score === highScore) return "text-yellow-500"
		if (score >= highScore * 0.8) return "text-green-500"
		if (score >= highScore * 0.6) return "text-blue-500"
		if (score >= highScore * 0.4) return "text-orange-500"
		return "text-red-500"
	}

	const getRankIcon = (index: number): React.ReactNode => {
		if (index === 0) return "🥇"
		if (index === 1) return "🥈"
		if (index === 2) return "🥉"
		return null
	}

	return (
		<div className="max-w-4xl mx-auto p-6">
			{/* Header Section */}
			<div className="text-center mb-8">
				<h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
					🦖 Dino Game Leaderboard
				</h1>
				<p className="text-eel text-lg">Track your progress and beat your best scores!</p>
			</div>

			{/* Leaderboard Table */}
			<div className="bg-standardBackground rounded-xl shadow-lg overflow-hidden">
				<div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
					<h2 className="text-xl font-bold text-white">🏆 Score Rankings</h2>
				</div>

				{sortedScores.length === 0 ? (
					<div className="p-8 text-center">
						<div className="text-6xl mb-4">🦖</div>
						<h3 className="text-xl font-semibold text-eel mb-2">No scores yet!</h3>
						<p className="text-wolf">Play your first game to see your scores here.</p>
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full">
							<thead className="bg-swan">
								<tr>
									<th className="px-6 py-3 text-left text-xs font-medium text-wolf uppercase tracking-wider">
										Rank
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-wolf uppercase tracking-wider">
										Score
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-wolf uppercase tracking-wider">
										When
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-wolf uppercase tracking-wider">
										Performance
									</th>
									<th className="px-6 py-3 text-left text-xs font-medium text-wolf uppercase tracking-wider">
										Username
									</th>
								</tr>
							</thead>
							<tbody className="bg-standardBackground divide-y divide-swan">
								{sortedScores.map((scoreData, index): React.ReactNode => (
									<tr
										key={`${scoreData.score}-${scoreData.timestamp.getTime()}`}
										className={`hover:bg-yellow-100 dark:hover:bg-yellow-900 transition-colors ${
											scoreData.score === highScore ? "bg-yellow-50 dark:bg-yellow-800" : ""
										}`}
									>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center">
												{
													index < 3 ? (
														<span className="text-2xl mr-3">{getRankIcon(index)}</span>
													) : (
														<span className="text-2xl font-bold text-eel bg-swan
														rounded-full w-8 h-8 flex items-center justify-center mr-3">
															{index + 1}
														</span>
													)
												}
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap flex items-center justify-center">
											<span className={`text-2xl font-bold ${getScoreColor(scoreData.score)}`}>
												{scoreData.score}
											</span>
											{scoreData.score === highScore && (
												<span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full
												text-xs font-medium bg-bee text-beakInner-2">
													🏆 High Score!
												</span>
											)}
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-wolf">
											{formatTimestamp(scoreData.timestamp)}
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="flex items-center justify-center">
												<div className="w-16 bg-swan rounded-full h-2 mr-3">
													<div
														className="bg-gradient-to-r from-green-400 to-blue-500
														h-2 rounded-full transition-all duration-300"
														style={{
															width: `${Math.min((scoreData.score / highScore) * 100, 100)}%`
														}}
													></div>
												</div>
												<span className="text-xs text-wolf">
													{Math.round((scoreData.score / highScore) * 100)}%
												</span>
											</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-sm text-wolf">
											{scoreData.username}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	)
}

export default observer(DinoLeaderboard)
