import LandingCard from "./landing-card"
import { BoldSpanText } from "../bold-span-text"
import { CoolMode } from "../shadcn/ui/cool-mode"

export default function LearnByDoing() {
	return (
	// Changed to xl breakpoint (1280px) for earlier stacking
		<div className="flex flex-col xl:flex-row my-6 xl:my-16 px-4 xl:px-0 w-full">
			{/* Card Section */}
			<div className="w-full xl:w-1/2 mb-8 xl:mb-0 xl:mr-8">
				<LandingCard
					title="Learn by Doing"
					subTitle="Forget textbooks. Start building."
					description={
						<>
                            At{" "}
							<CoolMode>
								<span className="inline-block cursor-pointer">Blue Dot,</span>
							</CoolMode>
							{" "}practice finally meets theory. We believe in
							<BoldSpanText>
                                learning by doing.
							</BoldSpanText>
                            Theory comes alive through your hands, not through pages.
                            Because real learning doesn't start with reading about robots - it starts with building them.
                            That's why we place as much emphasis on the practical aspects of robotics as the theoretical ones.
							<BoldSpanText>
                                Textbooks have their place. You won't find them here.
							</BoldSpanText>
						</>
					}
				/>
			</div>

			{/* Quote Section - More granular text scaling */}
			<div className="w-full xl:w-1/2 flex items-center justify-center text-center xl:text-left mt-8 xl:mt-0">
				The best way to predict the future is to create it."¤- Alan Kay
			</div>
		</div>
	)
}
