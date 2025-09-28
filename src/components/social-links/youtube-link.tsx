"use client"

import { CustomYoutube } from "../../icons/custom-youtube"

export default function YouTubeLink(): React.ReactNode {
	return (
		<a
			href="https://www.youtube.com/@Lever_Labs"
			aria-label="YouTube"
			className="text-questionText hover:text-gray-950 dark:hover:text-white duration-0"
			target="_blank"
			rel="noopener noreferrer"
		>
			<CustomYoutube />
		</a>
	)
}
