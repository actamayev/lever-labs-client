import { Link } from "react-router-dom"
import { Button } from "@/components/shadcn/ui/button"

interface Props {
	title: string
	variant?: "default" | "secondary" | "outline" | "ghost"
	className?: string
	linkTo: PageNames
}

export default function AuthHeaderLinks(props: Props) {
	const { title, variant = "ghost", className, linkTo } = props

	return (
		<Button
			variant={variant}
			size="sm"
			className={className}
			asChild
		>
			<Link to={linkTo}>
				{title}
			</Link>
		</Button>
	)
}
