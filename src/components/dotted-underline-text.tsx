import { Link } from "react-router-dom"

interface Props {
	linkTo: StaticPageNames
	children: React.ReactNode
}

export default function DottedUnderlineText(props: Props) {
	const { linkTo, children } = props

	return (
		<span className="hover:underline hover:decoration-dotted">
			<Link to={linkTo}>
				{children}
			</Link>
		</span>
	)
}
