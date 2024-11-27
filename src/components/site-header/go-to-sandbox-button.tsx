import _ from "lodash"
import { observer } from "mobx-react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import useUsername from "../../hooks/memos/username"
import { Button } from "@/components/shadcn/ui/button"

function GoToSandboxButton() {
	const username = useUsername()

	if (_.isNull(username)) return null

	return (
		<Button
			asChild
			className="group relative bg-gradient-to-r from-blue-600 to-blue-500
				hover:from-blue-700 hover:to-blue-600
				dark:from-blue-500 dark:to-blue-400
				dark:hover:from-blue-600 dark:hover:to-blue-500
				text-white font-medium px-6
				shadow-md hover:shadow-lg
				transition-all duration-300 hover:pr-12
				border border-white/10"
		>
			<Link to="/sandbox">
				Go to Sandbox
				<ArrowRight
					className="absolute right-4 transform opacity-0 group-hover:opacity-100
					transition-all duration-50 ease-out translate-x-[-10px] group-hover:translate-x-0"
					size={18}
				/>
			</Link>
		</Button>
	)
}

export default observer(GoToSandboxButton)
