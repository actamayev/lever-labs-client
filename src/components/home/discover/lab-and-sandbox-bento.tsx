import { BentoCard, BentoGrid } from "@/components/shadcn/ui/bento-grid"
import { TbSandbox } from "react-icons/tb"
import { HiBeaker } from "react-icons/hi"

const features = [
	{
		Icon: TbSandbox,
		name: "Sandbox",
		description: "Make whatever you want. Literally, anything.",
		href: "/sandbox",
		cta: "Learn more",
		className: "col-span-1", // Changed to take up one column
		background: (
			<img src="pip-render-11-28.png"/>
		),
	},
	{
		Icon: HiBeaker,
		name: "Lab",
		description: "Get notified when something happens.",
		href: "/lab",
		cta: "Learn more",
		className: "col-span-1", // Changed to take up one column
		background: (
			<img src="pip-render-11-28.png"/>
		),
	}
]

export function LabAndSandboxBento() {
	return (
		<BentoGrid>
			{features.map((feature, idx) => (
				<BentoCard key={idx} {...feature} />
			))}
		</BentoGrid>
	)
}
