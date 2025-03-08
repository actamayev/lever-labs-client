import { observer } from "mobx-react"
import { LucideIcon } from "lucide-react"
import { Card } from "@/components/shadcn/ui/card"
import Safari from "../../shadcn/ui/safari"
import { cn } from "../../../lib/shadcn/utils"
import { BoldSpanText } from "../../bold-span-text"
import { CustomBeaker } from "../../icons/custom-beaker"
import { CustomSandbox } from "../../icons/custom-sandbox"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"

interface ProductProps {
	sectionTitle: string
	titleSubHeader: string
	sectionSubtitle: React.ReactNode
	Icon: LucideIcon
	extraClasses: string
	imgSrc: string
	linkToShow: string
}

function SectionCard(props: ProductProps) {
	const { sectionTitle, titleSubHeader, sectionSubtitle, Icon, extraClasses, linkToShow, imgSrc } = props

	return (
		<Card className={cn(
			"overflow-hidden !border-0 rounded-none dark:text-black",
			extraClasses
		)}>
			<div className="flex flex-col items-center text-center p-4 md:p-5 h-full">
				<h2 className="text-3xl md:text-4xl font-medium flex flex-row items-center">
					<Icon className="size-8 md:size-9 origin-left transform-gpu transition-all
					duration-300 ease-in-out group-hover:scale-75" />
					{sectionTitle}
				</h2>
				<div className="my-2 text-lg md:text-xl">
					{titleSubHeader}
				</div>
				<div className="relative">
					<Safari
						url={linkToShow}
						className="size-full"
						src={imgSrc}
					/>
				</div>
				<div className="text-lg md:text-2xl mt-4 dark:text-gray-400 text-gray-500">
					{sectionSubtitle}
				</div>
			</div>
		</Card>
	)
}

// 2/15/25 TODO: Update these images of the lab/sandbox once we have a legit lab to show
function ProductShowcase() {
	const siteTheme = useDefaultSiteTheme()

	return (
		<div className="w-full px-4 md:px-4 mb-6 md:mb-10">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<SectionCard
					sectionTitle="Lab"
					titleSubHeader="Dive into guided tutorials, videos, and challenges"
					sectionSubtitle={
						<>
                            Master robotics through interactive labs with Pip - from programming and mathematics, to sensors and control.
                            Engineer clever solutions to
							<BoldSpanText extraClasses="font-medium">
                                carefully crafted labs that bridge theory and practice.
							</BoldSpanText>
						</>
					}
					Icon={CustomBeaker}
					extraClasses="bg-gradient-to-b from-emerald-400 to-emerald-100 dark:from-emerald-200 dark:to-standardBackground"
					linkToShow="www.bluedotrobots.com/lab"
					imgSrc={siteTheme === "dark" ? "lab_dark.png" : "lab_light.png"}
				/>

				<SectionCard
					sectionTitle="Sandbox"
					titleSubHeader="Your Pip, your rules"
					sectionSubtitle={
						<div>
                            Jump into an open playground where you control Pip your way. Use coding blocks to
							<BoldSpanText extraClasses="font-medium">
                                bring your wildest ideas to life
							</BoldSpanText>
                            with no limits or restrictions.
						</div>
					}
					Icon={CustomSandbox}
					extraClasses="bg-gradient-to-b from-orange-400 to-orange-100 dark:from-orange-200 dark:to-standardBackground"
					linkToShow="www.bluedotrobots.com/sandbox"
					imgSrc={siteTheme === "dark" ? "sandbox_dark.png" : "sandbox_light.png"}
				/>
			</div>
		</div>
	)
}

export default observer(ProductShowcase)
