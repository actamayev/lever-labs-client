import { observer } from "mobx-react"
import { TactileButton } from "../shadcn/ui/tactile-button"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"
import useDefaultSiteTheme from "../../hooks/memos/default-site-theme"
import LandingSectionHeaderText from "./landing-section-header-text"

function SmallRobotBigPossibilities() {
	const navigate = useTypedNavigate()
	const defaultSiteTheme = useDefaultSiteTheme()

	return (
		<div className="w-full">
			{/* Section title in Duolingo style */}
			<div className="flex flex-col md:flex-row justify-between w-full gap-16">
				{/* Left side with text - Duolingo style */}
				<div className="flex flex-col w-full md:w-1/2">
					<LandingSectionHeaderText text="small robot."/>
					<LandingSectionHeaderText text="big possibilities."/>
					<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText my-8">
						With Pip by your side,&nbsp;
						<span className="font-semibold">learning feels like play:</span> write code to solve fun challenges,
						and watch your ideas
						spring to life right before your eyes.
						Pip might fit in your pocket, but this tiny robot is full of big surprises!
					</p>
					<div className="flex items-center justify-center">
						<TactileButton
							onClick={() => navigate("/login")}
							className="px-8 !py-5 text-2xl transition-none rounded-2xl border-2 w-full md:w-2/3 h-12 \
							bg-green-500 border-none text-white hover:bg-green-400 \
							dark:bg-green-900 dark:border-green-600 dark:text-green-200 dark:hover:bg-green-950"
							shadowColor={defaultSiteTheme === "light" ? "rgb(34, 160, 94)" : "rgb(22 163 74)"}
							shadowHeight={2}
						>
							Get your Pip
						</TactileButton>
					</div>
				</div>

				{/* Right side with Pip image */}
				<div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0">
					<div className="relative">
						<img
							src="pip_top_right.png"
							alt="Pip Robot"
							className="max-w-full h-auto rounded-lg"
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default observer(SmallRobotBigPossibilities)
