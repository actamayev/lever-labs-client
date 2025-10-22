"use client"

import { CustomLinkedin } from "../../icons/custom-linkedin"

export default function LinkedinLink(): React.ReactNode {
	return (
		<a
			href="https://www.linkedin.com/company/lever-labs"
			aria-label="LinkedIn"
			className="text-question-text hover:text-gray-950 dark:hover:text-white duration-0"
			target="_blank"
			rel="noopener noreferrer"
		>
			<CustomLinkedin />
		</a>
	)
}
