import { motion } from "framer-motion"

export default function CareerLoadingSkeletonLeft() {
	return (
		<div className="py-8 space-y-8" style={{ paddingLeft: "65px", paddingRight: "55px" }}>
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
					{i % 2 === 0 && (
						<div className="mt-8 p-4 border-2 border-gray-200 rounded-lg">
							<div className="h-6 bg-gray-200 rounded animate-pulse mb-4" />
							<div className="h-32 bg-gray-200 rounded animate-pulse" />
						</div>
					)}
				</motion.div>
			))}
		</div>
	)
}
