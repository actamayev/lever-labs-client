import { Bot, Rocket, Car, Brain } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/shadcn/ui/card"

export default function LabWelcome() {
	return (
		<div className="max-w-4xl mx-auto p-6 space-y-8">
			{/* Hero Section */}
			<div className="text-center space-y-4">
				<h1 className="text-4xl font-bold text-purple-600">Welcome to the Lab! 🚀</h1>
				<p className="text-xl text-gray-600">This is where the magic happens.</p>
			</div>

			{/* Features Grid */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				<Card className="bg-gradient-to-br from-blue-50 to-purple-50">
					<CardHeader className="space-y-1">
						<div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
							<Rocket className="w-6 h-6 text-blue-600" />
						</div>
						<CardTitle className="text-lg">Land Rockets</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-600">Learn the same skills used to land real rockets!</p>
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-green-50 to-blue-50">
					<CardHeader className="space-y-1">
						<div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-2">
							<Car className="w-6 h-6 text-green-600" />
						</div>
						<CardTitle className="text-lg">Design Self-Driving Cars</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-600">Explore the technology behind autonomous vehicles!</p>
					</CardContent>
				</Card>

				<Card className="bg-gradient-to-br from-purple-50 to-pink-50">
					<CardHeader className="space-y-1">
						<div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
							<Bot className="w-6 h-6 text-purple-600" />
						</div>
						<CardTitle className="text-lg">Build Walking Robots</CardTitle>
					</CardHeader>
					<CardContent>
						<p className="text-gray-600">Create robots that can walk and talk!</p>
					</CardContent>
				</Card>
			</div>

			{/* Lab Structure */}
			<Card className="bg-white">
				<CardHeader>
					<CardTitle className="text-2xl text-gray-800">How The Lab Works</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex items-start space-x-4">
						<div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
							<Brain className="w-4 h-4 text-purple-600" />
						</div>
						<div>
							<p className="text-gray-700">
								The Lab is split into elements that get progressively more difficult.
								Each element contains a set of lessons where you&apos;ll explore Pip&apos;s peripherals through:</p>
							<ul className="mt-2 space-y-2 text-gray-600">
								<li className="flex items-center">
									<span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
									Short, engaging readings
								</li>
								<li className="flex items-center">
									<span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
								Hands-on coding exercises
								</li>
							</ul>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
