import { observer } from "mobx-react"
import { BookOpen, Code2, LucideIcon } from "lucide-react"
import { TactileButton } from "../shadcn/ui/tactile-button"
import { CustomWizardHat } from "../icons/custom-wizard-hat"
import useTypedNavigate from "../../hooks/navigate/typed-navigate"
import useDefaultSiteTheme from "../../hooks/memos/default-site-theme"

// eslint-disable-next-line @typescript-eslint/naming-convention
function ShowIcon({ icon: Icon} : { icon: LucideIcon }) {
	return (
		<div className="flex-shrink-0">
			<div className="bg-pipTheme w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-xl">
				<Icon size={16}/>
			</div>
		</div>
	)
}

// eslint-disable-next-line max-lines-per-function
function TheLab() {
	const navigate = useTypedNavigate()
	const defaultSiteTheme = useDefaultSiteTheme()

	return (
		<div className="w-full mt-36">
			{/* Section layout */}
			<div className="flex flex-col md:flex-row justify-between w-full gap-16">
				{/* Left side with text */}
				{/* Right side with lab screenshot */}
				<div className="w-full md:w-1/2 flex justify-center items-center mt-8 md:mt-0">
					<div className="relative">
						<img
							src="pip_top_right.png"
							alt="Pip Robot"
							className="max-w-full h-auto"
						/>
					</div>
				</div>
				<div className="flex flex-col w-full md:w-1/2">
					<h2 className="text-4xl md:text-5xl lg:text-5xl font-bold text-pipTheme">
						the lab
					</h2>
					<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText mt-5">
						The Lab is our free learning platform where your robotics journey begins.
						As you move through bite-sized lessons, you'll go from
						<span className="font-semibold"> curious beginner to robotics whiz:</span>
					</p>

					{/* ShowIconed points */}
					<div className="mt-6 space-y-4">
						{/* Point 1 */}
						{/* Point 2 */}
						<div className="flex">
							<ShowIcon icon={CustomWizardHat} />
							<div className="ml-4">
								<h3 className="text-xl font-semibold text-pipTheme">Demos</h3>
								<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText mt-1">
									Watch Pip show off the very things you're learning about.
								</p>
							</div>
						</div>
						<div className="flex">
							<ShowIcon icon={BookOpen}/>
							<div className="ml-4">
								<h3 className="text-xl font-semibold text-pipTheme">Read</h3>
								<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText mt-1">
									Simple explanations that clarify tricky concepts.
								</p>
							</div>
						</div>


						{/* Point 3 */}
						<div className="flex">
							<ShowIcon icon={Code2} />
							<div className="ml-4">
								<h3 className="text-xl font-semibold text-pipTheme">Code</h3>
								<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText mt-1">
									Solve fun coding challenges that test your skills and bring Pip to life!
								</p>
								<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText mt-3">
									New to coding? No problem! We guide you through each step, and our AI
									checks your solutions for correctness.
								</p>
							</div>
						</div>
					</div>

					<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText mt-8">
						Anyone can use the Lab for free! But having your own Pip turns your digital ideas into
						<span className="font-semibold"> real-world action</span> – that's when the magic really happens.
					</p>

					<div className="pt-8 flex items-center justify-center">
						<TactileButton
							onClick={() => navigate("/lab")}
							className="px-8 !py-5 text-2xl transition-none rounded-2xl border-2 w-full md:w-2/3 h-12 \
							bg-green-500 border-none text-white hover:bg-green-400 \
							dark:bg-green-900 dark:border-green-600 dark:text-green-200 dark:hover:bg-green-950"
							shadowColor={defaultSiteTheme === "light" ? "rgb(34, 160, 94)" : "rgb(22 163 74)"}
							shadowHeight={2}
						>
							Try the lab for free
						</TactileButton>
					</div>
				</div>
			</div>
		</div>
	)
}

export default observer(TheLab)
