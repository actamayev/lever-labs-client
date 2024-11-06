import { FaLinkedin } from "react-icons/fa"

export default function LinkedinLink() {
	return (
		<a
			href="https://www.linkedin.com/company/blue-dot-robots"
			aria-label="LinkedIn"
			className="text-slate-800 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white"
			target="_blank"
			rel="noopener noreferrer"
		>
			<FaLinkedin size={24} />
		</a>
	)
}
