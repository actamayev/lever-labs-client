/* eslint-disable react/no-unescaped-entities */
import LandingCard from "../landing-card"
import { BoldSpanText } from "../bold-span-text"
import { CoolMode } from "../../shadcn/ui/cool-mode"
import TextRevealByWord from "../../shadcn/ui/text-reveal"

export default function LearnByDoing() {
	return (
		<div className="flex my-16">
			<div className="w-1/2 flex items-center mr-8">
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
							Because real innovation doesn't start with reading about robots - it starts with building them.
							That's why we place as much emphasis on the practical aspects of robotics as the theoretical ones.&nbsp;
							<BoldSpanText>
								Textbooks have their place. You won't find them here.
							</BoldSpanText>
						</>
					}
				/>
			</div>
			<div className="w-1/2 flex items-center">
				<TextRevealByWord
					text="Blink an LED today, balance an inverted pendulum tomorrow."
					className="block"
					instantTransition
					wordClasses="text-6xl font-bold"
				/>
			</div>
		</div>
	)
}
