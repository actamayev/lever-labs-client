import { Link } from "react-router-dom"

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
				className={`text-slate-950 dark:text-slate-50 hover:underline ${extraClasses}`}
			>
				{linkTitle}
			</Link>
		</div>
	)
}
