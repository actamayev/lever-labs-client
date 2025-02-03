import {
	Wifi,
	Upload,
	Tag
} from "lucide-react"
import RightArrow from "./right-arrow"
import { IconStep } from "./welcome-page-icons"
import WelcomePageCard from "./welcome-page-card"
import { BlueTactileButton } from "../../buttons/tactile-buttons"
import useTypedNavigate from "../../../hooks/navigate/typed-navigate"

export default function AddPipWelcomeSection() {
	const navigate = useTypedNavigate()

	return (
		<WelcomePageCard headerText="Have a Pip? Let's get started!" >
			<div className="flex flex-col md:flex-row items-center justify-between mb-6 relative px-20">
				<IconStep
					icon={Tag}
					title="Name your Pip"
				/>

				<RightArrow iconSize="size-10"/>

				<IconStep
					icon={Wifi}
					bgColor="bg-purple-100"
					iconColor="text-purple-600"
					darkBgColor="dark:bg-purple-900/50"
					darkIconColor="dark:text-purple-400"
					title="Connect to Wi-Fi"
				/>

				<RightArrow iconSize="size-10"/>

				<IconStep
					icon={Upload}
					bgColor="bg-green-100"
					iconColor="text-green-600"
					darkBgColor="dark:bg-green-900/50"
					darkIconColor="dark:text-green-400"
					title="Upload credentials"
				/>
			</div>
			<BlueTactileButton
				onClick={() => navigate("/add-pip")}
				className="w-full text-xl h-12"
				shadowHeight={4}
			>
				ADD YOUR PIP
			</BlueTactileButton>
		</WelcomePageCard>
	)
}
