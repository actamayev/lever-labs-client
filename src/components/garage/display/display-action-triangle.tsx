import { TriangleIcon } from "lucide-react"
import { cn } from "../../../lib/shadcn/utils"

interface DisplayActionTriangleProps {
	applyToBuffer: () => void
	isEmpty: boolean
}

export default function DisplayActionTriangle(props: DisplayActionTriangleProps) {
	const { applyToBuffer, isEmpty } = props

	return (
		<button
			onClick={applyToBuffer}
			disabled={isEmpty}
			className={cn("transition-all duration-200",
				!isEmpty
					? "hover:scale-110 cursor-pointer"
					: "cursor-not-allowed"
			)}
			title={isEmpty ? "Apply entered text" : "Enter text first"}
		>
			<TriangleIcon
				className={cn(
					"transition-colors duration-200 rotate-90",
					!isEmpty
						? "text-macaw fill-macaw"
						: "fill-standardBackground text-hare"
				)}
				style={{ width: "60px", height: "60px" }}
				strokeWidth={1.5}
			/>
		</button>
	)
}
