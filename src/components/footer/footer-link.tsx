import { Link } from "react-router-dom"

interface Props {
	linkTo: StaticPageNames
	linkTitle: string
}

export default function FooterLink(props: Props) {
	const { linkTo, linkTitle } = props

	return (
		<div className="text-sm">
			<Link
				to={linkTo}
				className="text-zinc-950 dark:text-zinc-50 hover:underline"
			>
				{linkTitle}
			</Link>
		</div>
	)
}
