import { BoldSpanText } from "../bold-span-text"
import DottedUnderlineText from "../../dotted-underline-text"

export default function DiscoverSection() {
	return (
		<div className="mt-6 md:mt-10 px-4 md:px-0">
			<h1 className="flex justify-center text-center whitespace-pre-wrap text-4xl md:text-6xl
                font-medium tracking-tight text-black dark:text-white"
			>
                Discover
			</h1>
			<p className="text-zinc-600 dark:text-zinc-400 text-center text-xl md:text-3xl my-6 md:my-10">
                Pip pairs with our web platform, purpose-built to make your robotics education journey fun and powerful.
                Start with beginner-friendly coding blocks, then graduate to real-world programming.
                Whether you&apos;re solving guided challenges in the&nbsp;
				<DottedUnderlineText linkTo="/lab">
                    Lab
				</DottedUnderlineText>
                , or exploring the&nbsp;
				<DottedUnderlineText linkTo="/sandbox">
                    Sandbox
				</DottedUnderlineText>
                ,&nbsp;
				<BoldSpanText>
                    every moment with Pip is hands-on, rewarding, and
                    uniquely yours.
				</BoldSpanText>
			</p>
		</div>
	)
}
