import { CustomLinkedin } from "../icons/custom-linkedin"

export default function LinkedinLink() {
	return (
		<a
			href="https://www.linkedin.com/company/blue-dot-robots"
			aria-label="LinkedIn"
			className="text-gray-800 hover:text-gray-950 dark:text-gray-200 dark:hover:text-white transition-all duration-300"
			target="_blank"
			rel="noopener noreferrer"
		>
			<CustomLinkedin />
		</a>
	)
}
