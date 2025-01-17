import { Radar } from "lucide-react"
import { CustomChameleon } from "../../components/icons/custom-chameleon"

const element2NavData: LabNavData[] = [
	{
		title: "Chameleon Mode",
		icon: CustomChameleon,
		items: [
			{
				title: "Reading",
				url: "/lab/element-2/chameleon/reading",
			},
			{
				title: "Video",
				url: "/lab/element-2/chameleon/video",
			},
			{
				title: "Code",
				url: "/lab/element-2/chameleon/code",
			},
		]
	},
	{
		title: "Obstacle Avoidance",
		icon: Radar,
		items: [
			{
				title: "Reading",
				url: "/lab/element-2/avoid-obstacles/reading",
			},
			{
				title: "Video",
				url: "/lab/element-2/avoid-obstacles/video",
			},
			{
				title: "Code",
				url: "/lab/element-2/avoid-obstacles/code",
			},
		]
	}
]

export default element2NavData
