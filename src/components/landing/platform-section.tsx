"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { platformTabs } from "./tab-content"
import LandingContainer from "./landing-container"
import { CustomGarage } from "../../icons/custom-garage"
import { CustomSandbox } from "../../icons/custom-sandbox"

// Helper function to get background color class
const getBackgroundColorClass = (themeColor: string): string => {
	switch (themeColor) {
		case "cardinal":
			return "bg-cardinal/5"
		case "bee":
			return "bg-bee/5"
		case "humpback":
			return "bg-humpback/5"
		default:
			return "bg-gray-500/10"
	}
}

// Helper function to get icon color class
const getIconColorClass = (themeColor: string): string => {
	switch (themeColor) {
		case "cardinal":
			return "text-cardinal"
		case "bee":
			return "text-bee"
		case "humpback":
			return "text-humpback"
		default:
			return "text-gray-500"
	}
}

// eslint-disable-next-line max-lines-per-function
export default function PlatformSection(): React.ReactNode {
	const [activeTab, setActiveTab] = useState<string>("learn")

	return (
		<section className="bg-polar py-16 md:py-24">
			<LandingContainer>
				{/* Section header */}
				<div className="text-center mb-12">
					<h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-normal mb-4">
						The Lever Labs Platform
					</h2>
					<p className="text-lg sm:text-xl text-wolf font-semibold">
						Free. Fun. Effective.
					</p>
				</div>

				{/* Tabs */}
				<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
					<TabsList className="grid w-full grid-cols-3 mb-8">
						{platformTabs.map((tab): React.ReactNode => {
							// eslint-disable-next-line no-nested-ternary
							const IconComponent = tab.useCustomIcon
								? (tab.id === "sandbox" ? CustomSandbox : CustomGarage)
								: tab.icon

							return (
								<TabsTrigger key={tab.id} value={tab.id} className="gap-2 text-2xl sm:text-3xl font-semibold">
									<IconComponent className={`size-6 sm:size-8 ${activeTab === tab.id ? getIconColorClass(tab.themeColor) : ""}`} />
									{tab.label}
								</TabsTrigger>
							)
						})}
					</TabsList>

					<div className="relative">
						{platformTabs.map((tab): React.ReactNode => (
							<div
								key={tab.id}
								className={`transition-opacity duration-300 ${
									activeTab === tab.id ? "opacity-100" : "opacity-0 absolute inset-0 pointer-events-none"
								}`}
							>
								<div className="absolute inset-0 pointer-events-none">
									<div
										className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full blur-[200px] rounded-full ${
											getBackgroundColorClass(tab.themeColor)
										}`}
									/>
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

										{/* CTA Button */}
										<div className="pt-4">
											<Button asChild size="lg" className="rounded-full">
												<Link href={tab.ctaLink}>
													Get started
												</Link>
											</Button>
										</div>
									</div>

									{/* Right column - Image */}
									<div className="order-first md:order-last">
										<div className="relative aspect-video md:aspect-square rounded-lg overflow-hidden bg-muted">
											<img
												src={tab.imagePlaceholder}
												alt={`${tab.title} preview`}
												className="w-full h-full object-cover"
											/>
										</div>
									</div>
								</div>
							</div>
						))}
					</div>
				</Tabs>
			</LandingContainer>
		</section>
	)
}
