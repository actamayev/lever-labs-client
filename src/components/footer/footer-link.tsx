import { Link } from "react-router"

interface Props {
	linkTo: StaticPageNames
	linkTitle: string
	extraClasses?: string
}

export default function FooterLink(props: Props) {
	const { linkTo, linkTitle, extraClasses } = props

	return (
		<div className="text-sm">
			<Link
				to={linkTo}
				className={`text-zinc-950 dark:text-zinc-50 hover:underline ${extraClasses}`}
			>
				{linkTitle}
			</Link>
		</div>
	)
}
