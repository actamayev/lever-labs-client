"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LandingContainer from "./landing-container"
import { platformTabs } from "./tab-content"
import { CustomSandbox } from "../../icons/custom-sandbox"
import { CustomGarage } from "../../icons/custom-garage"

// eslint-disable-next-line max-lines-per-function
export default function PlatformSection(): React.ReactNode {
	return (
		<section className="bg-polar py-16 md:py-24">
			<LandingContainer>
				{/* Section header */}
				<div className="text-center mb-12">
					<h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">
						The Lever Labs Platform
					</h2>
					<p className="text-lg sm:text-xl text-muted-foreground font-light">
						Free. Fun. Effective.
					</p>
				</div>

				{/* Tabs */}
				<Tabs defaultValue="learn" className="w-full">
					<TabsList className="grid w-full grid-cols-3 mb-8">
						{platformTabs.map((tab) => {
							// eslint-disable-next-line no-nested-ternary
							const IconComponent = tab.useCustomIcon
								? (tab.id === "sandbox" ? CustomSandbox : CustomGarage)
								: tab.icon

							return (
								<TabsTrigger key={tab.id} value={tab.id} className="gap-2">
									<IconComponent className="w-4 h-4" />
									{tab.label}
								</TabsTrigger>
							)
						})}
					</TabsList>

					{/* Tab content */}
					{platformTabs.map((tab) => (
						<TabsContent key={tab.id} value={tab.id}>
							<div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
								{/* Left column - Content */}
								<div className="space-y-6">
									{/* Title and subtitle */}
									<div>
										<h3 className="text-2xl sm:text-4xl font-semibold mb-2">
											{tab.title}
										</h3>
										<p className="text-lg text-muted-foreground">
											{tab.subtitle}
										</p>
									</div>

									{/* Bullets */}
									<ul className="space-y-3">
										{tab.bullets.map((bullet, idx) => (
											<li key={idx} className="flex items-start gap-3">
												<span className="text-primary mt-1">•</span>
												<span className="text-foreground">{bullet}</span>
											</li>
										))}
									</ul>

									{/* Cards */}
									<div className="grid grid-cols-3 gap-4 pt-4">
										{tab.cards.map((card, idx) => {
											const CardIcon = card.icon
											return (
												<div
													key={idx}
													className="bg-standardBackground rounded-lg p-4 flex flex-col items-center justify-center text-center aspect-square"
												>
													<CardIcon className="w-8 h-8 mb-3 text-primary" />
													<p className="text-sm font-medium leading-tight">
														{card.title}
													</p>
												</div>
											)
										})}
									</div>

									{/* CTA Button */}
									<div className="pt-4">
										<Button asChild size="lg">
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
						</TabsContent>
					))}
				</Tabs>
			</LandingContainer>
		</section>
	)
}
