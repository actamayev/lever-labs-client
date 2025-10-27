/* eslint-disable max-len */
import { HeadsetIcon, WifiIcon, PackageIcon, DollarSignIcon, UserIcon, BotIcon, RefreshCwIcon, PlusIcon, Undo2 } from "lucide-react"

import * as AccordionPrimitive from "@radix-ui/react-accordion"

import { Accordion, AccordionContent, AccordionItem } from "@/components/ui/accordion"
import LandingContainer from "./landing-container"

const items = [
	{
		icon: UserIcon,
		title: "Who is Pip for?",
		content: "Pip is for anyone with a curiosity for STEM - whether you're 8 or 80! We've designed Pip to be accessible and engaging for all ages and skill levels, from complete beginners to experienced tinkerers."
	},
	{
		icon: BotIcon,
		title: "What does Pip do?",
		content: "Like all robots, Pip has a job. Pip's job is to help you improve your understanding of robotics and coding through hands-on, interactive learning experiences."
	},
	{
		icon: DollarSignIcon,
		title: "How much does Pip cost?",
		content: "Customers pay a one-time $200 fee to buy a Pip, then get lifetime access to software updates. No hidden fees, no surprises."
	},
	{
		icon: RefreshCwIcon,
		title: "Are there recurring subscription fees?",
		content: "Nope. Buy Pip once, then use it, along with our web portal, for free, forever."
	},
	{
		icon: WifiIcon,
		title: "Does Pip work wirelessly or with a cable?",
		content: "Pip works completely wirelessly! After a quick initial setup where you connect Pip to your Wi-Fi, you can control and program Pip from anywhere without any cables."
	},
	{
		icon: PackageIcon,
		title: "What comes included with Pip?",
		content: "Your Pip comes ready to use right out of the box with a USB-C charging cable, quick start guide, and lifetime access to our complete learning platform."
	},
	{
		icon: Undo2,
		title: "What is your return policy?",
		content: "We offer a 30-day return policy. If Pip isn't the right fit, simply contact our support team to initiate a return. Products must be in their original condition."
	},
	{
		icon: HeadsetIcon,
		title: "How can I contact customer support?",
		content: "Our support team is here to help! You can reach us via email at hello@leverlabs.com. We try our best to respond within a couple hours."
	}
]

export default function FAQ(): React.ReactNode {
	return (
		<section className="bg-polar py-16">
			<LandingContainer>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16">
					{/* Left column - FAQ title */}
					<div className="flex flex-col justify-center">
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
							Frequently Asked Questions
						</h2>
					</div>

					{/* Right column - Questions */}
					<div className="flex flex-col justify-center">
						<Accordion type='single' collapsible className='w-full' defaultValue='item-1'>
							{items.map((item, index) => (
								<AccordionItem key={index} value={`item-${index + 1}`}>
									<AccordionPrimitive.Header className='flex'>
										<AccordionPrimitive.Trigger
											data-slot='accordion-trigger'
											className='focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-45'
										>
											<span className='flex items-center gap-4'>
												<item.icon className='size-6 shrink-0' />
												<span className='text-lg font-medium'>{item.title}</span>
											</span>
											<PlusIcon className='text-muted-foreground pointer-events-none size-4 shrink-0 transition-transform duration-200' />
										</AccordionPrimitive.Trigger>
									</AccordionPrimitive.Header>
									<AccordionContent className='text-muted-foreground text-base'>{item.content}</AccordionContent>
								</AccordionItem>
							))}
						</Accordion>
					</div>
				</div>
			</LandingContainer>
		</section>
	)
}
