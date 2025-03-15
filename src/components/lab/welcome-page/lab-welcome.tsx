"use client"

import { Bot } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"
import BackButton from "../../buttons/back-button"
import AddPipWelcomeSection from "./add-pip-welcome-section"

export default function LabWelcome() {
	return (
		<div
			className="h-screen overflow-y-auto bg-gradient-to-b from-slate-50
			to-blue-50 dark:from-gray-900 dark:to-pipTheme rounded-none"
		>
			<div className="absolute top-6 left-4">
				<BackButton />
			</div>
			<div className="p-6 pb-2 px-44">
				<div className="space-y-12 h-full">
					<div className="text-center">
						<Bot className="w-16 h-16 text-blue-600 dark:text-blue-400 animate-bounce mx-auto" />
						<h1
							className={cn(
								"bg-gradient-to-r from-blue-600 via-blue-600 to-blue-600",
								"dark:from-blue-400 dark:via-blue-400 dark:to-blue-400",
								"text-4xl font-bold bg-clip-text text-transparent text-blue-600 dark:text-blue-400"
							)}
						>
							Welcome to The Lab
						</h1>
					</div>
					<div className="flex flex-col gap-12">
						<AddPipWelcomeSection />
					</div>
				</div>
			</div>
		</div>
	)
}
