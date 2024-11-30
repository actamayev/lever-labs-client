/* eslint-disable react/no-unescaped-entities */
import { Card } from "../../shadcn/ui/card"
import { CoolMode } from "../../shadcn/ui/cool-mode"
import TextRevealByWord from "../../shadcn/ui/text-reveal"
import BoldSpanText from "../bold-span-text"

export default function LearnByDoing() {
	return (
		<div className="flex gap-8 mt-28">
			<div className="w-1/2 flex items-center">
				<TextRevealByWord
					text="Blink an LED today, balance an inverted pendulum tomorrow."
					className="block"
					instantTransition
					wordClasses="text-6xl font-bold"
				/>
			</div>

			<div className="w-1/2">
				<Card
					className="flex flex-col overflow-hidden !bg-white dark:!bg-black shadow-lg relative z-10"
					style={{ height: "350px" }}
				>
					<div className="flex flex-col p-6 w-full h-full justify-between">
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
								<div className="inline-block cursor-pointer">Blue Dot,</div>
							</CoolMode>
							{" "}practice finally meets theory. We believe in&nbsp;
							<BoldSpanText>
								learning by doing.&nbsp;
							</BoldSpanText>
							Theory comes alive through your hands, not through pages.
							Because real innovation doesn't start with reading about robots - it starts with building them.
							That's why we place as much emphasis on the practical aspects of robotics as the theoretical ones.
							Textbooks have their place. You won't find them here.
						</p>
					</div>
				</Card>
			</div>
		</div>
	)
}
