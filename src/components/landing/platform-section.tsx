"use client"

import { useState } from "react"
import Image from "next/image"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { platformTabs } from "./tab-content"
import LandingContainer from "./landing-container"
import { CustomGarage } from "../../icons/custom-garage"
import { CustomSandbox } from "../../icons/custom-sandbox"
import LandingSectionHeaderText from "./landing-section-header-text"
import { cn } from "@/lib/shadcn/utils"

// Helper function to get background color class
const getBackgroundColorClass = (themeColor: string): string => {
	switch (themeColor) {
		case "lever-red":
			return "bg-lever-red/8"
		case "lever-yellow":
			return "bg-lever-yellow/8"
		case "lever-blue":
			return "bg-lever-blue/8"
		default:
			return "bg-gray-500/10"
	}
}

// Helper function to get icon color class
const getIconColorClass = (themeColor: string): string => {
	switch (themeColor) {
		case "lever-red":
			return "text-lever-red"
		case "lever-yellow":
			return "text-lever-yellow"
		case "lever-blue":
			return "text-lever-blue"
		default:
			return "text-gray-500"
	}
}

// eslint-disable-next-line max-lines-per-function
export default function PlatformSection(): React.ReactNode {
	const [activeTab, setActiveTab] = useState<string>("learn")

	return (
		<section className="bg-polar py-8 md:py-16">
			<LandingContainer>
				{/* Section header */}
				<div className="text-center mb-12 space-y-3">
					<LandingSectionHeaderText text="The Lever Labs Platform" />
					<p className="text-lg sm:text-xl text-wolf font-semibold">
						Free. Fun. Effective.
					</p>
				</div>

				{/* Tabs */}
				<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
					{/* Mobile: Scrollable tabs */}
					<div className="md:hidden mb-8">
						<div className="overflow-x-auto scrollbar-hide px-1">
							<TabsList className="inline-flex w-max min-w-full h-auto p-2 gap-3">
								{platformTabs.map((tab): React.ReactNode => {
									// eslint-disable-next-line no-nested-ternary
									const IconComponent = tab.useCustomIcon
										? (tab.id === "sandbox" ? CustomSandbox : CustomGarage)
										: tab.icon

									return (
										<TabsTrigger
											key={tab.id}
											value={tab.id}
											aria-label={tab.label}
											className="gap-2 text-base font-semibold h-auto whitespace-nowrap shrink-0 px-4 py-3 min-w-fit"
										>
											<IconComponent className={cn("size-5", getIconColorClass(tab.themeColor))} />
											{tab.label}
										</TabsTrigger>
									)
								})}
							</TabsList>
						</div>
					</div>

					{/* Desktop: Grid tabs */}
					<TabsList className="hidden md:grid w-full grid-cols-3 mb-8 h-auto p-2">
						{platformTabs.map((tab): React.ReactNode => {
							// eslint-disable-next-line no-nested-ternary
							const IconComponent = tab.useCustomIcon
								? (tab.id === "sandbox" ? CustomSandbox : CustomGarage)
								: tab.icon

							return (
								<TabsTrigger
									key={tab.id}
									value={tab.id}
									aria-label={tab.label}
									className="gap-2 text-2xl sm:text-3xl font-semibold h-auto"
								>
									<IconComponent className={cn("size-6 sm:size-8", getIconColorClass(tab.themeColor))} />
									{tab.label}
								</TabsTrigger>
							)
						})}
					</TabsList>

					<div className="relative">
						{platformTabs.map((tab): React.ReactNode => {
							// eslint-disable-next-line max-len
							const baseClasses = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full blur-[200px] rounded-full"
							const backgroundClasses = `${baseClasses} ${getBackgroundColorClass(tab.themeColor)}`
							return (
								<div
									key={tab.id}
									className={cn("transition-opacity duration-300",
										activeTab === tab.id ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
									)}
								>
									<div className="absolute inset-0 pointer-events-none">
										<div className={backgroundClasses} />
									</div>
									<div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start relative">
										{/* Left column - Content */}
										<div className="space-y-6">
											{/* Title and subtitle */}
											<div>
												<h3 className="text-2xl sm:text-6xl font-semibold mb-4">
													{tab.title}
												</h3>
												<p className="text-lg text-wolf">
													{tab.subtitle}
												</p>
											</div>

											{/* Bullets */}
											<ul className="space-y-3 list-disc list-inside [&>li]:marker:text-lever-blue">
												{tab.bullets.map((bullet, idx): React.ReactNode => (
													<li key={idx} className="text-foreground text-lg">
														{bullet}
													</li>
												))}
											</ul>

											{/* Cards */}
											<div className="grid grid-cols-3 gap-4 pt-4 w-4/5">
												{tab.cards.map((card, idx): React.ReactNode => {
													const CardIcon = card.icon
													return (
														<div
															key={idx}
															// eslint-disable-next-line max-len
															className="bg-standard-background rounded-lg flex flex-col items-center justify-center text-center aspect-square p-4"
														>
															<CardIcon className="size-16 mb-3 text-primary" strokeWidth={1}/>
															<p className="text-lg font-normal leading-tight">
																{card.title}
															</p>
														</div>
													)
												})}
											</div>
										</div>

										{/* Right column - Image */}
										<div className="order-last">
											<div className="relative rounded-2xl overflow-hidden bg-muted h-full">
												<Image
													src={tab.imagePlaceholder}
													alt={`${tab.title} preview`}
													width={500}
													height={400}
													className="w-full h-full object-cover"
												/>
											</div>
										</div>
									</div>
								</div>
							)
						})}
					</div>
				</Tabs>
			</LandingContainer>
		</section>
	)
}
