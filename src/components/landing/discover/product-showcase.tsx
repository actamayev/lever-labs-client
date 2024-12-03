import { observer } from "mobx-react"
import { IconType } from "react-icons"
import { HiBeaker } from "react-icons/hi"
import { TbSandbox } from "react-icons/tb"
import Safari from "../../shadcn/ui/safari"
import { cn } from "../../../lib/shadcn/utils"
import { BoldSpanText } from "../bold-span-text"
import { Card } from "@/components/shadcn/ui/card"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"

interface ProductProps {
	sectionTitle: string
	sectionSubtitle: React.ReactNode
	Icon: IconType
	extraClasses: string
	imgSrc: string
	linkToShow: string
}

function SectionCard(props: ProductProps) {
	const { sectionTitle, sectionSubtitle, Icon, extraClasses, linkToShow, imgSrc } = props

	return (
		<Card className={cn(
			"overflow-hidden !border-0 rounded-none dark:text-black",
			extraClasses
		)}>
			<div className="flex flex-col items-center text-center p-5 h-full">
				<h2 className="text-4xl font-medium flex flex-row items-center mb-5">
					<Icon className="size-9 origin-left transform-gpu transition-all duration-300 ease-in-out group-hover:scale-75" />
					&nbsp;{sectionTitle}
				</h2>
				<div className="relative">
					<Safari
						url={linkToShow}
						className="size-full"
						src={imgSrc}
					/>
				</div>
				<p className="text-2xl mt-4 dark:text-zinc-400 text-zinc-500">
					{sectionSubtitle}
				</p>
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
					sectionSubtitle={
						<>
							Explore&nbsp;
							<BoldSpanText extraClasses="font-medium">
							guided tutorials, videos, and challenges&nbsp;
							</BoldSpanText>
								to learn about robot sensors and control in&nbsp;
							<BoldSpanText extraClasses="font-medium">
								a structured learning environment.
							</BoldSpanText>
						</>
					}
					Icon={HiBeaker}
					extraClasses="bg-gradient-to-b from-emerald-400 to-emerald-100 dark:from-emerald-200 dark:to-black"
					linkToShow="bluedotrobots.com/lab"
					imgSrc={siteTheme === "dark" ? "lab_dark.png" : "lab_light.png"}
				/>

				<SectionCard
					sectionTitle="Sandbox"
					sectionSubtitle={
						<div>
							Freely control your robot with coding blocks for&nbsp;
							<BoldSpanText extraClasses="font-medium">
								limitless open-ended exploration&nbsp;
							</BoldSpanText>
							and experimentation.
						</div>
					}
					Icon={TbSandbox}
					extraClasses="bg-gradient-to-b from-orange-400 to-orange-100 dark:from-orange-200 dark:to-black"
					linkToShow="bluedotrobots.com/sandbox"
					imgSrc={siteTheme === "dark" ? "sandbox_dark.png" : "sandbox_light.png"}
				/>
			</div>
		</div>
	)
}

export default observer(ProductShowcase)
