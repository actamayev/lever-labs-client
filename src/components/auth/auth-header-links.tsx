import { Link } from "react-router-dom"
import { Button, type ButtonProps } from "@/components/shadcn/ui/button"

interface Props {
	title: string
	variant?: ButtonProps["variant"]
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
