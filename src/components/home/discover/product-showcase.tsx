import { Link } from "react-router"
import { observer } from "mobx-react"
import { IconType } from "react-icons"
import { HiBeaker } from "react-icons/hi"
import { TbSandbox } from "react-icons/tb"
import { ChevronRight } from "lucide-react"
import Safari from "../../shadcn/ui/safari"
import { cn } from "../../../lib/shadcn/utils"
import { Card } from "@/components/shadcn/ui/card"
import { Button } from "@/components/shadcn/ui/button"
import useDefaultSiteTheme from "../../../hooks/memos/default-site-theme"

interface ProductProps {
	sectionTitle: string
	sectionSubtitle: string
	cta: string
	href: StaticPageNames
	Icon: IconType
	extraClasses: string
	imgSrc: string
	linkToShow: string
}

function SectionCard(props: ProductProps) {
	const { sectionTitle, sectionSubtitle, cta, href, Icon, extraClasses, linkToShow, imgSrc } = props

	return (
		<Card className={cn(
			"overflow-hidden !border-0 rounded-none dark:text-black",
			extraClasses
		)}>
			<div className="flex flex-col items-center text-center p-8 h-full">
				<h2 className="text-4xl font-medium mb-2 flex flex-row items-center">
					<Icon className="size-9 origin-left transform-gpu transition-all duration-300 ease-in-out group-hover:scale-75" />
					&nbsp;{sectionTitle}
				</h2>
				<p className="text-xl mb-4 opacity-80">
					{sectionSubtitle}
				</p>
				<div className="flex items-center gap-6 mb-8">
					<Button variant="link" className="text-lg font-medium p-0 hover:no-underline">
						<Link to={href}>
							<div className={cn(
								"flex flex-row items-center transition-all duration-200 no-underline",
								"hover:underline hover:decoration-dotted dark:text-black"
							)}>
								{cta}
								<ChevronRight className="h-4 w-4 ml-1" />
							</div>
						</Link>
					</Button>
				</div>
				<div className="relative">
					<Safari
						url={linkToShow}
						className="size-full"
						src={imgSrc}
					/>
				</div>
			</div>
		</Card>
	)
}

function ProductShowcase() {
	const siteTheme = useDefaultSiteTheme()

	return (
		<div className="w-full px-6 my-10">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
				<SectionCard
					sectionTitle="Sandbox"
					sectionSubtitle="Creative freedom"
					cta="See the sandbox"
					href="/sandbox"
					Icon={TbSandbox}
					extraClasses="bg-gradient-to-b from-orange-400 to-orange-50 dark:from-orange-200 dark:to-black"
					linkToShow="bluedotrobots.com/sandbox"
					imgSrc={siteTheme === "dark" ? "sandbox_dark.png" : "sandbox_light.png"}
				/>

				<SectionCard
					sectionTitle="Lab"
					sectionSubtitle="Learn in the lab"
					cta="See the lab"
					href="/lab"
					Icon={HiBeaker}
					extraClasses="bg-gradient-to-b from-emerald-400 to-emerald-50 dark:from-emerald-200 dark:to-black"
					linkToShow="bluedotrobots.com/lab"
					imgSrc={siteTheme === "dark" ? "lab_dark.png" : "lab_light.png"}
				/>
			</div>
		</div>
	)
}

export default observer(ProductShowcase)
