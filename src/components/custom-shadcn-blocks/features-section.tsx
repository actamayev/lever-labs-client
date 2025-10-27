import type { ComponentType } from "react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

import { cn } from "@/lib/shadcn/utils"

type Features = {
	icon: ComponentType
	title: string
	description: string
	cardBorderColor: string
	avatarTextColor: string
	avatarBgColor: string
}[]

export default function Features({ featuresList }: { featuresList: Features }): React.ReactNode {
	return (
		<section className='pb-8 sm:pb-16 lg:pb-24'>
			<div>
				{/* Header */}
				<div className='mb-6 space-y-4 sm:mb-8 lg:mb-12 text-center'>
					<h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold">
						Small details. Big smiles.
					</h2>
				</div>

				<div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
					{featuresList.map((features, index): React.ReactNode => (
						<Card key={index} className={cn("shadow-none transition-colors duration-300", features.cardBorderColor)}>
							<CardContent>
								<Avatar className={cn("mb-6 size-10 rounded-md", features.avatarTextColor)}>
									<AvatarFallback className={cn("rounded-md [&>svg]:size-6", features.avatarBgColor)}>
										<features.icon />
									</AvatarFallback>
								</Avatar>
								<h6 className='mb-2 text-lg font-semibold'>{features.title}</h6>
								<p className='text-muted-foreground'>{features.description}</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	)
}
