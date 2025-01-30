import { Link } from "react-router"
import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import useUsername from "../../hooks/memos/username"
import { CustomBeaker } from "../icons/custom-beaker"
import { BlueTactileButton } from "../tactile-buttons"

function GoToLabButton() {
	const username = useUsername()

	if (isNull(username)) return null

	return (
		<BlueTactileButton
			asChild
			className="relative font-medium px-6 duration-0 rounded-2xl"
		>
			<Link to="/lab/element-1">
				GO TO THE LAB
				<CustomBeaker />
			</Link>
		</BlueTactileButton>
	)
}

export default observer(GoToLabButton)
