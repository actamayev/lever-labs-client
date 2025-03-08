import { BoldSpanText } from "../../bold-span-text"

export default function DiscoverSection() {
	return (
		<div className="mt-6 md:mt-10 px-4 md:px-0">
			<h1 className="flex justify-center text-center whitespace-pre-wrap text-4xl md:text-6xl
                font-medium tracking-tight text-black dark:text-white"
			>
                Discover
			</h1>
			<p className="text-gray-600 dark:text-gray-400 text-center text-xl md:text-3xl my-6 md:my-10">
                Pip pairs with our web platform, purpose-built to make your robotics education journey fun and powerful.
                Start with beginner-friendly coding blocks, then graduate to real-world programming.
                Whether you're solving guided challenges in the Lab, or exploring the Sandbox
				<BoldSpanText>
                    every moment with Pip is hands-on, rewarding, and
                    uniquely yours.
				</BoldSpanText>
			</p>
		</div>
	)
}
