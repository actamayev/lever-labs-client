"use client"

import { CustomInstagram } from "../../icons/custom-instagram"

export default function InstagramLink(): React.ReactNode {
	return (
		<a
			href="https://www.instagram.com/lever_labs/"
			aria-label="Instagram"
			className="text-question-text hover:text-gray-950 dark:hover:text-white duration-0"
			target="_blank"
			rel="noopener noreferrer"
		>
			<CustomInstagram />
		</a>
	)
}
