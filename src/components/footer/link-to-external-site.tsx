interface Props {
	title: string
	link: string
}

export default function LinkToExternalSite(props: Props) {
	const { title, link } = props

	return (
		<div className="text-sm">
			<a
				href={link}
				aria-label="Help Center"
				target="_blank"
				rel="noopener noreferrer"
				className="cursor:pointer text-zinc-950 dark:text-zinc-50 hover:underline"
			>
				{title}
			</a>
		</div>
	)
}
