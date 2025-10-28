
"use client"

import { ArrowLeft, MessageCircle } from "lucide-react"
import { Particles } from "../../magicui/particles"
import personalInfoClass from "../../../classes/personal-info-class"
import { cn } from "../../../lib/utils"

interface Props {
	careerTitle?: string
}




// eslint-disable-next-line max-lines-per-function
export default function CareerActivityLoadingComponent({ careerTitle }: Props): React.ReactNode {
	const isDarkMode = personalInfoClass.defaultSiteTheme === "dark"

	return (
		<div className="flex flex-col h-screen min-h-0">
			{/* Loading Header - mimics CareerQuestActivityHeader */}
			<header className="h-20 flex items-center px-4 shadow-xs fixed top-0 left-0 right-0 bg-standard-background z-10">
				{/* Left section with back button */}
				<div className="w-1/4 flex items-center">
					<button
						className="flex items-center text-question-text hover:bg-polar p-2 rounded-lg mr-2 opacity-50 cursor-not-allowed"
					>
						<ArrowLeft size={30} className="mr-1" />
					</button>
				</div>

				{/* Center section with career title */}
				<div className="w-1/2 flex justify-center">
					{careerTitle ? (
						<h1 className="text-5xl font-medium text-question-text text-center opacity-50">
							{careerTitle}
						</h1>
					) : (
						<div className="bg-swan animate-pulse rounded h-12 w-80"></div>
					)}
				</div>

				{/* Right section with disabled buttons */}
				<div className="w-1/4 flex justify-end items-center pr-4 gap-2">
					<button className="flex items-center p-2 rounded-lg text-question-text opacity-50 cursor-not-allowed">
						<MessageCircle size={24} />
					</button>
					{/* Progress circle skeleton */}
					<div className="bg-swan animate-pulse rounded-full h-12 w-12"></div>
				</div>
			</header>

			{/* Main Content Area - mimics CareerLayout */}
			<div className="relative flex-1 min-h-0 pt-20 overflow-hidden">
				<Particles
					className="absolute inset-0"
					quantity={100}
					ease={80}
					color={isDarkMode ? "#ffffff" : "#000000"}
					refresh
				/>

				{/* Two-panel layout matching CareerLayout */}
				<div className="flex h-full">
					{/* Left Panel - mimics LeftContentSwiper */}
					<div className="relative" style={{ width: "45%" }}>
						<div className="px-[100px] py-8 h-full pointer-events-none">
							<div className="h-full pointer-events-auto">
								<div className="h-[calc(100vh-10rem)]">
									<div className="border-2 border-swan rounded-3xl bg-polar h-full overflow-hidden">
										<div className="h-full flex items-center justify-center px-[25px]">
											<div className="space-y-6">
												<div className="bg-swan animate-pulse rounded h-8 w-3/4 mx-auto"></div>
												<div className="space-y-3">
													<div className="bg-swan animate-pulse rounded h-4 w-full"></div>
													<div className="bg-swan animate-pulse rounded h-4 w-5/6 mx-auto"></div>
													<div className="bg-swan animate-pulse rounded h-4 w-4/5 mx-auto"></div>
												</div>
												<div className="bg-swan animate-pulse rounded h-6 w-1/2 mx-auto"></div>
												<div className="space-y-2">
													<div className="bg-swan animate-pulse rounded h-4 w-full"></div>
													<div className="bg-swan animate-pulse rounded h-4 w-3/4 mx-auto"></div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Right Panel - mimics RightContent */}
					<div
						className="sticky top-0 h-[calc(100vh-10rem)]"
						style={{ width: "55%" }}
					>
						<div
							className={cn(
								"flex items-center justify-center h-full",
								"border-2 border-swan rounded-3xl bg-polar my-8"
							)}
							style={{ marginRight: "100px" }}
						>
							{/* Loading right content */}
							<div className="space-y-4 p-8 w-full">
								<div className="bg-swan animate-pulse rounded-3xl h-10 w-1/2 mx-auto"></div>
								<div className="bg-swan animate-pulse rounded-3xl h-64 w-full"></div>
								<div className="space-y-2">
									<div className="bg-swan animate-pulse rounded-3xl h-4 w-3/4 mx-auto"></div>
									<div className="bg-swan animate-pulse rounded-3xl h-4 w-1/2 mx-auto"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
