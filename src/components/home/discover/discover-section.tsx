import { BoldSpanText } from "../bold-span-text"
import { LabAndSandboxBento } from "./lab-and-sandbox-bento"
import DottedUnderlineText from "../../dotted-underline-text"

export default function DiscoverSection() {
	return (
		<div className="mt-20">
			<h1
				className="flex justify-center text-center whitespace-pre-wrap text-6xl
				font-medium tracking-tight text-black dark:text-white mb-14"
			>
				Discover
			</h1>
			<p className="my-8 text-zinc-600 dark:text-zinc-400 text-center text-3xl">
				Pip pairs with Blue Dot, our dynamic web platform, purpose-built to make your robotics education journey fun and powerful.
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
			<LabAndSandboxBento />
		</div>
	)
}
