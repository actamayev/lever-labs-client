import { BookOpen, Code2 } from "lucide-react"
import ShowIcon from "./show-icon"
import { CustomWizardHat } from "../icons/custom-wizard-hat"
import { LandingCTAButton } from "../buttons/tactile-buttons"
import LandingSectionHeaderText from "./landing-section-header-text"

export default function TheLab() {
	return (
		<div className="w-full">
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
					<LandingSectionHeaderText text="the lab" />
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
								<h3 className="text-xl font-semibold text-pipThemeText">Demos</h3>
								<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText mt-1">
									Watch Pip show off the very things you're learning about.
								</p>
							</div>
						</div>
						<div className="flex">
							<ShowIcon icon={BookOpen}/>
							<div className="ml-4">
								<h3 className="text-xl font-semibold text-pipThemeText">Read</h3>
								<p className="text-xl md:text-base leading-relaxed text-lightLandingPageText mt-1">
									Simple explanations that clarify tricky concepts.
								</p>
							</div>
						</div>


						{/* Point 3 */}
						<div className="flex">
							<ShowIcon icon={Code2} />
							<div className="ml-4">
								<h3 className="text-xl font-semibold text-pipThemeText">Code</h3>
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
						<LandingCTAButton navigateTo="/lab">
							Try the lab for free
						</LandingCTAButton>
					</div>
				</div>
			</div>
		</div>
	)
}
