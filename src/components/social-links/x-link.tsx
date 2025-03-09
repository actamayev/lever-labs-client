import { CustomX } from "../icons/custom-x"

export default function XLink() {
	return (
		<a
			href="https://x.com/bluedotrobots"
			aria-label="X"
			className="text-gray-800 hover:text-gray-950 dark:text-gray-200 dark:hover:text-white transition-all duration-300"
			target="_blank"
			rel="noopener noreferrer"
		>
			<CustomX />
		</a>
	)
}
