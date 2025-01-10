/* eslint-disable max-len */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/ui/card"
import {
	Lightbulb,
	Compass,
	Gauge,
	Radar,
	Activity,
	Brain,
	Bot,
	Footprints
} from "lucide-react"

// eslint-disable-next-line max-lines-per-function
export default function LabWelcome() {
	return (
		<div className="max-w-5xl mx-auto p-6 space-y-12 bg-gradient-to-b from-slate-50 to-purple-50 dark:from-zinc-900 dark:to-purple-900">
			<div className="text-center space-y-6 py-8">
				<div className="flex justify-center mb-4">
					<div className="relative">
						<Bot className="w-16 h-16 text-purple-600 dark:text-purple-400 animate-bounce" />
					</div>
				</div>
				<h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 dark:from-purple-400 dark:via-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          Welcome to The Lab!
				</h1>
				<p className="text-2xl text-gray-600 dark:text-gray-300">Start Your Robotics Journey</p>
				<p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Learn the fundamental engineering skills behind complex systems like rockets,
          self-driving cars, and walking robots by programming your own robot!
				</p>
			</div>

			{/* Features Grid - Pip's Sensors */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				<Card className="group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/50 dark:to-purple-900/50 border-2 border-blue-100 dark:border-blue-800">
					<CardHeader className="space-y-1">
						<div className="w-16 h-16 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
							<Radar className="w-8 h-8 text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
						</div>
						<CardTitle className="text-xl dark:text-white">Sense the World</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-600 dark:text-gray-300 text-xl">Master distance sensors, color detection, and motion sensing to help your robot understand its environment!</p>
					</CardContent>
				</Card>

				<Card className="group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/50 dark:to-blue-900/50 border-2 border-green-100 dark:border-green-800">
					<CardHeader className="space-y-1">
						<div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
							<Footprints className="w-8 h-8 text-green-600 dark:text-green-400 group-hover:rotate-180 transition-transform duration-700" />
						</div>
						<CardTitle className="text-xl dark:text-white">Control Movement</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-600 dark:text-gray-300 text-xl">Learn to control motors with precision using real-time feedback from encoders!</p>
					</CardContent>
				</Card>

				<Card className="group hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/50 dark:to-pink-900/50 border-2 border-purple-100 dark:border-purple-800">
					<CardHeader className="space-y-1">
						<div className="w-16 h-16 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-300">
							<Brain className="w-8 h-8 text-purple-600 dark:text-purple-400 group-hover:rotate-[20deg] transition-transform duration-300" />
						</div>
						<CardTitle className="text-xl dark:text-white">Solve Challenges</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-600 dark:text-gray-300 text-xl">Take on exciting challenges like line following and obstacle avoidance using real engineering principles!</p>
					</CardContent>
				</Card>
			</div>

			{/* Your Learning Journey */}
			<Card className="bg-white dark:bg-zinc-800 hover:shadow-xl transition-all duration-300 border-2 border-purple-100 dark:border-purple-800">
				<CardHeader className="border-b border-purple-100 dark:border-purple-800">
					<div className="flex items-center space-x-3">
						<Activity className="w-8 h-8 text-purple-600 dark:text-purple-400" />
						<CardTitle className="text-2xl text-gray-800 dark:text-white">Your Learning Journey</CardTitle>
					</div>
				</CardHeader>
				<CardContent className="space-y-6 pt-6">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="space-y-4">
							<h3 className="font-bold text-lg text-purple-700 dark:text-purple-400">Meet Your Robot&apos;s Brain</h3>
							<div className="grid grid-cols-2 gap-3">
								<div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
									<Lightbulb className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />
									<span className="text-2xl">RGB LEDs</span>
								</div>
								<div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
									<Radar className="w-5 h-5 text-blue-500 dark:text-blue-400" />
									<span className="text-2xl">ToF Sensors</span>
								</div>
								<div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
									<Gauge className="w-5 h-5 text-green-500 dark:text-green-400" />
									<span className="text-2xl">Color Sensor</span>
								</div>
								<div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
									<Compass className="w-5 h-5 text-red-500 dark:text-red-400" />
									<span className="text-2xl">IMU</span>
								</div>
							</div>
						</div>

						<div className="space-y-4">
							<h3 className="font-bold text-lg text-blue-700 dark:text-blue-400">Your Path Forward</h3>
							<ul className="space-y-2 text-gray-600 dark:text-gray-300">
								<li className="flex items-center space-x-2">
									<span className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full"></span>
									<span className="text-2xl">Start with the basics of each sensor</span>
								</li>
								<li className="flex items-center space-x-2">
									<span className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full"></span>
									<span className="text-2xl">Combine sensors for complex behaviors</span>
								</li>
								<li className="flex items-center space-x-2">
									<span className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full"></span>
									<span className="text-2xl">Take on real engineering challenges</span>
								</li>
							</ul>
						</div>
					</div>

					<div className="bg-purple-50 dark:bg-purple-900/50 p-4 rounded-lg mt-4">
						<div className="flex items-center space-x-2 text-purple-700 dark:text-purple-400 font-medium">
							<Brain className="w-10 h-10" />
							<p className="text-2xl">Each lesson includes clear explanations and hands-on coding exercises with your robot!</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
