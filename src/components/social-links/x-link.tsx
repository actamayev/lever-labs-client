import { CustomX } from "../icons/custom-x"

export default function XLink() {
	return (
		<a
			href="https://x.com/bluedotrobots"
			aria-label="X"
			className="text-questionText hover:text-gray-950 dark:hover:text-white duration-0"
			target="_blank"
			rel="noopener noreferrer"
		>
			<CustomX />
		</a>
	)
}
