import { motion } from "framer-motion"

export default function CareerLoadingSkeleton() {
	return (
		<div className="flex h-full">
			{/* Left side skeleton */}
			<div
				className="overflow-y-auto scrollbar-hide"
				style={{ width: "45%" }}
			>
				<div className="py-8 space-y-8" style={{ paddingLeft: "65px", paddingRight: "55px" }}>
					{/* Multiple skeleton sections with staggered animation */}
					{[1, 2, 3, 4, 5].map((i) => (
						<motion.div
							key={i}
							className="min-h-[50vh] space-y-4"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: i * 0.1, duration: 0.3 }}
						>
							<div className="h-8 bg-gray-200 rounded animate-pulse" />
							<div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
							<div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
							{/* Add challenge-like skeleton occasionally */}
							{i % 2 === 0 && (
								<div className="mt-8 p-4 border-2 border-gray-200 rounded-lg">
									<div className="h-6 bg-gray-200 rounded animate-pulse mb-4" />
									<div className="h-32 bg-gray-200 rounded animate-pulse" />
								</div>
							)}
						</motion.div>
					))}
				</div>
			</div>

			{/* Right side skeleton */}
			<div
				className="sticky top-0 h-[calc(100vh-5rem)] bg-standardBackground border-l-2 border-swan flex items-center justify-center"
				style={{ width: "55%" }}
			>
				<motion.div
					className="flex flex-col items-center space-y-4"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 0.2 }}
				>
					<div className="flex space-x-1">
						<div className="w-2 h-2 bg-macaw rounded-full animate-bounce"></div>
						<div className="w-2 h-2 bg-macaw rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}/>
						<div className="w-2 h-2 bg-macaw rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}/>
					</div>
					<p className="text-sm text-gray-500">Loading your career quest...</p>
				</motion.div>
			</div>
		</div>
	)
}
