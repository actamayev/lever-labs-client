import _ from "lodash"
import { observer } from "mobx-react"
import { useLocation } from "react-router"
import ClassicLayout from "./classic-layout"
import useUsername from "../../hooks/memos/username"
import InternalPagesLayout from "./internal-pages-layout"

const PrivatePageNames = [
	"/garage",
	"/lab",
	"/sandbox",
	"/account"
]

function ConditionalLayout({ children } : { children: React.ReactNode }) {
	const location = useLocation()
	const username = useUsername()

	if (!PrivatePageNames.includes(location.pathname) || _.isNull(username)) {
		let extraClasses = undefined
		if (location.pathname === "/") extraClasses = ""

		return (
			<ClassicLayout extraClasses={extraClasses}>
				{children}
			</ClassicLayout>

		)
	}

	return (
		<InternalPagesLayout>
			{children}
		</InternalPagesLayout>
	)
}

export default observer(ConditionalLayout)
