import { FaXTwitter } from "react-icons/fa6"

export default function XLink() {
	return (
		<a
			href="https://x.com/bluedotrobots"
			aria-label="X"
			className="text-slate-800 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white"
			target="_blank"
			rel="noopener noreferrer"
		>
			<FaXTwitter size={24} />
		</a>
	)
}
