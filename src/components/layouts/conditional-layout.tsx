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

// TODO: When running BDR on mac app, try scrolling right on the landing page. It shouldn't be able to
// it should be fixed
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
