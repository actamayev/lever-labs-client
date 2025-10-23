"use client"

import { CustomX } from "../../icons/custom-x"

export default function XLink(): React.ReactNode {
	return (
		<a
			href="https://x.com/lever_labs"
			aria-label="X"
			className="text-question-text hover:text-gray-950 dark:hover:text-white duration-0"
			target="_blank"
			rel="noopener noreferrer"
		>
			<CustomX />
		</a>
	)
}
