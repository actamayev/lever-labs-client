import { Linkedin } from "lucide-react"

export default function LinkedinLink() {
	return (
		<a
			href="https://www.linkedin.com/company/blue-dot-robots"
			aria-label="LinkedIn"
			className="text-zinc-800 hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-white transition-all duration-300"
			target="_blank"
			rel="noopener noreferrer"
		>
			<Linkedin size={24} />
		</a>
	)
}
