import { Link } from "react-router"
import isNull from "lodash-es/isNull"
import { observer } from "mobx-react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/shadcn/ui/button"
import useUsername from "../../hooks/memos/username"
import { CustomBeaker } from "../icons/custom-beaker"

function GoToLabButton() {
	const username = useUsername()

	if (isNull(username)) return null

	return (
		<Button
			asChild
			className="group relative bg-gradient-to-r
				from-pipTheme to-blue-500 hover:bg-pipTheme
				dark:from-pipTheme dark:to-blue-500 dark:hover:bg-pipTheme
				text-white font-medium px-6
				shadow-md hover:shadow-lg
				transition-all duration-300 hover:pr-12"
		>
			<Link to="/lab">
				Go to the Lab
				<CustomBeaker />
				<ArrowRight
					className="absolute right-4 transform opacity-0 group-hover:opacity-100
					transition-all duration-50 ease-out translate-x-[-10px] group-hover:translate-x-0"
					size={18}
				/>
			</Link>
		</Button>
	)
}

export default observer(GoToLabButton)
