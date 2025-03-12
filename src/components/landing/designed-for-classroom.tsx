import { School } from "lucide-react"
import { observer } from "mobx-react"
import { TactileButton } from "../shadcn/ui/tactile-button"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"
import LandingSectionHeaderText from "./landing-section-header-text"
import useDefaultSiteTheme from "../../hooks/memos/default-site-theme"

function DesignedForClassroom() {
	const navigate = useTypedNavigate()
	const defaultSiteTheme = useDefaultSiteTheme()

	return (
		<div className="w-full">
			<LandingSectionHeaderText text="designed for" />
			<LandingSectionHeaderText text="the classroom" />

			<div className="flex flex-col md:flex-row justify-between w-full gap-16 mt-8">
				{/* Left side with text content */}
				<div className="flex flex-col w-full md:w-1/2">
					<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText">
						Create classes, assign challenges, and watch student progress from one simple dashboard.
						Students can use any Pip, and their work saves automatically to their account!
					</p>

					<div className="pt-8 flex items-center justify-center">
						<TactileButton
							onClick={() => navigate("/login")}
							className="px-8 !py-5 text-2xl transition-none rounded-2xl border-2 w-full md:w-3/4 h-12 \
							bg-green-500 border-none text-white hover:bg-green-400 \
							dark:bg-green-900 dark:border-green-600 dark:text-green-200 dark:hover:bg-green-950"
							shadowColor={defaultSiteTheme === "light" ? "rgb(34, 160, 94)" : "rgb(22 163 74)"}
							shadowHeight={2}
						>
							Get your classroom started
						</TactileButton>
					</div>
				</div>

				{/* Right side with school SVG */}
				<div className="w-full md:w-1/2 flex justify-center items-center">
					<School size={130}/>
				</div>
			</div>
		</div>
	)
}

export default observer(DesignedForClassroom)
