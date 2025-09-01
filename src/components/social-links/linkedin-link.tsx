"use client"

import { CustomLinkedin } from "../icons/custom-linkedin"

export default function LinkedinLink(): React.ReactNode {
	return (
		<a
			href="https://www.linkedin.com/company/blue-dot-robots"
			aria-label="LinkedIn"
			className="text-questionText hover:text-gray-950 dark:hover:text-white duration-0"
			target="_blank"
			rel="noopener noreferrer"
		>
			<CustomLinkedin />
		</a>
	)
}
