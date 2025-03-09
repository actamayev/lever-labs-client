import { Link } from "react-router"
import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import useUsername from "../../hooks/memos/username"
import { CustomBeaker } from "../icons/custom-beaker"
import { BlueTactileButton } from "../buttons/tactile-buttons"

function GoToLabButton() {
	const username = useUsername()

	if (isNull(username)) return null

	return (
		<BlueTactileButton
			asChild
			className="relative font-medium px-3 sm:px-6 text-sm sm:text-base duration-0 rounded-xl sm:rounded-2xl"
		>
			<Link to="/lab">
				GO TO LAB
				<CustomBeaker className="h-4 sm:h-5 w-4 sm:w-5" />
			</Link>
		</BlueTactileButton>
	)
}

export default observer(GoToLabButton)
