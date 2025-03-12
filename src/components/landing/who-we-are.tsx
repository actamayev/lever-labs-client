import { observer } from "mobx-react"
import BlueDot from "./blue-dot"
import { TactileButton } from "../shadcn/ui/tactile-button"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"
import useDefaultSiteTheme from "../../hooks/memos/default-site-theme"
import LandingSectionHeaderText from "./landing-section-header-text"

function WhoWeAre() {
	const navigate = useTypedNavigate()
	const defaultSiteTheme = useDefaultSiteTheme()

	return (
		<div className="w-full">
			{/* Section layout */}
			<div className="flex flex-col md:flex-row justify-between w-full gap-16">
				{/* Left side with BlueDot */}
				<div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0">
					<div className="relative">
						<BlueDot />
					</div>
				</div>

				{/* Right side with text */}
				<div className="flex flex-col w-full md:w-1/2">
					<LandingSectionHeaderText text="built by engineers," />
					<LandingSectionHeaderText text="for future engineers" />
					<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText mt-8">
						As engineers who grew up tinkering, we've experienced firsthand how traditional robotics
						education can be frustrating and limiting.
					</p>

					<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText mt-4">
						Pip is the product we wish we had—
						<span className="font-semibold">no assembly required, no ceiling on what you can learn!</span>
					</p>

					<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText mt-4">
						Behind Pip is our small and passionate team, committed to revolutionizing how
						robotics is taught and learned.
					</p>

					<div className="flex items-center justify-center my-8">
						<TactileButton
							onClick={() => navigate("/login")}
							className="px-8 !py-5 text-2xl transition-none rounded-2xl border-2 w-full md:w-2/3 h-12
							bg-green-500 border-none text-white hover:bg-green-400
							dark:bg-green-900 dark:border-green-600 dark:text-green-200 dark:hover:bg-green-950"
							shadowColor={defaultSiteTheme === "light" ? "rgb(34, 160, 94)" : "rgb(22 163 74)"}
							shadowHeight={2}
						>
							About Blue Dot
						</TactileButton>
					</div>
				</div>
			</div>
		</div>
	)
}

export default observer(WhoWeAre)
