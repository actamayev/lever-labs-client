import { FaXTwitter } from "react-icons/fa6"

export default function XLink() {
	return (
		<a
			href="https://x.com/bluedotrobots"
			aria-label="X"
			className="text-zinc-800 hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-white"
			target="_blank"
			rel="noopener noreferrer"
		>
			<FaXTwitter size={24} />
		</a>
	)
}
