/* eslint-disable react/no-unescaped-entities */
import { Card } from "../../shadcn/ui/card"
import { BoldSpanText } from "../bold-span-text"
import { CoolMode } from "../../shadcn/ui/cool-mode"
import TextRevealByWord from "../../shadcn/ui/text-reveal"

export default function LearnByDoing() {
	return (
		<div className="flex mt-16">
			<div className="w-1/2 flex items-center mr-8">
				<Card className="flex flex-col overflow-hidden !bg-white dark:!bg-black shadow-lg relative z-10">
					<div className="flex flex-col p-8 w-full space-y-6">
						<div className="space-y-6">
							<h2 className="text-4xl font-bold">
								Learn by Doing
							</h2>
							<h3 className="text-2xl text-zinc-700 dark:text-zinc-300">
								Forget textbooks. Start building.
							</h3>
						</div>
						<p className="text-zinc-600 dark:text-zinc-400 text-lg">
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
							That's why&nbsp;
							<BoldSpanText>
								we place as much emphasis on the practical aspects of robotics as the theoretical ones.&nbsp;
							</BoldSpanText>
							Textbooks have their place. You won't find them here.
						</p>
					</div>
				</Card>
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
