import { motion } from "framer-motion"
export default function CareerLoadingSkeletonRight() {
	return (
		<div className="flex items-center justify-center h-full">
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
	)
}
