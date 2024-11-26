import { useLocation } from "react-router-dom"
import InternalPagesLayout from "./internal-pages-layout"
import ClassicLayout from "./classic-layout"

const PrivatePageNames = [
	"/garage",
	"/lab",
	"/sandbox",
	"/account"
]

interface Props {
	children: React.ReactNode
}

export default function ConditionalLayout(props: Props) {
	const { children } = props
	const location = useLocation()

	if (PrivatePageNames.includes(location.pathname)) {
		return (
			<InternalPagesLayout>
				{children}
			</InternalPagesLayout>
		)
	}

	return (
		<ClassicLayout>
			{children}
		</ClassicLayout>
	)
}
