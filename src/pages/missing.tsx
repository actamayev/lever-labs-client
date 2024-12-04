import { Link } from "react-router"
import { Home } from "lucide-react"
import { Button } from "@/components/shadcn/ui/button"

export default function Missing() {
	return (
		<div className="flex flex-col items-center gap-8">
			<h1 className="text-lg font-semibold">
				Page Not Found
			</h1>
			<Link to="/">
				<Button>
					Return home
					<Home className="ml-2 h-5 w-5" />
				</Button>
			</Link>
		</div>
	)
}
