import { observer } from "mobx-react"
import { LucideIcon } from "lucide-react"
import { Card } from "@/components/shadcn/ui/card"
import Safari from "../../shadcn/ui/safari"
import { cn } from "../../../lib/shadcn/utils"
import { Sandbox, Beaker } from "../../icons/all-icons"
import { BoldSpanText } from "../bold-span-text"
// import { CustomBeaker } from "../../icons/custom-beaker"
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

// TODO: Consider just saving an SVG of the previously ued lab and sandbox to public folder.
function SectionCard(props: ProductProps) {
	const { sectionTitle, titleSubHeader, sectionSubtitle, Icon, extraClasses, linkToShow, imgSrc } = props

	return (
		<Card className={cn(
			"overflow-hidden !border-0 rounded-none dark:text-black",
			extraClasses
		)}>
			<div className="flex flex-col items-center text-center p-5 h-full">
				<h2 className="text-4xl font-medium flex flex-row items-center">
					<Icon className="size-9 origin-left transform-gpu transition-all duration-300 ease-in-out group-hover:scale-75" />
					&nbsp;{sectionTitle}
				</h2>
				<div className="my-2 text-xl">
					{titleSubHeader}
				</div>
				<div className="relative">
					<Safari
						url={linkToShow}
						className="size-full"
						src={imgSrc}
					/>
				</div>
				<div className="text-2xl mt-4 dark:text-zinc-400 text-zinc-500">
					{sectionSubtitle}
				</div>
			</div>
		</Card>
	)
}

function ProductShowcase() {
	const siteTheme = useDefaultSiteTheme()

	return (
		<div className="w-full px-4 mb-10">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<SectionCard
					sectionTitle="Lab"
					titleSubHeader="Dive into guided tutorials, videos, and challenges"
					sectionSubtitle={
						<>
							Master robotics through interactive labs with Pip - from programming and mathematics, to sensors and control.
							Engineer clever solutions to&nbsp;
							<BoldSpanText extraClasses="font-medium">
								carefully crafted labs that bridge theory and practice.
							</BoldSpanText>
						</>
					}
					Icon={Beaker}
					extraClasses="bg-gradient-to-b from-emerald-400 to-emerald-100 dark:from-emerald-200 dark:to-black"
					linkToShow="www.bluedotrobots.com/lab"
					imgSrc={siteTheme === "dark" ? "lab_dark.png" : "lab_light.png"}
				/>

				<SectionCard
					sectionTitle="Sandbox"
					titleSubHeader="Your Pip, your rules"
					sectionSubtitle={
						<div>
							Jump into an open playground where you control Pip your way. Use coding blocks to&nbsp;
							<BoldSpanText extraClasses="font-medium">
								bring your wildest ideas to life&nbsp;
							</BoldSpanText>
							with no limits or restrictions.
						</div>
					}
					Icon={Sandbox}
					extraClasses="bg-gradient-to-b from-orange-400 to-orange-100 dark:from-orange-200 dark:to-black"
					linkToShow="www.bluedotrobots.com/sandbox"
					imgSrc={siteTheme === "dark" ? "sandbox_dark.png" : "sandbox_light.png"}
				/>
			</div>
		</div>
	)
}

export default observer(ProductShowcase)
