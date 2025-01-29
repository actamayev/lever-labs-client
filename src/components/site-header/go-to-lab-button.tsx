import { Link } from "react-router"
import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import useUsername from "../../hooks/memos/username"
import { CustomBeaker } from "../icons/custom-beaker"
import { TactileButton } from "../shadcn/ui/tactile-button"

function GoToLabButton() {
	const username = useUsername()

	if (isNull(username)) return null

	return (
		<TactileButton
			asChild
			className="group relative bg-pipTheme hover:bg-pipThemeHover text-white font-medium px-6 duration-0 rounded-2xl"
			shadowHeight={4}
		>
			<Link to="/lab/element-1">
				Go to the Lab
				<CustomBeaker />
			</Link>
		</TactileButton>
	)
}

export default observer(GoToLabButton)
