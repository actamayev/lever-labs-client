/* eslint-disable react/no-unescaped-entities */
import LandingCard from "../landing-card"
import { BoldSpanText } from "../bold-span-text"
import { CoolMode } from "../../shadcn/ui/cool-mode"
import TextRevealByWord from "../../shadcn/ui/text-reveal"
export default function LearnByDoing() {
	return (
		<div className="flex flex-col md:flex-row my-8 md:my-16 px-4 md:px-0 w-full">
			{/* Card Section - Full width on mobile, half on web */}
			<div className="w-full md:w-1/2 mb-8 md:mb-0 md:mr-8">
				<LandingCard
					title="Learn by Doing"
					subTitle="Forget textbooks. Start building."
					description={
						<>
                            At{" "}
							<CoolMode>
								<span className="inline-block cursor-pointer">Blue Dot,</span>
							</CoolMode>
							{" "}practice finally meets theory. We believe in&nbsp;
							<BoldSpanText>
                                learning by doing.&nbsp;
							</BoldSpanText>
                            Theory comes alive through your hands, not through pages.
                            Because real learning doesn't start with reading about robots - it starts with building them.
                            That's why we place as much emphasis on the practical aspects of robotics as the theoretical ones.&nbsp;
							<BoldSpanText>
                                Textbooks have their place. You won't find them here.
							</BoldSpanText>
						</>
					}
				/>
			</div>

			{/* Quote Section - Centered on mobile, right side on web */}
			<div className="w-full md:w-1/2 flex items-center justify-center text-center md:text-left">
				<TextRevealByWord
					text='"The best way to predict the future is to create it."¤- Alan Kay'
					className="block px-4 md:px-0"
					instantTransition
					wordClasses="text-3xl md:text-6xl font-bold"
				/>
			</div>
		</div>
	)
}
