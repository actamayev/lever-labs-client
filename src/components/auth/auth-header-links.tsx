import { Link } from "react-router-dom"

interface Props {
	title: string
	className: string
	linkTo: PageNames
}

export default function AuthHeaderLinks (props: Props) {
	const { title, className, linkTo } = props

	return (
		<Link
			to={linkTo}
			className={`inline-flex items-center justify-center h-9 p-2 rounded-[3px] ${className}`}
		>
			{title}
		</Link>
	)
}
